$(function () {
    $("#sendMailButton").click(function () {
        var emailInfo = JSON.parse(sessionStorage.getItem('courieremailinfo'))
        var user = JSON.parse(sessionStorage.getItem('courieruser'))
        var choices = JSON.parse(sessionStorage.getItem('courierchosen'))
        var mailList = JSON.parse(sessionStorage.getItem('couriermaillist'))
        var alias = $("#alias-input").val().trim()
        emailInfo.alias = alias
        var package = {mailList,emailInfo};
        var userId = user.id

        
        
        
        $.post("/api/sendEmail",  {userId, package} , function (response) {
            console.log(response);
            //TODO CREATE AN EMAIL SENT MESSAGE ON SCREEN
            $.post("/api/usertemp",{lable: emailInfo.subject, body: emailInfo.body, template: choices.template, UserId: user.id}, function(result) {
                console.log("Mails Sent");
                //TODO CREATE AN EMAIL SENT MESSAGE ON SCREEN
                sessionStorage.removeItem('courierchosen')
                sessionStorage.removeItem('couriermaillist')
                sessionStorage.removeItem('courieremailinfo')
                $("#send-promp-page").hide()
                $("#thankyou-page").show()
            })
        });
    });
});