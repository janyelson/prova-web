$(function(){

  var api = "https://prova-api.herokuapp.com/";
  var url = api + "login";

  function JSONEmpty(obj){
    return !obj.length ||
    !obj.filter(function(a){return Object.keys(a).length;}).length;
  }

  function postJson(jsonObject) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      var ok = false;
      if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        if(!JSONEmpty(myObj)) {
          sessionStorage.setItem("isUser", "yes");
          sessionStorage.setItem("email", myObj[0].email);
          sessionStorage.setItem("username", myObj[0].username);
          sessionStorage.setItem("id", myObj[0]._id);
          sessionStorage.setItem("type", myObj[0].type);
          ok = true;
        }
        if(!ok) {
          alert("Usuário e/ou Senha Incorretos!");
          window.location.href = "/login";
        }
        else {
          window.location.href = "/dashboard";
        }
      }
    };

    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jsonObject);
  }

  $("#button-login").click( function(){
    obj = {
      "email":$("#input-email").val(),
      "password":$("#input-password").val(),
    };

    dbParam = JSON.stringify(obj);
    postJson(dbParam);
  });

});
