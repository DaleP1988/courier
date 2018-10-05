$(function () {
    $("#sendMailButton").click(function () {
        var emailInfo = JSON.parse(sessionStorage.getItem('courieremailinfo'))
        var user = JSON.parse(sessionStorage.getItem('courieruser'))
        var choices = JSON.parse(sessionStorage.getItem('courierchosen'))
        var mailList = JSON.parse(sessionStorage.getItem('couriermaillist'))
        var alias = $("#alias-input").val().trim()
        emailInfo.alias = alias
        
        $.get("/api/reqLink/" + sessionStorage.getItem("courieruser").id, function (response) {
            $.post(response,{mailList, emailInfo},function(response){
                $.post("/api/usertemp",{lable: emailInfo.subject, template: emailInfo.subject, UserId: user.id}, function(result) {
                    console.log("Mails Sent");
                    console.log(response);
                    //TODO CREATE AN EMAIL SENT MESSAGE ON SCREEN
                    sessionStorage.removeItem('courierchosen')
                    sessionStorage.removeItem('couriermaillist')
                    sessionStorage.removeItem('courieremailinfo')
                    $("#send-promp-page").hide()
                    $("#thankyou-page").show()
                })
            })
        });
    });
});