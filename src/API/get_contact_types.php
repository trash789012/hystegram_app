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

    $q_types = mysql_query("SELECT *
                              FROM acc_types");

    $return_items = array();
    while( $e_type=mysql_fetch_assoc($q_types) ) {

        array_push($return_items, array( 'type' => $e_type['type'], 'description' => $e_type['description'] ));

    }

    echo json_encode(array('result'=>$return_items));

    mysql_close();	
?>