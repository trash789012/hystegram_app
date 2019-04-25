<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');

    include_once('config.php');
    include_once('internal_api.php');

    //подключение к БД
    $connect_db = mysql_connect($mysql_host, $mysql_user, $mysql_password); 
    mysql_select_db($mysql_database, $connect_db); 
    mysql_set_charset('utf8'); 

    if(!$connect_db){
        echo "Data Base connection error";
        return;
    }

    $ActionData = json_decode($_POST['json']);

    @$login = $ActionData->login;
    @$password = $ActionData->password;
    @$md5 = $ActionData->md5;


    $cl_auth = new ApiHelper();
    $auth = $cl_auth->AuthCheck(@$login, @$password, @$md5);

    if (!$auth) {
        mysql_close();
        return;
    }


    if ($ActionData->day == "") {
        mysql_close();
        echo "Дата не должна быть пустой";
        return;
    }

    $sql = mysql_query("INSERT INTO `lessons` ( `day`, `time`, `comment` ) VALUES( '$ActionData->day', '$ActionData->time', '$ActionData->comment' )");
    if(!$sql) {
        mysql_close();
        echo "Ошибка при выполнении запроса";
        return;
    } else {
        echo "200";
    }

    mysql_close();

?>