app.controller('UserCreateController', [ '$scope', function ($scope) {

    $scope.preloader = document.getElementById('preloader');

    $scope.create_user = function () {
        if(document.getElementById("name").value === '' ||
           document.getElementById("login").value === '' ||
           document.getElementById("password").value === ''){

           show_message("Заполните все обязательные поля");
           return;
        }

        $scope.preloader.hidden = false;

        var data = {
            user: document.getElementById("login").value,
            userpass: document.getElementById("password").value,
            name: document.getElementById("name").value,
            lastname: document.getElementById("lastname").value,
            name2: document.getElementById("name2").value,
            blocked: document.getElementById("blocked_switch").checked,
            admin: document.getElementById("admin_switch").checked,
            login: GetCookie(COOKIE_LOGIN),
            password: GetCookie(COOKIE_PASS),
            md5: false
        };

        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            url: PrepareUrl('API/create_user.php'),
            data: { json: JSON.stringify(data) },
            dataType: "json",
            success: function(oData) {
                $scope.preloader.hidden = true;
                $('#user_fab').hide();

                // show_message("Пользователь создан");
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
    };

} ]);