<?php

    class ApiHelper{

       private $API_PATH = "http://hysterical.ru/CRM/API/";

        public function AuthCheck($login, $password, $md5IsNeeded) {
            if($login == "" || $password == "") {
                echo "Логин или пароль пустые (авторизуйтесь)";
                return false;
            }

            $AuthJSON = json_encode(
                array('login' => $login,
                      'password' => $password,
                      'md5' => $md5IsNeeded)
            );

            $AuthJSON = array('json' => $AuthJSON);

            $sUrl = $this->API_PATH."auth.php";

            $options = array(
                'http' => array(
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method' => 'POST',
                    'content' => http_build_query($AuthJSON),
                )
            );

            $context = stream_context_create($options);

            $oResponse = file_get_contents($sUrl, false, $context);

            if ($oResponse !== null){
                @$JSONDecode = json_decode($oResponse);
                if ($JSONDecode->login){
                    return true;
                } else {
                    return false;
                }
            } else {
                echo "Ошибка при авторизации (неверные логин или пароль)";
                return false;
            }
        }


    }
?>