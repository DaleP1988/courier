const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/script.projects', 'https://www.googleapis.com/auth/script.deployments', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/script.external_request', 'https://www.googleapis.com/auth/script.send_mail', 'https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';
function returnToken(code, oAuth2Client) {
    return new Promise((res, rej) => {
        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                rej(err)
                console.error('Error while trying to retrieve access token', err);
            }
            // Store the token to disk for later program executions
            res(token)
        });
    })
}

module.exports = returnToken