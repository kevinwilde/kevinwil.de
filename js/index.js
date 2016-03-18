$(document).ready(function() {
    var portrait = new Image();
    portrait.onload = function() {
        $(".jumbotron").css("background", "url(images/portraitwide.jpg) no-repeat center center scroll");
        $(".jumbotron").css("webkit-background-size", "cover");
        $(".jumbotron").css("moz-background-size", "cover");
        $(".jumbotron").css("o-background-size", "cover");
        $(".jumbotron").css("background-size", "cover");
    };
    portrait.src = "img/portraitwide.jpg";

    // Make navbar anchor links scroll instead of jump
    //$('a[href*=#]:not([href=#])').click(function() {
    $('.navbar li a, .navbar-brand').click(function() {
        $(".navbar li").removeClass("active");
        $(this.parentElement).addClass("active");
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                    }, 500);
                return false;
            }
        }
    });

    // Make menu disappear after clicked when on mobile/small screen
    $('#dv-navbar-collapse a').on('click', function(){
        //$('.navbar-toggle').click() //bootstrap 3.x by Richard   // Doesn't work when nav not collapsed
        $('#dv-navbar-collapse').collapse('hide');
    });

});
