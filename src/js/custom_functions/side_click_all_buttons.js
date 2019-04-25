var sm = document.getElementById("main-side-menu"),
    smitems = sm.querySelectorAll(".menu > li:not(.divider) > a");

for (var i = 0, len = smitems.length; i < len; i++) {
    smitems[i].addEventListener("click", clickHandler());
}

function clickHandler() {
    return function() {
        if (Responsive.device != "desktop") {
            SideMenu.hide(sm);
        }
        // for (var ind = 0; ind < smitems.length; ind++) {
        //     smitems[ind].parentNode.className = "";
        // }
        // this.parentNode.className = "selected color-blue-500";
        // document.querySelector(".main-content").scrollTop = 0;
    };
}

