app.controller('UsersMainController', [ '$scope', function ($scope) {

    $scope.preloader = document.getElementById('preloader');

    get_all_users($scope);

    $scope.OnDelUser = function(id, login){
        $scope.preloader.hidden = false;

        var data = {
            id: id,
            user: login,
            login: GetCookie(COOKIE_LOGIN),
            password: GetCookie(COOKIE_PASS),
            md5: false
        };

        data = { json: JSON.stringify(data) };

        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            url: PrepareUrl('API/delete_user.php'),
            data: data,
            dataType: "json",
            // contentType: "application/json" ,
            success: function(oData) {
                $scope.preloader.hidden = true;

                var li = document.getElementById('user_' + id);
                li.parentElement.style.display = 'none';
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

    $scope.userDetail = function (id) {
        window.location = '#/userDetail/' + id;
    };

    $scope.create_new_user = function () {
        window.location = '#/userCreate';
    }
} ]);

function get_all_users(scope) {
    scope.preloader.hidden = false;

    var async = true;

    $.ajax({
        type: "GET",
        async: async,
        cache: false,
        url: PrepareUrl('API/get_all_users.php'),
        dataType: "json",
        // data: ls_srvRequest,
        contentType: "application/json" ,
        success: function(oData) {
            // prepare_action_data(oData);
            scope.users = oData;

            if (async){
                scope.$apply();
            }

            scope.preloader.hidden = true;
        },
        error: function(oData) {
            if (oData.status !== 200) { //http ошибка
                alert("HTTP ошибка: " + oData.status + " " + oData.statusText);
            } else {
                if(oData.responseText !== "200" && oData.responseText !== 200) {  //ошибка в API методе
                    alert(oData.responseText);
                }
            }

            scope.preloader.hidden = true;
        }
    });
}