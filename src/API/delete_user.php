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

    $data = json_decode($_POST['json']);

    @$login = $data->login;
    @$password = $data->password;
    @$md5 = $data->md5;


    $cl_auth = new ApiHelper();
    $auth = $cl_auth->AuthCheck(@$login, @$password, @$md5);

    if (!$auth) {
        mysql_close();
        return;
    }

    $id = $data->id;
    if ($id == "") {
        echo "Поле ID пустое";
        return;
    }
    
    $sql = mysql_query( "DELETE FROM users WHERE id = '$id'" );
    if($sql) {
        echo "200";
    } else {
        echo "Не удалось удалить пользователя";
    }

    //удаляем все контактные данные (это не влияет на успешность удаления)
    $sql = mysql_query( "DELETE FROM contacts WHERE user = '$data->user'" );

    //отключение от БД
	mysql_close();
?>