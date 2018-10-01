INSERT INTO users (firstName, lastName, googleUser, createdAt, updatedAt) values ('Lisa', 'Simpson', 'LisaSimpson@gmail.com', NOW(), NOW());
INSERT INTO users (firstName, lastName, googleUser, createdAt, updatedAt) values ('Bart', 'Simpson', 'ElBarto@gmail.com', NOW(), NOW());
INSERT INTO users (firstName, lastName, googleUser, createdAt, updatedAt) values ('Maggie', 'Simpson', 'M.Simpson@gmail.com', NOW(), NOW());


INSERT INTO temps (lable, template, color, createdAt, updatedAt, UserID) values ('Resume', 'Cool Breeze', 'blue', NOW(), NOW(), 1);
INSERT INTO temps (lable, template, color, createdAt, updatedAt, UserID) values ('Store Promotion', 'Winter Storm', 'white', NOW(), NOW(), 1);
INSERT INTO temps (lable, template, color, createdAt, updatedAt, UserID) values ('Garage Sale', 'Template1', 'black', NOW(), NOW(), 2);
INSERT INTO temps (lable, template, color, createdAt, updatedAt, UserID) values ('Pool Party', 'Spring Blooms', 'pink', NOW(), NOW(), 1);
INSERT INTO temps (lable, template, color, createdAt, updatedAt, UserID) values ('Programmer Networking', 'Profesional', 'blue', NOW(), NOW(), 3);
INSERT INTO temps (lable, template, color, createdAt, updatedAt, UserID) values ('Game Convention', 'Cool Breeze', 'yellow', NOW(), NOW(), 3);


INSERT INTO mailgroups (lable, createdAt, updatedAt, UserID) values ('Close Friends', NOW(), NOW(), 3);
INSERT INTO mailgroups (lable, createdAt, updatedAt, UserID) values ('Business Partners', NOW(), NOW(), 1);
INSERT INTO mailgroups (lable, createdAt, updatedAt, UserID) values ('Party People', NOW(), NOW(), 2);
INSERT INTO mailgroups (lable, createdAt, updatedAt, UserID) values ('All', NOW(), NOW(), 3);
INSERT INTO mailgroups (lable, createdAt, updatedAt, UserID) values ('Coding Cohorts', NOW(), NOW(), 1);
INSERT INTO mailgroups (lable, createdAt, updatedAt, UserID) values ('Drinking Buddies', NOW(), NOW(), 2);
INSERT INTO mailgroups (lable, createdAt, updatedAt, UserID) values ('Business Partners', NOW(), NOW(), 1);


INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Maggie Simpson', 'Jsmith@gmail.com', NOW(), NOW(), 1);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Lisa Simpson', 'Jsmith@gmail.com', NOW(), NOW(), 1);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Marge Simpson', 'Jsmith@gmail.com', NOW(), NOW(), 2);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Bart Simpson', 'Jsmith@gmail.com', NOW(), NOW(), 2);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Homer Simpson', 'Jsmith@gmail.com', NOW(), NOW(), 2);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Ned Flanders', 'Jsmith@gmail.com', NOW(), NOW(), 3);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Milhouse Van Houten', 'Jsmith@gmail.com', NOW(), NOW(), 4);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Moe Szyslack', 'Jsmith@gmail.com', NOW(), NOW(), 4);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Barney Gumble', 'Jsmith@gmail.com', NOW(), NOW(), 5);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Edna Krabappel', 'Jsmith@gmail.com', NOW(), NOW(), 6);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Nelson Muntz', 'Jsmith@gmail.com', NOW(), NOW(), 6);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Seymour Skinner', 'Jsmith@gmail.com', NOW(), NOW(), 6);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Charles Montgomery Burns', 'Jsmith@gmail.com', NOW(), NOW(), 7);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Waylon Smithers', 'Jsmith@gmail.com', NOW(), NOW(), 7);
INSERT INTO maillists (name, email, createdAt, UpdatedAt, MailGroupId) values ('Selma Bouvier', 'Jsmith@gmail.com', NOW(), NOW(), 7);