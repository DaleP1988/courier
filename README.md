# **Courier**

Courier is an email communications platform that allows users to send large bundles of email with the simple click of a button. The service offers a user-friendly interface that includes secure access (with user authentication), mailing list management, and creative email templating. 
 

### Development

Courier was originally developed as a method to send resumes to multiple accounts at once, but it has evolved into a fully functioning email communications platform that allows users to create their own HTML templates and send to potential employers. Courier can also be used as a marketing tool for promotions and advertising.


### Tech/Frameworks

Courier's frontend was created with Materialize. The sign-in components of the UI come from Google Scripts and Google APIs. The sample email template, provided for reference and use relies on the MJML email templating framework.

Courier has a robust backend built with a Node.js and Express server side environment. Data going back and forth between the platform and servers is stored on a MySQL database and managed using a Sequelize ORM. 

Our email communications platform is deployed on Heroku. 


### Features

Courier outshines the competition with its ability to authorize and send emails directly from users' accounts.  Courier bypasses the spam filters often associated with other mass email services like MailChimp and Constant Contact.  And it can be tailored to your email design style and needs. Courier offers beautifully designed custom email templates in a variety of colors. The custom designs can be previewed and sent exactly as designed.



**Please Visit [Courier](https://courier-heroku-app.herokuapp.com/).**


### Signing in to Courier
Users can sign in to Courier using their Gmail account. 

![](https://user-images.githubusercontent.com/38080854/46576437-3c53fe80-c97e-11e8-8647-14c90b20d048.png)


### User Authentication
Courier offers secure access via User Authentication facilitated by Google. The Authentication process only requires a few steps, but we've provided an Email Account Set-Up Guide to help you speed things along.

![](https://user-images.githubusercontent.com/38080854/46576445-555caf80-c97e-11e8-9f44-632c3186132a.png)


### Generating Mail Lists
By simply clicking on the Mail Lists icon in the upper right hand corner of the toolbar, users can go to the Mail List page. From here, they can compose a Mail List (right on the platform) or upload an already-made list using Google Drive.

![](https://user-images.githubusercontent.com/38080854/46576447-5a216380-c97e-11e8-8cd4-e897a944b3bf.png)

### Creating Templates
Once a Mail List has been generated and saved, users can browse templates by clicking on the User Templates link (also in the upper right hand corner of the app). A page filled with template options will populate. Once a template is selected, the user will be prompted to choose a Mail List. Note: a template cannot be generated if a Mail List has not been uploaded or generated. From the preview template page, users can complete a form to compose their email. 


![](https://user-images.githubusercontent.com/38080854/46576452-732a1480-c97e-11e8-8dde-b49a511a01aa.png)


### Sending Emails
After designing and composing an email at the template preview page, users can send it off to their Mail List contacts!

![](https://user-images.githubusercontent.com/38080854/46576454-81783080-c97e-11e8-9ed6-b3741acbf22f.png)


### Changing User Settings
For users that like to personalize their accounts, we built settings adjustment functionality. Visit the User Settings page to 


