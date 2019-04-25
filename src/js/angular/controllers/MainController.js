app.controller('MainController', [ '$scope', function ($scope) {

    $scope.preloader = document.getElementById('preloader');

    get_all_actions($scope);

    $scope.OnDelAction = function OnDelAction(id) {
        $scope.preloader.hidden = false;

        var data = {
            id: id,
            login: GetCookie(COOKIE_LOGIN),
            password: GetCookie(COOKIE_PASS),
            md5: false,
        };

        data = { json: JSON.stringify(data) };

        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            url: PrepareUrl('API/delete_action.php'),
            data: data,
            dataType: "json",
            // contentType: "application/json" ,
            success: function(oData) {
                $scope.preloader.hidden = true;

                var li = document.getElementById('action_' + id);
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

    $scope.actionDetail = function (id) {
        window.location = '#/actionDetail/' + id;
    }

    $scope.add_action = function () {
        window.location = '#/actionCreate';
    }

    $scope.GetDayName = function (date) {
        var days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

        var day = new Date(date.substr(6,4), date.substr(3,2) - 1, date.substr(0,2)).getDay();

        return days[day];
    }

} ]);


function get_all_actions(scope) {
    scope.preloader.hidden = false;

    var async = true;

    $.ajax({
        type: "GET",
        async: async,
        cache: false,
        url: PrepareUrl('API/get_all_actions.php'),
        dataType: "json",
        // data: ls_srvRequest,
        contentType: "application/json" ,
        success: function(oData) {
            prepare_action_data(oData);
            scope.actions = oData;

            if (async){
                scope.$apply();
            }

            scope.preloader.hidden = true;
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

function prepare_action_data(data) {
    var length = data.result.length;

    if(length == 0) { return; }

    for (var i = 0; i <= length - 1; i++){
        data.result[i].day = convert_date_ext_to_int(data.result[i].day);
        data.result[i].time = convert_time_ext_to_int(data.result[i].time);
    }

    return data;
}


