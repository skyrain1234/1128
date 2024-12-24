$(function () {
    checkLogin();
  });

function checkLogin(){
    var loggedInUser =  JSON.parse(localStorage.getItem("loggedInUser"))|| [];
    var user_name = loggedInUser && loggedInUser.phone ? loggedInUser.phone : "訪客";
    if(!loggedInUser || loggedInUser.length === 0){
        $("body").empty();
        window.location.href ="index.html";
    }
}

