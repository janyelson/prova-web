$(function(){    

    var api = "https://prova-api.herokuapp.com/";
    var url =  api + "users";
    var ok = false;

    function postJson(jsonObject)
    {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                sessionStorage.setItem("isUser", "yes");
                sessionStorage.setItem("email", myObj.email);
                sessionStorage.setItem("username", myObj.username);
                sessionStorage.setItem("id", myObj._id);
                sessionStorage.setItem("type", myObj.type);
                ok = true;
            }
        };
        xmlhttp.open("POST", url, false);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(jsonObject);
        return false;
    }
    
    $("#button-register").click(function(){
        
        var type = "Professor";
        if($("#input-student").is(':checked')) type = "Estudante";
        
        obj = {
            "email":$("#input-email").val(), 
            "username":$("#input-username").val(),
            "password":$("#input-password").val(),
            "type": type
        };                               
        dbParam = JSON.stringify(obj);

        postJson(dbParam);

        if(!ok) alert("Erro, tente novamente!");
        else window.location.href = "/";
        
        return false;  
    });

});