$(function(){    

    var api = "https://prova-api.herokuapp.com/";
    var topics;
    var index = 0;
    var answers = [];
    var test;
    var questions;
    
    
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
    
    function load()
    {
        var url = api + "tests/"  + sessionStorage.getItem("testID");
        var xmlhttpTest = new XMLHttpRequest();
        xmlhttpTest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                test = JSON.parse(this.responseText);
                topics = test.topics;
            }
        };
        xmlhttpTest.open("GET", url, false);
        xmlhttpTest.send();
        
        
        
        url = api + "questions/topics/Engenharia_de_Software";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                questions = JSON.parse(this.responseText);

                $("#test-question").html(questions[0].q);
                $("#test-opt-1").html('<input id="radio-1" type="radio" name="optradio"> <b>A)</b> ' + questions[0].op1);
                $("#test-opt-2").html('<input id="radio-2" type="radio" name="optradio"> <b>B)</b> ' + questions[0].op2);
                $("#test-opt-3").html('<input id="radio-3" type="radio" name="optradio"> <b>C)</b> ' + questions[0].op3);
                $("#test-opt-4").html('<input id="radio-4" type="radio" name="optradio"> <b>D)</b> ' + questions[0].op4);
                $("#test-opt-5").html('<input id="radio-5" type="radio" name="optradio"> <b>E)</b> ' + questions[0].op5);
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(JSON.stringify(test));
        
        
        

    }
    
    load();

    $("#next-question").click(function() {

        answers.push($("#radio-" + questions[index].a).is(':checked'));

        index++;

        if(index < topics.length)
        {
            $("#test-question").html(questions[index].q);
            $("#test-opt-1").html('<input id="radio-1" type="radio" name="optradio"> <b>A)</b> ' + questions[index].op1);
            $("#test-opt-2").html('<input id="radio-2" type="radio" name="optradio"> <b>B)</b> ' + questions[index].op2);
            $("#test-opt-3").html('<input id="radio-3" type="radio" name="optradio"> <b>C)</b> ' + questions[index].op3);
            $("#test-opt-4").html('<input id="radio-4" type="radio" name="optradio"> <b>D)</b> ' + questions[index].op4);
            $("#test-opt-5").html('<input id="radio-5" type="radio" name="optradio"> <b>E)</b> ' + questions[index].op5);
            if(index == topics.length-1) $(this).text("Finalizar");
        }
        else 
        {
            
            var json = {
                "id_test": test._id,
                "id_user": sessionStorage.id,
                "answers": answers,
            };

            //POST Answers
            url = "http://localhost:3000/answersAll";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var answers = JSON.parse(this.responseText);
                    alert(this.responseText);
                }
            };
            xmlhttp.open("POST", url, true);
            xmlhttp.setRequestHeader("Content-type", "application/json");
            xmlhttp.send(JSON.stringify(json));
        }   
    });
    
    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.reload();
    });
});