$(function(){

    var url = "http://localhost:3000/tests";
    var ok = false;
    var myObj;
    var acess = [];

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
            
            var acesso;
            if(myObj[i].password.length > 0) acesso = "Fechado";
            else acesso = "Aberto";

            acess.push

            html += '<tr id=' + i + '>' + 
                '<td id="disciplina-test-name-' + i + '">' + myObj[i].name + '</td>' + 
                '<td id="disciplina-test-username-' + i + '">' + myObj[i].author + '</td>' + 
                '<td id="disciplina-test-begin_date-' + i + '">' + myObj[i].begin_date + '</td>' + 
                '<td id="disciplina-test-end_date-' + i + '">' + myObj[i].end_date + '</td>' + 
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
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
    
    $("tr").click(function(){
        var id = parseInt($(this).attr('id'));

        if($("#disciplina-test-acess-" + id).text() == 'Fechado') 
        {            
            var pass = prompt("Password:");

            if ( pass != myObj[id].password )
            {
                alert("Erro, senha incorreta!");
                return false;
            } else alert("Senha correta!");
        }

        sessionStorage.setItem("testID", myObj[id]._id);
        
        window.location.href = "test.html";
    });

    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.reload();
    });
});