$(function(){

    var api = "https://prova-api.herokuapp.com/";
    //var api = "http://localhost:3000/";
    var url = api + "tests/user/" + sessionStorage.id;
    var ok = false;

    $("#username-topbar").text(sessionStorage.username);
    $("#username-topbar").click( function(){ window.location.href= "my-page.html";});

    function load()
    {
        var myObj;
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
            var begin_date = new Date(myObj[i].begin_date);
            var end_date = new Date(myObj[i].end_date);

            if(myObj[i].password.length > 0) acesso = "Fechado";
            else acesso = "Aberto";

            html += '<tr id=' + myObj[i]._id + '>' + 
                '<td id="my-test-name-"' + myObj[i]._id + '> <a href="#">' + myObj[i].name + '</a></td>' + 
                '<td id="my-test-begin_date-"' + myObj[i]._id + '>' + formatDate(begin_date) + '</td>' + 
                '<td id="my-test-end_date-"' + myObj[i]._id + '>' + formatDate(end_date) + '</td>' + 
                '<td id="my-test-acess-"' + myObj[i]._id + '>' + acesso + '</td></tr>';
        }
        $('#provas-table').append(html);

    }

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
        var id = $(this).attr('id');
        sessionStorage.setItem("testID", id);
        
        window.location.href = "answers.html";
    });

    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.href = '../index.html';
    });
});