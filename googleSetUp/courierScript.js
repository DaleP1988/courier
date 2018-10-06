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
    sheet.getRange("D1").setValue("groupID");
    sheet.getRange("E1").setValue("groupID");

    j = 0;
    for (var i = 2; i < mailList.length + 2; i++) {
        sheet.getRange("A" + i).setValue(mailList[j].name);
        sheet.getRange("B" + i).setValue(mailList[j].email);
        sheet.getRange("C" + i).setValue("");
        sheet.getRange("D" + i).setValue(mailList[j].groupID);
        sheet.getRange("E" + i).setValue(mailList[j].company);

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
function varString(str, user) {
    var newStr = str;
    newStr = newStr.replace("###name###", user.name);
    newStr = newStr.replace("###fname###", user.firstname);
    newStr = newStr.replace("###groupID###", user.groupID);
    newStr = newStr.replace("###email###", user.mail);
    newStr = newStr.replace("###company###", user.company);

    return newStr;
};

function sendMails(emailInfo) {
    var count = filledCount();

    for (i = 2; i < count + 1; i++) {
        var user = {
            name: sheet.getRange("A" + i).getValue(),
            firstname: sheet.getRange("A" + i).getValue().split(' ')[0],
            mail: sheet.getRange("B" + i).getValue(),
            groupID: sheet.getRange("D" + i).getValue(),
            company: sheet.getRange("E" + i).getValue()
        };

        var subject = varString(emailInfo.subject, user);
        var status = sheet.getRange("C" + i);
        var body = varString(emailInfo.body, user);

        if (status.isBlank() || status === "") {
            MailApp.sendEmail({
                to: user.mail,
                subject: subject,
                htmlBody: body,
                name: emailInfo.alias,
            });
            sheet.getRange("C" + i).setValue("Mail Sent");
        };
    };
};