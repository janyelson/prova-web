$(function(){

    if(sessionStorage.isUser == "yes"){

        $("#login-topbar").hide();
        $("#signup-topbar").hide();

        $("#username-topbar-name").text(sessionStorage.username);
        $("#username-topbar-link").click(function(){
            window.location.href= "source/my-page.html";
        });

    } else
    {
        $("#disciplinas-topbar").hide();
        $("#username-topbar").hide();
        $("#logout-topbar").hide();
    }

    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.reload();
    });

});
