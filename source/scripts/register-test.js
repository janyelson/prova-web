$(function(){    

    //var api = "https://prova-api.herokuapp.com/";
    var api = "http://localhost:3000/";
    var url = api + "tests";
    var ok = false;

    for(i = 4; i <= 10; i++) $("#sel_topics" + (i+2)).hide();
    
    $("#username-topbar").text(sessionStorage.username);
    $("#username-topbar").click( function(){
        window.location.href= "my-page.html";
    });

    
    function postJson(jsonObject)
    {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
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

        var date =  $("#test-begin-input").datepicker("getDate");

        var begin_date = new Date(date);

        date = $("#test-end-input").datepicker("getDate");

        var end_date = new Date(date);

        var name = $("#test-name-input").val();

        begin_date.setHours(getHours("bh"), getHours("bm"));
        end_date.setHours(getHours("eh"), getHours("em"));
    
        for(i = 1; i <= n_topics; i++) topics.push($("#sel_topics" + (i+2)).val());  
        obj = {
            "id_user": sessionStorage.id,
            "name":$("#test-name-input").val().trim() ? $("#test-name-input").val() : "Prova", 
            "author": sessionStorage.username,
            "begin_date": new Date(begin_date.toUTCString()),
            "end_date":  new Date(end_date.toUTCString()),
            "topics": topics,
            "password": $("#test-password-input").val()
        };     

        dbParam = JSON.stringify(obj);

        postJson(dbParam);

        if(!ok) alert("Erro, tente novamente!");
        else window.location.href = "disciplina.html";
        
        return false;
        
        
    });


    
    $("#test-begin-input").datepicker({dateFormat:"dd/mm/yy", minDate: 0}).datepicker("setDate",new Date());
    $("#test-end-input").datepicker({dateFormat:"dd/mm/yy", minDate: 0}).datepicker("setDate",new Date());
    
    $("#test-begin-hour-input").mask("00:00");
    $("#test-end-hour-input").mask("00:00");

    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.href = "disciplinas.html";
    });



    function getHours(x)
    {

        if(x == "bh") return parseInt("" + $("#test-begin-hour-input").val().charAt(0) + "" + $("#test-begin-hour-input").val().charAt(1));
        if(x == "bm") return parseInt("" + $("#test-begin-hour-input").val().charAt(3) + "" + $("#test-begin-hour-input").val().charAt(4));
        if(x == "bs") return parseInt("" + $("#test-begin-hour-input").val().charAt(6) + "" + $("#test-begin-hour-input").val().charAt(7));

        if(x == "eh") return parseInt("" + $("#test-end-hour-input").val().charAt(0) + "" + $("#test-end-hour-input").val().charAt(1));
        if(x == "em") return parseInt("" + $("#test-end-hour-input").val().charAt(3) + "" + $("#test-end-hour-input").val().charAt(4));
        if(x == "es") return parseInt("" + $("#test-end-hour-input").val().charAt(6) + "" + $("#test-end-hour-input").val().charAt(7));
    }

    $("#test-questions-input").change(function() {
        var n_topics = parseInt($("#test-questions-input").val());
        for(i = 1; i <= n_topics; i++) $("#sel_topics" + (i+2)).show();
        for(i = n_topics+1; i <= 10; i++) $("#sel_topics" + (i+2)).hide();  
    });



});