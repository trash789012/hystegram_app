app.controller('ActionCreateController', [ '$scope', function ($scope) {

    $scope.preloader = document.getElementById('preloader');

    $scope.create_action = function () {
        $scope.preloader.hidden = false;

        var data = {
            id: $scope.action_id,
            day: document.getElementById("day").value,
            time: document.getElementById("time").value,
            comment: document.getElementById("comment").value,
            login: GetCookie(COOKIE_LOGIN),
            password: GetCookie(COOKIE_PASS),
            md5: false
        };



        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            url: PrepareUrl('API/add_action.php'),
            data: { json: JSON.stringify(data) },
            dataType: "json",
            success: function(oData) {
                $scope.preloader.hidden = true;

                // show_message("Событие успешно создано");
                history.go(-1);
            },
            error: function(oData) {
                $scope.preloader.hidden = true;

                if (oData.status !== 200) { //http ошибка
                    alert("HTTP ошибка: Статус - " + oData.status + ", Текст - " + oData.statusText);
                } else {
                    if(oData.responseText !== "200") {  //ошибка в API методе
                        alert(oData.responseText);
                    }
                }

            }
        });
    }

} ])