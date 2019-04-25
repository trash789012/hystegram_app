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

    $UserData = json_decode($_POST['json']);

    @$login = $UserData->login;
    @$password = $UserData->password;
    @$md5 = $UserData->md5;


    $cl_auth = new ApiHelper();
    $auth = $cl_auth->AuthCheck(@$login, @$password, @$md5);

    if (!$auth) {
        mysql_close();
        return;
    }

    if ($UserData->login == "" || $UserData->password == "") {
        echo "Внутренняя Ошибка. Логин или пароль не заполнены";
        mysql_close();
        return;
    }

    $pass = md5($UserData->userpass);

    $sql = mysql_query("INSERT INTO `users` ( `user`, `password`, `name`, `name2`, `lastname`, `blocked`, `admin` ) 
                             VALUES( '$UserData->user', '$pass', '$UserData->name', '$UserData->name2', '$UserData->lastname',
                                     '$UserData->blocked', '$UserData->admin' )");

    if(!$sql) { 
        echo "Ошибка выполнения запроса";
    } else {
        echo "200";
    }

    mysql_close();

?>