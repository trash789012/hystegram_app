app.controller('UserDetailController', [ '$scope', '$routeParams', function ($scope, $routeParams) {

    $scope.preloader = document.getElementById('preloader');
    $scope.userid = $routeParams.id;

    get_user_data($scope);
    
    $scope.save_userdata_main = function () {
        // debugger;
        $scope.preloader.hidden = false;

        var data = {
            id: $scope.userid,
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
            url: PrepareUrl('API/change_userdata_main.php'),
            data: { json: JSON.stringify(data) },
            dataType: "json",
            success: function(oData) {
                $scope.preloader.hidden = true;

                show_message("Настройки сохранены");
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

    $scope.DeleteContact = function(id){
        $scope.preloader.hidden = false;

        var data = {
            id: id,
            login: GetCookie(COOKIE_LOGIN),
            password: GetCookie(COOKIE_PASS),
            md5: false
        };

        data = { json: JSON.stringify(data) };

        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            url: PrepareUrl('API/delete_contact.php'),
            data: data,
            dataType: "json",
            // contentType: "application/json" ,
            success: function(oData) {
                $scope.preloader.hidden = true;

                var li = document.getElementById('contact_' + id);
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
    }

    $scope.contact_detail = function (id) {
        window.location = '#/contactDetail/' + id;
    };

    $scope.createContact = function () {
        window.location = '#/createContact/' + $scope.user_data.user_data.user;
    }
} ]);


function get_user_data(scope) {
    scope.preloader.hidden = false;
    $('#user_fab').hide();

    var async = true;

    var data = {
        id: scope.userid
    };

    $.ajax({
        type: "GET",
        async: async,
        cache: false,
        url: PrepareUrl('API/get_user_single.php'),
        data: { json: JSON.stringify(data) },
        dataType: "json",
        success: function(oData) {
            // prepare_action_data(oData);
            scope.user_data = oData;
            document.getElementById("user_form").hidden = false;
            if (async){
                scope.$apply();
            }

            scope.preloader.hidden = true;
            $('#user_fab').show();
        },
        error: function(oData) {
            if (oData.status !== 200) { //http ошибка
                alert("HTTP ошибка: " + oData.status + " " + oData.statusText);
            } else {
                if(oData.responseText !== "200") {  //ошибка в API методе
                    alert(oData.responseText);
                }
            }

            scope.preloader.hidden = true;
        }
    });
}