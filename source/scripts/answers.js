$(function(){

    var url = "http://localhost:3000/answersAll/test/" + sessionStorage.testID;
    var ok = false;

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
        var myObj;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
                alert(this.responseText);
            }
        };
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        
        $('#provas-table').not(':first').remove;
        
        var html = '';
        var i = 0;
        
        for(i = 0; i < myObj.length; i++)
        {
            var y = 0
            var acertos = 0;
            for(y = 0; y < myObj[i].answers.length; y++) if(myObj[i].answers[y]) acertos++;
             
            html += '<tr id=' + myObj[i]._id + '>' + 
                '<td id="answers-test-name-"' + myObj[i]._id + '>' + myObj[i].id_user + '</td>' + 
                '<td id="answers-test-hits-"' + myObj[i]._id + '>' + acertos + '/' + myObj[i].answers.length + '</td>' + 
                '<td id="answers-test-score-"' + myObj[i]._id + '>' + ((10/myObj[i].answers.length)*acertos) + '</td></tr>' 
        }
        
        $('#provas-table').append(html);

    }

    startTime();
    load();


    function startTime() {

        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        $("#clock").text(h + ":" + m + ":" + s);
        var t = setTimeout(startTime, 500);
    }

    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
    
    $("tr").click(function(){
        var id = $(this).attr('id');
        sessionStorage.setItem("testID", id);
        
        window.location.href = "answers.html";
    });

    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.href = '../index.html';
    });
});