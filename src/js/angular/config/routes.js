app.config(function ($routeProvider) {

    $routeProvider.
        when('/about', {
            templateUrl: "js/angular/views/about_view.html",
            controller: "AboutController"
        })
        .when('/actions',{
            templateUrl: "js/angular/views/actions_view.html",
            controller: "MainController"
        })
        .when('/actionDetail/:id', {
            templateUrl: "js/angular/views/action_detail_view.html",
            controller: "ActionDetailController"
        })
        .when('/actionCreate', {
            templateUrl: "js/angular/views/action_create_view.html",
            controller: "ActionCreateController"
        })
        .when('/users', {
            templateUrl: "js/angular/views/users_view.html",
            controller: "UsersMainController"
        })
        .when('/userCreate', {
            templateUrl: "js/angular/views/user_create_view.html",
            controller: "UserCreateController"
        })
        .when('/userDetail/:id', {
            templateUrl: "js/angular/views/user_detail_view.html",
            controller: "UserDetailController"
        })
        .when('/contactDetail/:id', {
            templateUrl: "js/angular/views/contact_detail_view.html",
            controller: "ContactDetailController"
        })
        .when('/createContact/:user', {
            templateUrl: "js/angular/views/contact_create_view.html",
            controller: "ContactCreateController"
        })
        .when('/config', {
            templateUrl: "js/angular/views/user_config.html",
            controller: "UserConfigController"
        })
        .when('/signIn', {
            templateUrl: "js/angular/views/sign_view.html",
            controller: "SignInController"
        })
        .otherwise({
            redirectTo: '/actions'
        });

});