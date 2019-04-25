var COOKIE_LOGIN = "hystlogin";
var COOKIE_PASS = "hystpass";
var HOST_URL = "http://hysterical.ru/CRM/";
var HIDE_DIV_CLASS = "hideDiv";
var DARK_THEME_CLASS = "dark-theme";
var THEME_PARAMETER = "theme";
var THEME_DARK = "dark";
var THEME_WHITE = "white";

function side_onclick() {
    SideMenu.init();
    SideMenu.toggle(document.querySelector('#main-side-menu'));
}

function signIn() {
    location.href = "#/signIn";
}

function goToSettings() {
    location.href = "#/config";
}

function convert_time_ext_to_int(time) {
    if (time.length === 0 || time.length < 8) { return; }

    return (time.substr(0,5));
}

function convert_date_ext_to_int(date) {
    if (date.length === 0 || date.length < 10 ) { return; }

    var year = date.substr(0,4);
    var month = date.substr(5,2);
    var day = date.substr(8,2);

    return ( day + "." + month + "." + year );
}

function show_message(text) {
    var oLabel = document.getElementById("messageText");
    oLabel.innerText = text;

    $('#message').show();
}

function SetCookie(name, value) {
    $.cookie( name, value, {
        expires : 1,
        path : "index.php"
        //domain: 'subdomain.yoursite.ru',
        //secure: true
    });
}

function ClearCookie(name) {
    $.cookie( name, "", {
        expires : 0,
        path : "index.php"
        //domain: 'subdomain.yoursite.ru',
        //secure: true
    });
}

function GetCookie(name) {
    if (name === undefined) { return; }
    if (name.length === 0) { return; }
    var cookieVal =  $.cookie(name);
    return cookieVal;
}

function PrepareUrl(url) {
    if (window.location.hostname === "localhost" || window.location.hostname === "") {
        var _url = HOST_URL + url;
        return _url;
    } else {
        return url;
    }

}

function isAuth() {
    var login = GetCookie(COOKIE_LOGIN);
    var pass = GetCookie(COOKIE_PASS);

    if (login !== "" && pass !== "") {
        return true;
    } else {
        return false;
    }
}

function setAuthCookies(log, pass) {
    SetCookie(COOKIE_LOGIN, log);
    SetCookie(COOKIE_PASS,  pass);
}

function clearAuthCookies() {
    ClearCookie(COOKIE_LOGIN);
    ClearCookie(COOKIE_PASS);
}

function setHideDiv(id, hide) {

    var element = document.getElementById(id);

    if (hide && !element.classList.contains(HIDE_DIV_CLASS)) {
        element.classList.add(HIDE_DIV_CLASS);
    } else if(!hide && element.classList.contains(HIDE_DIV_CLASS)) {
        element.classList.remove(HIDE_DIV_CLASS);
    }
}