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

    $q_contact = mysql_query("SELECT *
                               FROM contacts
                              WHERE id = '$id'");
    
    $data = mysql_fetch_assoc($q_contact);

    echo json_encode($data);

    mysql_close();
?>