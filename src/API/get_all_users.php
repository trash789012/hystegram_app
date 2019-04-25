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

    $q_users = mysql_query("SELECT id, user, name, name2, lastname,
                                   blocked, admin
                              FROM users
                              ORDER BY lastname");

    $return_items = array();
    while( $e_user=mysql_fetch_assoc($q_users) ) {

        array_push($return_items, array( 'id' => $e_user['id'], 'user' => $e_user['user'],
                                         'name' => $e_user['name'], 'name2' => $e_user['name2'],
                                         'lastname' => $e_user['lastname'], 'blocked' => $e_user['blocked'],
                                         'admin' => $e_user['admin'] ));

    }
    
    //sleep(1);

    echo json_encode(array('result'=>$return_items));

    mysql_close();
?>