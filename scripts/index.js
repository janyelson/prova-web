$(function(){

  if(sessionStorage.isUser == "yes"){
    $("#navbar-signup").hide();
    $("#navbar-login").hide();
    $("#navbar-username").text(sessionStorage.username);

  } else

  {
    $("#navbar-divider").hide();
    $("#navbar-dropClasses").hide();
    $("#navbar-dropUser").hide();
  }


  $("#navbar-logout").click(function(){
    sessionStorage.setItem("isUser", "no");
    window.location.reload();
  });

});
