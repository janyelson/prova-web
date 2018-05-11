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

    for(data in myObj)
    {
        $('#provas-table').not(':first').remove;
        var html = '';
        $('#provas-table').append('<tr><td> ajuda </tr></td>');
        for(var i = 0; i < data.d.length; i++) 
                html += '<tr><td>' + data.d[i].name + 
                        '</td><td>' + data.d[i].id_user + 
                        '</td><td>' + data.d[i].begin_data + 
                        '</td><td>' + data.d[i].end_data + 
                        '</td><td>' + data.d[i].password + '</td></tr>';
        $('#provas-table').append(html);
    }
    
    $("#logout-topbar").click(function(){
        sessionStorage.setItem("isUser", "no");
        window.location.reload();
    });
});