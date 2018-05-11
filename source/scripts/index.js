$(function(){    

    if(sessionStorage.isUser == "yes"){
        
        $("#login-topbar").hide();
        $("#signup-topbar").hide();
        
        $("#username-topbar").text(sessionStorage.username);
        
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