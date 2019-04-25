
var _swipe = $('body').swipe({});

document.querySelector('body').addEventListener('touchend', _swipe, {passive: true});

$('body').swipe({
    swipe: OnSwipe,
    triggerOnTouchEnd: false,
    threshold: 70
});

function OnSwipe(event, direction, distance, duration, fingerCount, fingerData){
    if (direction == "right"){
        SideMenu.init();
        SideMenu.show(document.querySelector('#main-side-menu'));
    }

    if (direction == "left"){
        SideMenu.init();
        SideMenu.hide(document.querySelector('#main-side-menu'));
    }
}
