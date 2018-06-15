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
          if (myObj.code == "11000") {
            alert("O email já está cadastrado!");
        } else { 
          alert("Cadastrado com sucesso!");
          window.location.href = "/login";
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
      postJson(dbParam);
    } else {
      alert("Senha não confere! Digite a senha corretamente nos dois campos!");
    }

  });

});
