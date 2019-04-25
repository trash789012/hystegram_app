app.controller('ContactDetailController', [ '$scope', '$routeParams',  function ($scope, $routeParams) {

    $scope.preloader = document.getElementById('preloader');
    $scope.contact_id = $routeParams.id;

    get_contact_data($scope);

    $scope.SaveContact = function () {
        $scope.preloader.hidden = false;

        var full_adress = document.getElementById("full_adress").value;
        var adress = full_adress.substr(15, full_adress.length - 15).trim();

        var data = {
            id: $scope.contact_id,
            account_type: get_account_type_inner(),
            adress: adress,
            full_adress: full_adress,
            activity: document.getElementById("activity_switch").checked,
            login: GetCookie(COOKIE_LOGIN),
            password: GetCookie(COOKIE_PASS),
            md5: false,
        };

        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            url: PrepareUrl('API/change_contact.php'),
            data: { json: JSON.stringify(data) },
            dataType: "json",
            success: function(oData) {
                $scope.preloader.hidden = true;

                show_message("Контакт успешно обновлен");
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

function get_account_type_inner() {
    var oSelect = document.getElementById("view_acc");
    var type = oSelect.options[oSelect.selectedIndex].value;
    return type;
}

function get_contact_data(scope) {
    scope.preloader.hidden = false;
    $('#contact_fab').hide();

    var async = true;

    var data = {
        id: scope.contact_id
    };

    $.ajax({
        type: "GET",
        async: async,
        cache: false,
        url: PrepareUrl('API/get_contact_types.php'),
        data: { json: JSON.stringify(data) },
        dataType: "json",
        success: function(oData) {

            scope.contact_types = oData;
            // document.getElementById("contact_form").hidden = false;
            if (async){
                scope.$apply();
            }

            // scope.preloader.hidden = true;
            // $('#contact_fab').show();
        },
        error: function(oData) {
            if (oData.status !== 200) { //http ошибка
                alert("HTTP ошибка: " + oData.status + " " + oData.statusText);
            } else {
                if(oData.responseText !== "200") {  //ошибка в API методе
                    alert(oData.responseText);
                }
            }

            // scope.preloader.hidden = true;
        }
    });

    $.ajax({
        type: "GET",
        async: async,
        cache: false,
        url: PrepareUrl('API/get_contact_single.php'),
        data: { json: JSON.stringify(data) },
        dataType: "json",
        success: function(oData) {

            scope.contact_data = oData;
            document.getElementById("contact_form").hidden = false;
            if (async){
                scope.$apply();
            }

            scope.preloader.hidden = true;
            $('#contact_fab').show();
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