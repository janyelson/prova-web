$(function(){

  var api = "https://prova-api.herokuapp.com/";
  var url = api + "users";

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
          console.log("not empty: " + myObj);
          sessionStorage.setItem("isUser", "yes");
          sessionStorage.setItem("email", myObj[0].email);
          sessionStorage.setItem("username", myObj[0].username);
          sessionStorage.setItem("id", myObj[0]._id);
          sessionStorage.setItem("type", myObj[0].type);
          ok = true;
        }
        if(!ok) {
          console.log("empty: " + myObj);
          alert("Usuário e/ou Senha Incorretos!");
          //window.location.href = "/login";
        }
        else {
          //window.location.href = "/dashboard";
        }
      }
    };

    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jsonObject);
  }

  $("#button-register").click( function(){

    obj = {
      "username":$("#input-name").val(),
      "email":$("#input-email").val(),
      "type": "value", 
      "password":$("#input-password").val(),
      "passwordvfy":$("#input-passwordvfy").val()
    };

    if(obj.password === obj.passwordvfy) {
      dbParam = JSON.stringify(obj);
      console.log(dbParam);
      postJson(dbParam);
      

    } else {
      alert("Senha não confere! Digite a senha corretamente nos dois campos!");
    }

  });

});
