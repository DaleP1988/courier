// make sure to add a button

$("#prev-submit-btn").on("click", function(event){
    console.log("form submitted!")
    event.preventDefault();
    goLogo();
    goMainImg();
    goName();
    goPosition();
    goTelephone();
    goEmail();
    postHTML();
    clear();
});

function goLogo(){
    var Logo = $("#logo-input").val().trim(); 
    console.log(Logo);
    if(Logo !== ""){
        $(".logo").attr("src", Logo);
    }
}

function goMainImg(){
    var mainImage = $("#main-image").val().trim();
    console.log(mainImage);
    if(mainImage !== ""){
        $(".mainImg").attr("src" , mainImage);
    }
}


function goName(){
    var Name =  $("#name-input").val().trim();
    console.log(Name);
    if(Name !== ""){
        var tempName = $(".name");
        tempName.html("<h4>" +  Name  + "</h4>");
    }
}

function goPosition(){
    var currentPosition =  $("#position-input").val().trim();
    console.log(currentPosition);
    if(currentPosition !== ""){
        var tempPosition = $(".position");
        tempPosition.html("<h4>" + currentPosition + "<h4>");
    
    } 
}

function goTelephone(){
    var Telephone =  $("#telephone").val().trim();
    console.log(Telephone);
    if(Telephone !== ""){
        var tempPhone = $(".telephone");
        tempPhone.html("<h4>" + Telephone + "<h4>");
    } 
}

function goEmail(){
    var Email = $("#email-input").val().trim();
    console.log(Email);
    if(Email !== ""){
        var tempEmail = $(".email");
        tempEmail.html("<h4>" + Email + "<h4>");
    
    } 
}

function postHTML(lable, minHTML){
    var getHTML = $("#temp-area-prev").html();
    getHTML = getHTML.replace(/\s\s+/g,"")
    console.log(getHTML);
    return getHTML 
}

//clear form fields

function clear(){
    $("#logo-input").val("");
    $("#main-image").val("");
    $("#name-input").val("");
    $("#position-input").val("");
    $("#telephone").val("");
    $("#email-input").val("");   
}

clear();
