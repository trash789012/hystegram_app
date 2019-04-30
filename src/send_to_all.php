<?php
	include 'config.php';
	include('API/api_actions.php'); //API для управления событиями в таблице actions_confirm

	//подключение к БД
	$connect_db = mysql_connect($mysql_host, $mysql_user, $mysql_password); 
	mysql_select_db($mysql_database, $connect_db); 
	mysql_set_charset('utf8'); 
	
	$date1 = new DateTime('+1 days');
	$date_to = $date1->format('Y-m-d');
	$date2 = new DateTime();
	$date_from = $date2->format('Y-m-d');
	//echo $date_to;
	//echo $date_from;
	
	//события
	$q_actions = mysql_query("SELECT *
								FROM lessons
							   WHERE day BETWEEN '$date_from' AND '$date_to' ");
							   
	while($e_actions=mysql_fetch_assoc($q_actions)) {
		//print($e_actions['day']); echo " | ";
		//print($e_actions['time']); echo " | ";
		//print($e_actions['comment']); echo "<br>";
		
		//пользователи, получающие уведомления
		$q = mysql_query( "SELECT users.id, users.user,
								  contacts.account_type,
								  contacts.adress
							 FROM users
							 JOIN contacts ON contacts.user = users.user
						    WHERE users.blocked = 0
							  AND contacts.activity = 1" );
							 
		//рассылка уведомлений
		while($e=mysql_fetch_assoc($q)) {
			//print($e['user']); echo " | ";
			//print($e['account_type']); echo " | ";
			//print($e['adress']); 
			
			echo "<br>";
			
			switch($e['account_type']) {
				case 'vk': 
					$user_id = $e['adress'];
					$ss_time = substr($e_actions['time'], 0, 5);
					$msg = urlencode($e_actions['comment'].". ".$e_actions['day']." в ".$ss_time);
					$sUrl = "https://api.vk.com/method/messages.send?user_id=$user_id&message=$msg&access_token=$vkontakteAccessToken";
					//echo $sUrl; echo "<br>";
					$oResponce = file_get_contents($sUrl);

					//echo $oResponce; 
					break;
		
				case 'email':
					$from = "wordpress@hysterical.ru";
					$to = $e['adress'];
					$subject = "Автоматическое уведомление о событии";
					$ss_time = substr($e_actions['time'], 0, 5);
					//$message = $e_actions['comment'].". ".$e_actions['day']." в ".$ss_time.'. Подтвердить участие нужно по ссылке - http://hysterical.ru/musicless/questions/index.php?uid='.$e['id'];
					$message = $e_actions['comment'].". ".$e_actions['day']." в ".$ss_time;
					$headers = $headers = "From:" . $from;
					mail($to,$subject,$message, $headers);
					break;
			}
			
			sleep(1);
		
		}
	}
	
	//предусмотрим зачистку истории событий
	$del_date = new DateTime('-30 days');
	$format_date = $del_date->format('Y-m-d');
	$q = mysql_query("DELETE FROM lessons
					   WHERE day <= '$format_date'");
	
	//Зачистим и старые экшны подтверждения
	delete_old_actions( );
	
	//напомним, что надо репетировать, если не было событий больше недели
	$per_date = new DateTime( '-7 days' );
	$format_date = $per_date->format('Y-m-d');
	$date_to_7 = new DateTime( '+7 days' );
	$date_to_7 = $date_to_7->format('Y-m-d');
	
	$q_actions = mysql_query("SELECT COUNT( * ) AS count
								FROM lessons
							   WHERE day BETWEEN '$format_date' AND '$date_to_7' ");
	
	
	while($e=mysql_fetch_assoc($q_actions)) {
		$count = $e['count'];
	}
	echo $count;
	/*if($count == 0){
		$dialog_id = '1';
		$msg = 'Событий не происходило больше недели. Создать новое можно тут http://hysterical.ru/musicless/lessons_add.php';
		$sUrl = "https://api.vk.com/method/messages.send?chat_id=$dialog_id&message=$msg&access_token=$vkontakteAccessToken";
		echo $sUrl;
		$oResponce = file_get_contents($sUrl);
	}*/
	
	//отключение от БД
	mysql_close();
?>