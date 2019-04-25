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

    @$data = json_decode($_GET['json']);

    if (@$data->login == ""){
        return;
    }

    $sql = mysql_query("SELECT user_config.user_id, user_config.parameter, user_config.value
                                FROM user_config
                                JOIN users ON users.id = user_config.user_id
                               WHERE users.user = '$data->login'");
    if(!$sql) {
        echo "Ошибка выполнения запроса";
    } else {
        $return_items = array();
        while( $line = mysql_fetch_assoc($sql) ) {

            array_push($return_items,
                array(
                        'user_id' => $line['user_id'],
                        'parameter' => $line['parameter'],
                        'value' => $line['value']
                )
            );

        }

        echo json_encode(array('result'=>$return_items));
    }

    mysql_close();

?>