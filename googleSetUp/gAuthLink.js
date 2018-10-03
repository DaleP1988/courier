const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/script.projects', 'https://www.googleapis.com/auth/script.deployments', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/script.external_request', 'https://www.googleapis.com/auth/script.send_mail', 'https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

if (process.env.HEROKU_DEPLOYED) {
  var clientCredentials =
  {
    "installed": {
      "client_id": process.env.CLIENT_ID,
      "project_id": process.env.PROJECT_ID,
      "auth_uri": process.env.AUTH_URI,
      "token_uri": process.env.TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER,
      "client_secret": process.env.CLIENT_SECRET,
      "redirect_uris": [process.env.REDIRECT_URIS1, process.env.REDIRECT_URIS2]
    }
  }
}


//========================================================================================
//1) GET AUTHORIZATION
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function getAuthUrl(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  return { authUrl, oAuth2Client };

}

function run() {
  return new Promise((res, rej) => {
    if (process.env.HEROKU_DEPLOYED) {
      res(getAuthUrl(clientCredentials))
    }
    else {
      fs.readFile('./config/credentials.json', (err, content) => {
        if (err) {

          console.log('Error loading client secret file:', err);
          rej(err)
        }
        // Authorize a client with credentials, then call the Google Sheets API.
        res(getAuthUrl(JSON.parse(content)));
      });
    }
  });
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

module.exports = run()
  //========================================================================================