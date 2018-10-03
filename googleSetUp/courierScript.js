var ssId = "155Jx53hEuv9V98fmxu1yQYWIrw4ShwwRiTm7wyspurM"
var ss = SpreadsheetApp.openById(ssId);
var sheet = ss.getSheets()[0];

function doPost(data) {

    var data = JSON.parse(data.postData.contents)
    var mailList = data.mailList
    var emailInfo = data.emailInfo

    createMailList(mailList);
    sendMails(emailInfo);
}

function createMailList(mailList) {
    sheet.getRange("A1").setValue("Name");
    sheet.getRange("B1").setValue("Email");
    sheet.getRange("C1").setValue("Status");

    j = 0
    for (var i = 2; i < mailList.length + 2; i++) {
        sheet.getRange("A" + i).setValue(mailList[j].name)
        sheet.getRange("B" + i).setValue(mailList[j].email)
        j++
    }
}
function filledCount() {

    // Counts how many filled cells there are 
    var count = 0
    t = 1
    var tester = sheet.getRange("A" + t)
    while (tester.isBlank() != true) {
        t = t + 1
        count = count + 1
        tester = sheet.getRange("A" + t)
    }
    return count
}
function varString(str, firstname, name) {
    var newStr = str
    newStr = newStr.replace("###name###", name)
    newStr = newStr.replace("###fname###", firstname)
    return newStr
}

function sendMails(emailInfo) {
    var count = filledCount()

    //sends mail to each new user


    for (i = 2; i < count + 1; i++) {
        var name = sheet.getRange("A" + i).getValue();
        var firstname = name.split(' ')[0];
        var mail = sheet.getRange("B" + i).getValue();
        var subject = varString(emailInfo.subject, firstname, name);
        var status = sheet.getRange("D" + i);
        var body = varString(emailInfo.body, firstname, name);
        var logoURL = "https://static.wixstatic.com/media/6c153b_0af2e6af2ebd4068bd9478649dcf63f2~mv2.jpg/v1/fill/w_947,h_183,al_c,q_80,usm_0.66_1.00_0.01/6c153b_0af2e6af2ebd4068bd9478649dcf63f2~mv2.jpg"
        var logoBlob = UrlFetchApp
            .fetch(logoURL)
            .getBlob()
            .setName("logoBlob");

        if (status.isBlank()) {

            //var file = DriveApp.getFilesByName('Bibliotheque-2.jpg'); //get attachment with the quoted name
            MailApp.sendEmail({
                to: mail,
                subject: subject,
                htmlBody: body,
                //attachments: [file.next()],
                name: emailInfo.alias,
                inlineImages: {
                    logo: logoBlob
                }
            });

            sheet.getRange("C" + i).setValue("Mail Sent")

        }

    }
}