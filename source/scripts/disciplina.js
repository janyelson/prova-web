$(function(){

    //var api = "https://prova-api.herokuapp.com/";
    var api = "http://localhost:3000/";
    var url = api + "tests";
    var ok = false;
    var myObj;

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
        var xmlhttp = new XMLHttpRequest();
        var today = new Date();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
            }
        };
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        
        $('#provas-table').not(':first').remove;
        
        var html = '';
        var i = 0;
        
        for(i = 0; i < myObj.length; i++)
        {

            if(today.getTime() > (new Date(myObj[i].end_date).getTime())) continue;
            if(today.getTime() < (new Date(myObj[i].begin_date).getTime())) continue;

            var acesso;
            if(myObj[i].password.length > 0) acesso = "Fechado";
            else acesso = "Aberto";

            var begin_date = new Date(myObj[i].begin_date);
            var end_date = new Date(myObj[i].end_date);

            html += '<tr id=' + i + '>' + 
                '<td id="disciplina-test-name-' + i + '"> <a href="#">' +  myObj[i].name + '</a></td>' + 
                '<td id="disciplina-test-username-' + i + '">' + myObj[i].author + '</td>' + 
                '<td id="disciplina-test-begin_date-' + i + '">' + formatDate(begin_date) + '</td>' + 
                '<td id="disciplina-test-end_date-' + i + '">' + formatDate(end_date) + '</td>' + 
                '<td id="disciplina-test-acess-' + i + '">' + acesso + '</td></tr>';
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
        if (i < 10) {i = "0" + i};
        return i;
    }
    
    $("tr").click(function(){

        if(sessionStorage.isUser != "yes") {
            alert("É preciso estar logado!");
            window.location.reload();
            return false;
        }

        var id = parseInt($(this).attr('id'));

        if(new Date().getTime() > new Date(myObj[id].end_date).getTime())
        {
            window.location.reload();
            return false;
        }

        var url_user = api + "answersAll/user/" + sessionStorage.id;
        var hasAnswer = false;
        var answerObj;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                answerObj = JSON.parse(this.responseText);
                if(answerObj[0].username.trim) hasAnswer = true;
            }
        };
        xmlhttp.open("GET", url_user, false);
        xmlhttp.send();

        if(hasAnswer)
        {
            alert("Prova já realizada!");
            return false;
        }


        if($("#disciplina-test-acess-" + id).text() == 'Fechado') 
        {            
            var pass = prompt("Password:");

            if ( pass != myObj[id].password )
            {
                alert("Erro, senha incorreta!");
                return false;
            }
        }

        sessionStorage.setItem("testID", myObj[id]._id);
        
        window.location.href = "test.html";
    });

    function formatDate(date)
    {
        var month, day, hours, minutes;

        

        if(date.getDate() < 10) day = "0" + date.getDate();
        else day = date.getDate();

        if(date.getMonth()+1 < 10) month = "0" + date.getMonth();
        else month = date.getMonth();

        if(date.getHours() < 10) hours = "0" + date.getHours();
        else hours = date.getHours();

        if(date.getMinutes() < 10) minutes = "0" + date.getMinutes();
        else minutes = date.getMinutes();


        return day + "/" + month + "/" + date.getFullYear() + " - " + hours + ":" + minutes;
    }

    function isAfterDate(date)
    {
        var today = new Date();
    }

    $("#register-test-button").click(function(){
        if(sessionStorage.isUser == "yes") window.location.href = "register-test.html";
        else
        {
            alert("Precisa estar logado para registrar uma prova");
            window.location.reload();
        }
    });

    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.reload();
    });
});