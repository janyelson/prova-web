$(function(){    

    var topics;
    var test;
    var questions;
    
    
    if(sessionStorage.isUser == "yes"){
        
        $("#login-topbar").hide();
        $("#signup-topbar").hide();
        
        $("#username-topbar").text(sessionStorage.username);
        
    } else
    {
        $("#user-name-topbar").hide();
        $("#logout-topbar").hide();
    }
    
    function load()
    {
        var url = "http://localhost:3000/tests/"  + sessionStorage.getItem("testID");
        var xmlhttpTest = new XMLHttpRequest();
        xmlhttpTest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                test = JSON.parse(this.responseText);
                topics = test.topics;
            }
        };
        xmlhttpTest.open("GET", url, false);
        xmlhttpTest.send();
        
        
        
        url = "http://localhost:3000/questions/topics/Engenharia_de_Software";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                questions = JSON.parse(this.responseText);
                alert(questions);
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(JSON.stringify(test));
        
        
        

    }
    
    load();
    
    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.reload();
    });
});