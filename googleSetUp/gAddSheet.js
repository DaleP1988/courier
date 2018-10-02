const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
var sheets = google.sheets('v4');
function createSheet(authClient) {
    return new Promise((res, rej) => {
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
                rej(err);
            }
            res(response.data)
        });
    })

}
module.exports = createSheet