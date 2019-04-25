<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');

    include_once('config.php');

    $connect_db = mysql_connect($mysql_host, $mysql_user, $mysql_password); 
    mysql_select_db($mysql_database, $connect_db); 
    mysql_set_charset('utf8'); 

    if(!$connect_db){
        echo "Data Base connection error";
        return;
    }

    $data = json_decode($_GET['json']);
    $id = $data->id;
    if($id == ''){
        echo "Поле id пустое";
        mysql_close();
        return;
    }

    $q_user = mysql_query("SELECT id, user, name, name2, lastname,
                                  blocked, admin
                             FROM users
                            WHERE id = '$id'");

    $user_data = mysql_fetch_assoc($q_user);

    $user = $user_data['user'];
    $q_contacts = mysql_query("SELECT *
                                 FROM contacts
                                WHERE user = '$user'");

    $contacts_data = array();
    while( $e_contact=mysql_fetch_assoc($q_contacts) ) {

        array_push($contacts_data, array( 'id' => $e_contact['id'], 'user' =>  $e_contact['id'],
                                          'account_type' => $e_contact['account_type'],
                                          'adress' => $e_contact['adress'],
                                          'full_adress' => $e_contact['full_adress'],
                                          'activity' => $e_contact['activity'] ));

    }

    $return_data = array('user_data' => $user_data, 'contacts'=> $contacts_data);

    echo json_encode($return_data);

    mysql_close();
?>