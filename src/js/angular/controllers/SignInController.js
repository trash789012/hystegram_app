app.controller('SignInController', [ '$scope', function ($scope) {

    $scope.preloader = document.getElementById('preloader');

    disableControlsByAuth();
    setDefaultIfAuth();

    $scope.auth = function () {
        AuthCheck($scope);
        disableControlsByAuth();
        get_initial_parameters($scope);
    };

    $scope.logOut = function () {
        clearAuthCookies();
        disableControlsByAuth();
    };

    $scope.getLogin = function () {
        return GetCookie(COOKIE_LOGIN);
    }

} ]);

function setDefaultIfAuth() {
    if(isAuth()){
        document.getElementById("login").value = GetCookie(COOKIE_LOGIN);
    }
}

function disableControlsByAuth() {
    if (isAuth()) {
        document.getElementById("logBtn").disabled = true;
        document.getElementById("logOutBtn").disabled = false;

        setHideDiv("login_div", true);
        setHideDiv("pass_div", true);
        setHideDiv("auth_lbl", false);
    } else {
        document.getElementById("logBtn").disabled = false;
        document.getElementById("logOutBtn").disabled = true;

        setHideDiv("login_div", false);
        setHideDiv("pass_div", false);
        setHideDiv("auth_lbl", true);
    }
}

function AuthCheck(scope) {
    scope.preloader.hidden = false;

    if (isAuth()){
        scope.preloader.hidden = true;
        disableControlsByAuth();
    } else {

        var authData = {
                login: document.getElementById("login").value,
                password: document.getElementById("pass").value,
                md5: true
        };

        $.ajax({
            type: "POST",
            async: false,
            cache: false,
            url: PrepareUrl('API/auth.php'),
            data: { json: JSON.stringify(authData) },
            dataType: "json",
            success: function(oData) {
                scope.preloader.hidden = true;

                setAuthCookies(oData.login, oData.password);

                // history.go(-1);
            },
            error: function(oData) {
                scope.preloader.hidden = true;

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
}

