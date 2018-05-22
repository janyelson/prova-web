$(function(){    
    
    var api = "https://prova-api.herokuapp.com/";
    var url = api + "login";
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
        
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                if(myObj[0].username.trim) {
                    sessionStorage.setItem("isUser", "yes");
                    sessionStorage.setItem("email", myObj[0].email);
                    sessionStorage.setItem("username", myObj[0].username);
                    sessionStorage.setItem("id", myObj[0]._id);
                    sessionStorage.setItem("type", myObj[0].type);
                    
                    alert("Login efetuado");
                    ok = true;
                } 
                
            }
        };
        
        xmlhttp.open("POST", url, false);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(jsonObject);
        
        return false;
    }
    
    $("#login-button").click( function(){
        
         
        obj = {
            "email":$("#email-login-input").val(), 
            "username":"whatever",
            "password":$("#password-login-input").val(),
        };                               
        dbParam = JSON.stringify(obj);
        alert(dbParam);

        postJson(dbParam);
        //setTimeout(2000, function() {
            if(!ok) alert("Erro, tente novamente!");
            else window.location.href = "../index.html";
        
            return false;
        //});
        
    });
    

});