const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/script.projects', 'https://www.googleapis.com/auth/script.deployments', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/script.external_request', 'https://www.googleapis.com/auth/script.send_mail', 'https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Sheets API.
//   authorize(JSON.parse(content), listMajors);
// });

//========================================================================================
//1) GET AUTHORIZATION
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
//========================================================================================


//2) insert google Sheet
//3) insert google Script
//4) deploy google Script
//5) authorize google Script
//6) store google Script http request target URL




// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Google Sheets API
//    and check the quota for your project at
//    https://console.developers.google.com/apis/api/sheets
// 2. Install the Node.js client library by running
//    `npm install googleapis --save`

var sheets = google.sheets('v4');

var courierSheetId;

function createSheet(authClient) {
  var request = {
    resource: {
      properties: {
        title: "Courier SpreadSheet Created At " + String(new Date())
      }
    },

    auth: authClient,
  };

  sheets.spreadsheets.create(request, function (err, response) {
    if (err) {
      console.error(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(response.data);
    courierSheetId = response.data.spreadsheetId
    fs.writeFile('courierSheet.json', JSON.stringify(response.data), (err) => {
      if (err) console.error(err);
      console.log('Spreadsheet Data Stored to courierSheet.json');
    });
    authAction(callAppsScript);
  });
}


/**
 * Creates a new script project, upload a file, and log the script's URL.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */


function callAppsScript(auth) {
  const script = google.script({ version: 'v1', auth });
  var scriptContent = 'var ssId="' + courierSheetId + '",ss=SpreadsheetApp.openById(ssId),sheet=ss.getSheets()[0];function doPost(e){var t=(e=JSON.parse(e.postData.contents)).mailList,a=e.emailInfo;createMailList(t),sendMails(a)}function createMailList(e){j=0;for(var t=2;t<e.length+2;t++)sheet.getRange("A"+t).setValue(e[j].name),sheet.getRange("B"+t).setValue(e[j].email),j++}function filledCount(){var e=0;t=1;for(var a=sheet.getRange("A"+t);1!=a.isBlank();)t+=1,e+=1,a=sheet.getRange("A"+t);return e}function sendMails(e){var t=filledCount();for(i=2;i<t+1;i++){sheet.getRange("A"+i).getValue().split(" ")[0];var a=sheet.getRange("B"+i).getValue(),s=e.subject,l=sheet.getRange("D"+i),n=e.body,g=UrlFetchApp.fetch("https://static.wixstatic.com/media/6c153b_0af2e6af2ebd4068bd9478649dcf63f2~mv2.jpg/v1/fill/w_947,h_183,al_c,q_80,usm_0.66_1.00_0.01/6c153b_0af2e6af2ebd4068bd9478649dcf63f2~mv2.jpg").getBlob().setName("logoBlob");l.isBlank()&&(MailApp.sendEmail({to:a,subject:s,htmlBody:n,name:e.alias,inlineImages:{logo:g}}),sheet.getRange("C"+i).setValue("Mail Sent"))}}'
  console.log(courierSheetId)
  script.projects.create({
    resource: {
      title: 'Courier Script',
      parentId: courierSheetId
    },
  }, (err, res) => {
    if (err) return console.log(`The API create method returned an error: ${err}`);
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
      if (err) return console.log(`The API updateContent method returned an error: ${err}`);
      script.projects.versions.create({
        scriptId: res.data.scriptId,
        versionNumber: 1,
        description: "courier deployment",
        createTime: new Date()
      }, (err, res) => {
        script.projects.deployments.create({
          scriptId: res.data.scriptId,
          versionNumber: 1,
          manifestFileName: "appsscript",
          description: "courier deployment"
        }, (err, res) => {
          console.log(res)
          if (err) return console.log(`The API deployments.create method returned an error: ${err}`)
          console.log(`https://script.google.com/d/${res.data.scriptId}/edit`);
          console.log(res.data.entryPoints[0])
        })
      })
    });
  });
}

async function authAction(callback) {
  await fs.readFile('credentials.json', async (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    await authorize(JSON.parse(content), callback);
  });
}

async function sequence() {
  await authAction(createSheet);
  console.log("create sheet authorization done")
  // await authAction(callAppsScript);
}

sequence()
