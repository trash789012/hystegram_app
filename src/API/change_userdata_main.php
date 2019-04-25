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

    if ($UserData->id == "") {
        echo "Внутренняя Ошибка. Поле ID пустое";
        return;
    }

    $sql = mysql_query("UPDATE users SET 
                               name = '$UserData->name',
                               name2 = '$UserData->name2',
                               lastname = '$UserData->lastname',
                               blocked = '$UserData->blocked',
                               admin = '$UserData->admin'
                         WHERE id = '$UserData->id'");
    if(!$sql) { 
        echo "Ошибка выполнения запроса";
    } else {
        echo "200";
    }

    mysql_close();
?>