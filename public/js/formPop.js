
$("#prev-submit-btn").on("click", function(event){
    console.log("form submitted!")
event.preventDefault();
goLogo();
goMainImg();
goName();
goPosition();
goTelephone();
goEmail();
// window.location.href = "output.html"

});



function goLogo(){
    var Logo = $("#main-input").val(); 
    console.log(Logo);
    if(Logo !== null){
        $(".logo").attr("src", Logo);
    }
}

function goMainImg(){
    var mainImage = $("#name-input").val();
    console.log(mainImage);
    if(mainImage !== null){
        $(".mainImg").attr("src" , mainImage);
    }
}


function goName(){
    var Name =  $("").val().trim();
    console.log(Name);
    if(Name !== null){
        var tempName = $(".name");
        tempName.append("<h4>" +  Name  + "</h4>");
    }
}

function goPosition(){
    var currentPosition =  $("#position-input").val().trim();
    console.log(currentPosition);
    if(currentPosition !== null){
        var tempPosition = $(".position");
        tempPosition.append("<h4>" + currentPosition + "<h4>");
    
    } 
}

function goTelephone(){
    var Telephone =   $("#telephone").val().trim();
    console.log(Telephone);
    if(Telephone !== null){
        var tempPhone = $(".telephone");
        tempPhone.append("<h4>" + Telephone + "<h4>");
    
    } 
}

function goEmail(){
    var Email = $("#email-input").val().trim();
    console.log(Email);
    if(Email !== null){
        var tempEmail = $(".email");
        tempEmail.append("<h4>" + Email + "<h4>");
    
    } 
}


//clear Template fields

function clear(){

    $("#main-input").val("");
    $("#name-input").val("");
    $("#position-input").val("");
    $("#telephone").val("");
    $("#email-input").val("");   
}

clear();


//push populated template to database





