app.controller('UserConfigController', [ '$scope', function ($scope) {

    $scope.preloader = document.getElementById('preloader');
    $scope.isChecked = isDark($scope);

    $scope.ChangeTheme = function () {
        onToogleTheme();
    };

    $scope.saveUserConfig = function () {
        onSaveConfig($scope);
    };
} ]);

function onSaveConfig(scope) {
    class cl_config{
        constructor(par, val) {
            this.par = par;
            this.val = val;
        }

        toJson(){
            return {
                parameter: this.par,
                value: this.val,
            }
        }
    }

    var data = {
        login: GetCookie(COOKIE_LOGIN),
        password: GetCookie(COOKIE_PASS),
        md5: false,
        parameters: []
    };

    data.parameters.push(new cl_config(THEME_PARAMETER, getThemeValue()).toJson());


    scope.preloader.hidden = false;

    $.ajax({
        type: "POST",
        async: true,
        cache: false,
        url: PrepareUrl('API/save_user_config.php'),
        data: { json: JSON.stringify(data) },
        dataType: "json",
        success: function(oData) {
            show_message("Настройки сохранены");
            scope.preloader.hidden = true;
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


function isDark(scope) {
    var body = document.getElementById("bodyMain");
    if (body.classList.contains(DARK_THEME_CLASS)) {
        return true;
    } else {
        return false;
    }
}

function getThemeValue() {
    if(isDark()){
        return THEME_DARK;
    } else {
        return THEME_WHITE;
    }
}

function onToogleTheme() {
    var checkBox = document.getElementById("theme_cb");

    var body = document.getElementById("bodyMain");

    if (checkBox.checked && !body.classList.contains(DARK_THEME_CLASS)) {
        body.classList.add(DARK_THEME_CLASS);
    } else if(!checkBox.checked && body.classList.contains(DARK_THEME_CLASS)) {
        body.classList.remove(DARK_THEME_CLASS);
    }
}

