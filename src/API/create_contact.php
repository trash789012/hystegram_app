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

    $Data = json_decode($_POST['json']);

    @$login = $Data->login;
    @$password = $Data->password;
    @$md5 = $Data->md5;


    $cl_auth = new ApiHelper();
    $auth = $cl_auth->AuthCheck(@$login, @$password, @$md5);

    if (!$auth) {
        mysql_close();
        return;
    }

    if ($Data->full_adress == "") {
        echo "Внутренняя Ошибка. Заполните адресные данные";
        mysql_close();
        return;
    }

    $adress = get_adress($Data, $vkontakteAccessToken);

    $sql = mysql_query("INSERT INTO `contacts` ( `user`, `account_type`, `adress`, `full_adress`, `activity` ) 
                             VALUES( '$Data->user', '$Data->account_type', '$adress', '$Data->full_adress', '$Data->activity' )");

    if(!$sql) { 
        echo "Ошибка выполнения запроса";
    } else {
        echo "200";
    }

    mysql_close();

    function get_adress($Data, $vkontakteAccessToken){

        if ($Data->account_type == 'email'){
            return $Data->full_adress;
        }

        if ($Data->account_type == 'vk'){ 

            $URL = "https://api.vk.com/method/utils.resolveScreenName?screen_name=$Data->adress&access_token=$vkontakteAccessToken";
            $resp = file_get_contents($URL);

            $result = json_decode($resp);

            return $result->response->object_id;
        }
    }
?>