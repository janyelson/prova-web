$(function(){    
    var url = "http://localhost:3000/tests";
    var ok = false;
    if(sessionStorage.isUser == "yes"){
        
        $("#login-topbar").hide();
        $("#signup-topbar").hide();
        
        $("#username-topbar").text(sessionStorage.username);
        
    } else
    {
        alert("É preciso estar logado!");
        window.history.back();
        //$("#user-name-topbar").hide();
        //$("#logout-topbar").hide();
    }
    
    function postJson(jsonObject)
    {
        xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
                alert("Criação concluída!");
                ok = true;
            }
        };
        
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(jsonObject);
        
        return false;
    }
    
    $("#register-button").click( function(){
        
        var n_topics = parseInt($("#test-questions-input").val());
        var topics = [];
        
        for(var i = 1; i <= n_topics; i++) topics.append($("#sel_topics" + i).val());
        obj = {
            //"id_user": sessionStorage.id;
            "name":$("#test-name-input").val(), 
            "begin_date:":$("#test-begin-input").val(),
            "end_date":$("#test-duration-input").val(),
            "topics": topics
        };     

        dbParam = JSON.stringify(obj);
        alert(dbParam);

        postJson(dbParam);

        if(ok) alert("Erro, tente novamente!");
        else window.location.href = "disciplinas.html";
        
        return false;
        
        
    });
    
    $("#test-begin-input").datepicker({dateFormat:"mm/dd/yy", minDate: 0}).datepicker("setDate",new Date());
    $("#test-duration-input").datepicker();

    
    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.href = "disciplinas.html";
    });

});