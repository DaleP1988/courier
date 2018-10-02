const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

/**
 * Creates a new script project, upload a file, and log the script's URL.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */


function callAppsScript(auth, courierSheetId) {
    return new Promise((resolve, reject) => {
        const script = google.script({ version: 'v1', auth });
        var scriptContent = 'var ssId="' + courierSheetId + '", ss=SpreadsheetApp.openById(ssId),sheet=ss.getSheets()[0];function doPost(e){var t=(e=JSON.parse(e.postData.contents)).mailList,a=e.emailInfo;createMailList(t),sendMails(a)}function createMailList(e){sheet.getRange("A1").setValue("Name"),sheet.getRange("B1").setValue("Email"),sheet.getRange("C1").setValue("Status"),j=0;for(var t=2;t<e.length+2;t++)sheet.getRange("A"+t).setValue(e[j].name),sheet.getRange("B"+t).setValue(e[j].email),j++}function filledCount(){var e=0;t=1;for(var a=sheet.getRange("A"+t);1!=a.isBlank();)t+=1,e+=1,a=sheet.getRange("A"+t);return e}function sendMails(e){var t=filledCount();for(i=2;i<t+1;i++){sheet.getRange("A"+i).getValue().split(" ")[0];var a=sheet.getRange("B"+i).getValue(),s=e.subject,l=sheet.getRange("D"+i),n=e.body,g=UrlFetchApp.fetch("https://static.wixstatic.com/media/6c153b_0af2e6af2ebd4068bd9478649dcf63f2~mv2.jpg/v1/fill/w_947,h_183,al_c,q_80,usm_0.66_1.00_0.01/6c153b_0af2e6af2ebd4068bd9478649dcf63f2~mv2.jpg").getBlob().setName("logoBlob");l.isBlank()&&(MailApp.sendEmail({to:a,subject:s,htmlBody:n,name:e.alias,inlineImages:{logo:g}}),sheet.getRange("C"+i).setValue("Mail Sent"))}}'
        script.projects.create({
            resource: {
                title: 'Courier Script',
                parentId: courierSheetId
            },
        }, (err, res) => {
            if (err) {
                reject(err);
                console.log(`The API create method returned an error: ${err}`);
            }
            script.projects.updateContent({
                scriptId: res.data.scriptId,
                auth,
                resource: {
                    files: [{
                        name: 'courier',
                        type: 'SERVER_JS',
                        source: scriptContent,
                    }, {
                        name: 'appsscript',
                        type: 'JSON',
                        source: '{"timeZone": "America/New_York", "dependencies": {},"webapp": {"access": "ANYONE_ANONYMOUS","executeAs": "USER_DEPLOYING"},"exceptionLogging": "STACKDRIVER","executionApi": {"access": "ANYONE"}}'
                    }
                    ],
                },
            }, (err, res) => {
                if (err) {
                    reject(err);
                    console.log(`The API updateContent method returned an error: ${err}`);
                }
                script.projects.versions.create({
                    scriptId: res.data.scriptId,
                    versionNumber: 1,
                    description: "courier deployment",
                    createTime: new Date()
                }, (err, res) => {
                    var thisScriptId = res.data.scriptId
                    script.projects.deployments.create({
                        scriptId: thisScriptId,
                        versionNumber: 1,
                        manifestFileName: "appsscript",
                        description: "courier deployment"
                    }, (err, res) => {
                        if (err) {
                            reject(err)
                            console.log(`The API deployments.create method returned an error: ${err}`)
                        }
                        resolve({ reqLink: res.data.entryPoints[0], authLink: `https://script.google.com/d/${thisScriptId}/edit` })
                    })
                })
            });
        });
    });

}
module.exports = callAppsScript