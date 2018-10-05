var ss = SpreadsheetApp.openById(ssId);
var sheet = ss.getSheets()[0];

function doPost(data) {

    var data = JSON.parse(data.postData.contents);
    var mailList = data.mailList;
    var emailInfo = data.emailInfo;

    createMailList(mailList);
    sendMails(emailInfo);
};

function createMailList(mailList) {
    sheet.getRange("A1").setValue("Name");
    sheet.getRange("B1").setValue("Email");
    sheet.getRange("C1").setValue("Status");

    j = 0;
    for (var i = 2; i < mailList.length + 2; i++) {
        sheet.getRange("A" + i).setValue(mailList[j].name);
        sheet.getRange("B" + i).setValue(mailList[j].email);
        j++;
    };
};
function filledCount() {
 
    var count = 0;
    t = 1;
    var tester = sheet.getRange("A" + t);
    while (tester.isBlank() != true) {
        t = t + 1;
        count = count + 1;
        tester = sheet.getRange("A" + t);
    };
    return count;
};
function varString(str, firstname, name) {
    var newStr = str;
    newStr = newStr.replace("###name###", name);
    newStr = newStr.replace("###fname###", firstname);
    return newStr;
};

function sendMails(emailInfo) {
    var count = filledCount();


    for (i = 2; i < count + 1; i++) {
        var name = sheet.getRange("A" + i).getValue();
        var firstname = name.split(' ')[0];
        var mail = sheet.getRange("B" + i).getValue();
        var subject = varString(emailInfo.subject, firstname, name);
        var status = sheet.getRange("D" + i);
        var body = varString(emailInfo.body, firstname, name);

        if (status.isBlank()) {


            MailApp.sendEmail({
                to: mail,
                subject: subject,
                htmlBody: body,
                name: emailInfo.alias,
            });
            sheet.getRange("C" + i).setValue("Mail Sent");
        };
    };
};