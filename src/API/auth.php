<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');

    include_once('config.php');

    //подключение к БД
    $connect_db = mysql_connect($mysql_host, $mysql_user, $mysql_password); 
    mysql_select_db($mysql_database, $connect_db); 
    mysql_set_charset('utf8'); 

    if(!$connect_db){
        echo "Data Base connection error";
        return;
    }

    @$AuthData = json_decode($_POST['json']);

    if ($AuthData->login == "" && $AuthData->password == "") {
        echo "Логин или пароль не заполнены";
        mysql_close();
        return;
    }

    @$Md5IsNeeded = @$AuthData->md5;
    if(@$Md5IsNeeded == true){
        $AuthData->password = md5($AuthData->password);
    }

    $sql = mysql_query("SELECT password FROM users WHERE user = '$AuthData->login'");

    $UserData = mysql_fetch_assoc($sql);

    if ($AuthData->password != $UserData['password']) {
        echo "Неправильный логин или пароль";
        mysql_close();
        return;
    } else {
//        $AuthData->password = "";
        echo json_encode($AuthData);
    }

    mysql_close();

?>