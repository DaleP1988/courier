$(function () {
    $("#sendMailButton").click(function () {
        

        $.get("/api/reqLink/" + sessionStorage.getItem("courieruser").id, function (response) {
            $.post(response,{mailList:mailGroup,emailInfo},function(response){
                console.log("Mails Sent");
                console.log(response);
                //TODO CREATE AN EMAIL SENT MESSAGE ON SCREEN
            })
        });
    });
});