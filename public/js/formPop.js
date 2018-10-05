
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
// window.location.href = "output.html"

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


//making strings of each digit and rebuilding ...substrings
//database req 10
//


function goEmail(){
    var Email = $("#email-input").val().trim();
    console.log(Email);
    if(Email !== ""){
        var tempEmail = $(".email");
        tempEmail.html("<h4>" + Email + "<h4>");
    
    } 
}

function postHTML(){
var getHTML = $("#temp-area-prev").html();
   //this eliminates the spaces  jquery reg ex replace space from string
console.log(minify(getHTML));
var minHTML = minify(getHTML);
var params = {
    lable: "Default-Green",
    template: minHTML
}
$.post("/api/sendTemplate", params, function(){   //sends to the api/sendTemplate in api routes 
    alert("sent email");                            //this is in client
});                                                 //send this somewhere, locally
                                                    //server is going to see if it has code to complete 
}

function minify(text){
    return text.replace(/\s\s+/g,"");

}

//html method replaces rather than adds on
//empty string means nothing between the quotes


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




// when declaring not calling, no semi-colon...