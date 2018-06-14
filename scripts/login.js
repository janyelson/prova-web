$(function(){

    var api = "https://prova-api.herokuapp.com/";
    var url = api + "login";
    var ok = false;

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
                    ok = true;
                }
            }
        };

        xmlhttp.open("POST", url, false);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(jsonObject);
        return false;
    }

    $("#button-login").click( function(){
        obj = {
            "email":$("#input-email").val(),
            "password":$("#input-password").val(),
        };
        dbParam = JSON.stringify(obj);
        postJson(dbParam);

        if(!ok) alert("Erro, Login Incorreto!");
        else window.location.href = "/dashboard";

        return false;
    });
});
