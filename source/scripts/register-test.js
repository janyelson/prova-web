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
        window.location.href = "disciplina.html";
        //$("#user-name-topbar").hide();
        //$("#logout-topbar").hide();
    }
    
    function postJson(jsonObject)
    {
        xmlhttp = new XMLHttpRequest();
        alert("post");
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
                alert("Resposta:> " + this.responseText);
                ok = true;
            }
        };
        
        xmlhttp.open("POST", url, false);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(jsonObject);
        
        return false;
    }
    
    $("#register-test-button").click( function(){
        var n_topics = parseInt($("#test-questions-input").val());
        var topics = [], i = 1;

        var date = $("#test-begin-input").datepicker("getDate");
        var begin_date = new Date(date.getYear, date.getMonth, date.getDay, getHours("bh"), getHours("bm"), getHours("bs"));

        date = $("#test-end-input").datepicker("getDate");
        var end_date = new Date(date.getYear, date.getMonth, date.getDay, getHours("eh"), getHours("em"), getHours("es"));
    
        for(i = 1; i <= n_topics; i++) topics.push($("#sel_topics" + (i+2)).val());  
        obj = {
            "id_user": sessionStorage.id,
            "name":$("#test-name-input").val(), 
            "begin_date": begin_date,
            "end_date":  end_date,
            //"begin_date:":$("#test-begin-input").val() + "T" + $("#test-begin-hour-input").val() + "Z",
            //"end_date":$("#test-end-input").val() + "T" + $("#test-end-hour-input").val() + "Z",
            "topics": topics,
            "password": $("#test-password-input").val()
        };     

        dbParam = JSON.stringify(obj);
        alert(dbParam);

        alert("register");
        postJson(dbParam);

        if(ok) alert("Erro, tente novamente!");
        else window.location.href = "disciplina.html";
        
        return false;
        
        
    });


    
    $("#test-begin-input").datepicker({dateFormat:"mm/dd/yy", minDate: 0}).datepicker("setDate",new Date());
    $("#test-end-input").datepicker({dateFormat:"mm/dd/yy", minDate: 0}).datepicker("setDate",new Date());
    
    $("#test-begin-hour-input").mask("00:00:00");
    $("#test-end-hour-input").mask("00:00:00");

    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.href = "disciplinas.html";
    });



    function getHours(x)
    {
        alert(x);

        if(x == "bh") return parseInt("" + $("#test-begin-hour-input").val().charAt(0) + "" + $("#test-begin-hour-input").val().charAt(1));
        if(x == "bm") return parseInt("" + $("#test-begin-hour-input").val().charAt(3) + "" + $("#test-begin-hour-input").val().charAt(4));
        if(x == "bs") return parseInt("" + $("#test-begin-hour-input").val().charAt(6) + "" + $("#test-begin-hour-input").val().charAt(7));

        if(x == "eh") return parseInt("" + $("#test-end-hour-input").val().charAt(0) + "" + $("#test-end-hour-input").val().charAt(1));
        if(x == "em") return parseInt("" + $("#test-end-hour-input").val().charAt(3) + "" + $("#test-end-hour-input").val().charAt(4));
        if(x == "es") return parseInt("" + $("#test-end-hour-input").val().charAt(6) + "" + $("#test-end-hour-input").val().charAt(7));
    }



});