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

    $sql = mysql_query("SELECT id FROM users WHERE user = '$login'");
    $ls_user = mysql_fetch_assoc($sql);
    $user_id = $ls_user['id'];

    $success = true;
    foreach ($Data->parameters as $parameter) {
        $par = $parameter->parameter;
        $val = $parameter->value;

        $check = mysql_query("SELECT * FROM user_config
                                     WHERE user_id = '$user_id'
                                       AND parameter = '$par'");
        if (mysql_num_rows($check) == 1){
            $update = mysql_query("UPDATE user_config SET value = '$val'
                                          WHERE user_id = '$user_id'
                                            AND parameter = '$par'");
            if(!$update) $success = false;

        } else {
            $insert = mysql_query("INSERT INTO `user_config` (`user_id`, `parameter`, `value`)
                                            VALUES( '$user_id', '$par', '$val' )");
            if(!$insert) $success = false;
        }



    }


    if(!$success) {
        echo "Ошибка выполнения запроса";
    } else {
        echo "200";
    }

    mysql_close();
?>