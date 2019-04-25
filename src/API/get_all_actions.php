<?php

    //$http_origin = $_SERVER['HTTP_ORIGIN'];

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

    $q_actions = mysql_query("SELECT *
                                FROM lessons
                            ORDER BY day");

    $return_items = array();
    while( $e_actions=mysql_fetch_assoc($q_actions) ) {

        array_push($return_items, array( 'id' => $e_actions['id'], 'day' => $e_actions['day'], 'time' => $e_actions['time'], 'comment' => $e_actions['comment'] ));

    }

    mysql_close();	
    
    //sleep(1);

    echo json_encode(array('result'=>$return_items));

?>