$(function(){    
    
    
    var url = "http://localhost:3000/users";
    var ok = false;
    if(sessionStorage.isUser == "yes"){
        
        $("#login-topbar").hide();
        $("#signup-topbar").hide();
        
        $("#username-topbar").text(sessionStorage.username);
        $("#username-topbar").click( function(){
            window.location.href= "my-page.html";
        });
        
    } else
    {
        $("#user-name-topbar").hide();
        $("#logout-topbar").hide();
    }
    
    function postJson(jsonObject)
    {
        xmlhttp = new XMLHttpRequest();
        alert("Sending...");
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                //myObj = JSON.parse(this.responseText);
                alert(this.responseText);
                ok = true;
            }
        };
        
        alert("IN 1");
        xmlhttp.open("POST", url, false);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(jsonObject);
        
        return false;
    }
    
    $("#register-button").click( function(){
        
         
        obj = {
            "email":$("#email-register-input").val(), 
            "username":$("#username-register-input").val(),
            "password":$("#password-register-input").val(),
            "type": "Student"
        };                               
        dbParam = JSON.stringify(obj);
        alert(dbParam);

        postJson(dbParam);

        if(!ok) alert("Erro, tente novamente!");
        else window.location.href = "../index.html";
        
        return false;
        
        
    });
    
    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.reload();
    });
    

});