const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

/**
 * Creates a new script project, upload a file, and log the script's URL.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function minify(text){
    return text.replace(/\s\s+/g,"");
}

function callAppsScript(auth, courierSheetId) {
    return new Promise((resolve, reject) => {
        const script = google.script({ version: 'v1', auth });
        var scriptInit = 'var ssId="' + courierSheetId + '";'
        fs.readFile('./googleSetUp/courierScript.js', (err, content) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log(err)
            console.log(content)
            var scriptContent = minify(scriptInit + content)

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
    });

}
module.exports = callAppsScript