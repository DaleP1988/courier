$(function () {
    $("#sendMailButton").click(function () {
        $.get("/api/reqLink/" + sessionStorage.getItem("courieruser").id, function (response) {
            $.post(response,{mailList,emailInfo},function(response){
                console.log("Mails Sent");
                //TODO CREATE AN EMAIL SENT MESSAGE ON SCREEN
            })
        });
    });
});