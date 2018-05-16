$(function(){    

    if(sessionStorage.isUser == "yes"){
        
        $("#login-topbar").hide();
        $("#signup-topbar").hide();
        
        $("#username-topbar").text(sessionStorage.username);
        $("#username-topbar").click( function(){
            window.location.href= "source/my-page.html";
        });
        
    } else
    {
        $("#user-name-topbar").hide();
        $("#logout-topbar").hide();
    }
    
    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.reload();
    });

});