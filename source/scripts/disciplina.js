$(function(){

    var url = "http://localhost:3000/tests";
    var ok = false;
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
        var myObj;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        
        /*
        var data = {};
        
        data.d = [{FirstName: 'Beaner', Age: '20'}, 
              {FirstName: 'Cheese', Age: '98'},
              {FirstName: 'Martin', Age: '45'}];
        
        $('#provas-table').not(':first').remove;
        var html = '';
        $('#provas-table').append('<tr><td> ajuda </tr></td>');
        for(var i = 0; i < data.d.length; i++)
                    html += '<tr><td>' + data.d[i].FirstName + 
                            '</td><td>' + data.d[i].Age + '</td></tr>';
        $('#provas-table').append(html);
        */
        $('#provas-table').not(':first').remove;
        
        var html = '';
        var i = 0;
        for(i = 0; i < myObj.length; i++)
        {
             
            html += '<tr id="disciplina-test"' + myObj[i].id + '>' + 
                '<td id="disciplina-test-name"' + myObj[i].id + '>' + myObj[i].name + '</td>' + 
                '<td id="disciplina-test-username"' + myObj[i].id + '>' + myObj[i].id_user + '</td>' + 
                '<td id="disciplina-test-begin_date"' + myObj[i].id + '>' + myObj[i].begin_date + '</td>' + 
                '<td id="disciplina-test-end_date"' + myObj[i].id + '>' + myObj[i].end_date + '</td>' + 
                '<td id="disciplina-test-acess"' + myObj[i].id + '>' + myObj[i].password + '</td></tr>';
        }

        $('#provas-table').append(html);

    }


    startTime();

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

    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.reload();
    });
});