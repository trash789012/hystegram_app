app.controller('ActionDetailController', [ '$scope', '$routeParams', function ($scope, $routeParams) {

    $scope.preloader = document.getElementById('preloader');
    $scope.action_id = $routeParams.id;

    get_action_data($scope);
    
    $scope.save_action = function () {
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
            url: PrepareUrl('API/change_action.php'),
            data: { json: JSON.stringify(data) },
            dataType: "json",
            success: function(oData) {
                $scope.preloader.hidden = true;

                show_message("Событие успешно обновлено");
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
} ]);

function get_action_data(scope) {
    scope.preloader.hidden = false;
    $('#action_fab').hide();

    var async = true;

    var data = {
        id: scope.action_id
    };

    $.ajax({
        type: "GET",
        async: async,
        cache: false,
        url: PrepareUrl('API/get_action_single.php'),
        data: { json: JSON.stringify(data) },
        dataType: "json",
        success: function(oData) {
            // prepare_action_data(oData);
            scope.action_data = oData;
            document.getElementById("action_form").hidden = false;
            if (async){
                scope.$apply();
            }

            scope.preloader.hidden = true;
            $('#action_fab').show();
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