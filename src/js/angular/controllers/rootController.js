app.controller('rootController', [ '$scope', function ($scope) {

    $scope.preloader = document.getElementById('preloader');
    get_initial_parameters($scope);

} ]);

function get_initial_parameters(scope){
    var login = GetCookie(COOKIE_LOGIN);
    var pass = GetCookie(COOKIE_PASS);

    if (!login && !pass) return false;


    getUserParameters(login, scope);
    setTheme(scope);
}



function setTheme(scope) {
    if (scope.user_config === undefined || scope.user_config === null) return;

    var body = document.getElementById("bodyMain");
    if (themeIsDark(scope.user_config)) {
        if (!body.classList.contains(DARK_THEME_CLASS)) {
            body.classList.add(DARK_THEME_CLASS);
        }
    } else {
        if (body.classList.contains(DARK_THEME_CLASS)) {
            body.classList.remove(DARK_THEME_CLASS);
        }
    }
}

function getUserParameters(login, scope) {
    scope.preloader.hidden = false;
    var data = {
        login: login
    };

    $.ajax({
        type: "GET",
        async: false,
        cache: false,
        url: PrepareUrl('API/get_user_config.php'),
        dataType: "json",
        data: { json: JSON.stringify(data) },
        contentType: "application/json" ,
        success: function(oData) {
            scope.user_config = oData;

            scope.preloader.hidden = true;
        },
        error: function(oData) {
            if (oData.status !== 200) { //http ошибка
                alert("HTTP ошибка: " + oData.status + " " + oData.statusText);
            } else {
                if(oData.responseText !== "200" && oData.status !== 200) {  //ошибка в API методе
                    alert(oData.responseText);
                }
            }

            scope.preloader.hidden = true;
        }
    });
}

function themeIsDark(data) {

    if  (data === undefined || data === null ) return;

    let color_theme = data.result.filter(f => f.parameter = THEME_PARAMETER).map(m => m.value).toString();

    if (color_theme === undefined || color_theme === null) return;

    if  (color_theme.length === 0) {
        return false;
    }

    if (color_theme === THEME_DARK ) {
        return true;
    } else {
        return false;
    }
}


