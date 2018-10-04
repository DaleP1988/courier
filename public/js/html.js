$(function() {
// VARIABLES
var user = JSON.parse(sessionStorage.getItem('courieruser'))
var prevData = JSON.parse(sessionStorage.getItem('courierchosen'))
var emailArr = [] // needed for importing emails to mailLists table
var manualRowCount = 1 // needed for create new manual rows

// reset user when logoff
$(".logoff").on("click", function() {
    sessionStorage.removeItem('courieruser')
    sessionStorage.removeItem('courierchosen')
    sessionStorage.removeItem('couriersignin')
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out.')
    })
})

///////////////////////////////
/////////// SETTINGS //////////
///////////////////////////////

// change settings
$("#change-settings").on("click", function(event) {
    event.preventDefault()

    // change profile image
    var changeImg = $("#img-changer").val().trim()
    var changebg = $("#bg-changer").val().trim()
    if (changeImg !== null && isUrlImage(changeImg)) {
        $(".circle").attr("src", changeImg)
    } else if (changebg !== null && isUrlImage(changebg)){
        $(".sidenav-background").attr("src", changebg)
    }

    // Clear all
    $("#img-changer").val("")
    $("#bg-changer").val("")
})

// check if its link is an img
var isUrlImage = (url) => {
    url = url.split("?")[0]
    var parts = url.split(".")
    var extension = parts[parts.length-1]
    var imageTypes = ["jpg","jpeg","tiff","png","gif","bmp"]
    if(imageTypes.indexOf(extension) !== -1) {
        return true
    }
}


///////////////////////////////
///// NEW MAIL LIST IMPORT ////
///////////////////////////////

// radio Button Choosing
$("input[name=import-choice]").on("change", function() {
    // change blacktext CSS on radio button
    $("input[name=import-choice]").next().removeClass("black-text")
    $(this).next().addClass("black-text")

    // open options
    var importChoice = $(this).val()

    if (importChoice === "google") {
        $("#google").removeClass("disappear")
        $("#manual").addClass("disappear")
    } else if (importChoice = "manual") {
        manualRowCount = 1
        $("#manual").removeClass("disappear")
        $("#google").addClass("disappear")
    } else {
        $("#manual, #google").addClass("disappear")
    }
    resetManual()
})

// submitting google worksheet and reading it
$("#google-submit").on("click", function(event) {
    event.preventDefault()

    var googleLable = $("#google-lable").val().trim()
    var googleLink = $("#google-share-link").val().trim()
    googleLink = /\/([\w-_]{15,})\/(.*?gid=(\d+))?/.exec(googleLink)

    GetSheetDone.labeledCols(googleLink[1], 1)
    .then((result) => {
        emailArr = []
        emailArr = result.data

        if (emailArr.length > 0 && googleLable.length > 0) {
            postToMailGroup(user.id, googleLable)
        }
    }).catch(err => {
        console.log('Error', err)
    })
})

// post emails to mailgroup list and get id back
var postToMailGroup = (userId, groupName) => {
    
    var newMailGroup = {
        lable: groupName,
        UserId: user.id
    }

    $.post("/api/mailgroup", newMailGroup)
    .then(function(result) {
        var id = result.id
        var colName = Object.keys(emailArr[0])[0]
        var colEmail = Object.keys(emailArr[0])[1]
        emailArr.forEach(function(e) {
            if (/.+\@.+\..+/gi.test(e[colEmail]) && e[colName] !== "") {
                postToMailList(id, e[colName], e[colEmail])
            }
        })
    })
}

// post emails to maillist
var postToMailList = (GroupId, name, email) => {
    var newMail = {
        name: name,
        email: email,
        MailGroupId: GroupId
    }

    $.post("/api/maillist", newMail)
    .then(function(result) {
        window.location = "/usermail"
    })
}

// add and remove new row for manual entry
$(document).on("keyup", ".manual-name, .manual-email", addRemoveManualRow)

function addRemoveManualRow() {
    var checkName = false
    var checkEmail = false

    // check if all names are filled
    $('.manual-name').each(function() {
        if ( $(this).val() === '' ) {
            return checkName = false
        }
        else {
            return checkName = true
        }
    })

    // check if all emails are filled
    if (checkName) {
        $('.manual-email').each(function() {
            if ( $(this).val() === '' ) {
                return checkEmail = false
            }
            else {
                return checkEmail = true
            }
        })
    }

    // Create new div
    if (checkEmail) {
        manualRowCount += 1
        var newDiv = $(`<div class="input-${manualRowCount}"><div class="input-field col s6"><input type="text" class="validate manual-name" placeholder="Contact Full Name"></div><div class="input-field col s6"><input type="email" class="validate manual-email" placeholder="Contact Email Address"></div></div>`)

        $("#manual-rows").append(newDiv)
    }

    // remove 1 row if 2 are empty if empty
    if (!checkEmail) {
        var secRowName = $(`.input-${manualRowCount-1} .input-field .manual-name`).val()
        var secRowEmail = $(`.input-${manualRowCount-1} .input-field .manual-email`).val()
        var lastRowName = $(`.input-${manualRowCount} .input-field .manual-name`).val()
        var lastRowEmail = $(`.input-${manualRowCount} .input-field .manual-email`).val()

        if (lastRowName === "" && lastRowEmail === "" && secRowName === "" && secRowEmail === "") {
            $(`.input-${manualRowCount}`).remove()
            manualRowCount -= 1
        }
    }
}


$("#manual-submit").on("click", function() {
    event.preventDefault()
    emailArr = []

    // create Mail Group if first input is not blank
    var firstName = $(`.input-1 .input-field .manual-name`).val().trim()
    var firstEmail = $(`.input-1 .input-field .manual-email`).val().trim()
    var manlable = $("#manual-lable").val().trim()
    
    if (manualRowCount >= 1 && firstName !== "" && /.+\@.+\..+/gi.test(firstEmail) && manlable !== "") {
        for (let i = 1; i < manualRowCount; i++) {
            var name = $(`.input-${i} .input-field .manual-name`).val().trim()
            var email = $(`.input-${i} .input-field .manual-email`).val().trim()
            var obj = {name: name, email: email}
            emailArr.push(obj)
        }
        
        postToMailGroup(user.id, manlable)
    } else {
        $(".helper-text").text("there is an error somewhere, please check your entrys")
    }
})

// reset all
var resetManual = () => {
    manualRowCount = 1
    emailArr = []

    // delete all but first manual entry
    $("#manual-rows").empty()
    var newDiv = $(`<div class="input-${manualRowCount}"><div class="input-field col s6"><input type="text" class="validate manual-name" placeholder="Contact Full Name"></div><div class="input-field col s6"><input type="email" class="validate manual-email" placeholder="Contact Email Address"></div></div>`)
    $("#manual-rows").append(newDiv)

    // clear all inputs
    $(".helper-text").text("")
    $("#manual-lable").val("")
    $("#google-lable").val("")
    $("#google-share-link").val("")
}

///////////////////////////////
//////// NEW TEMPLATES ////////
///////////////////////////////
$(".card-template").on("click", function() {
    var template = $(this).attr("data-template")
    var tempImg = $(this).find(".card-image").find("img").attr("src")
    $(".new-temp-prev ").empty()
    $(".new-temp-prev ").append($("<h4>").addClass("center modal-temp-title").text(template))
    $(".new-temp-prev ").append($("<img>").addClass("responsive-img").attr("src", tempImg))
})

$(".temp-take-btn").on("click", function() {
    var tempChose = $(".modal-temp-title").text()
    $(".choose-group").removeAttr("data-chosen")
    $(".choose-group").attr("data-chosen", tempChose)

    $(".mail-group-choose").removeClass("disappear")
    $(".temp-back-btn").removeClass("disappear")
    $(".new-temp-prev").addClass("disappear")
    $(".temp-take-btn").addClass("disappear")
})

$(".temp-back-btn").on("click", function() {
    $(".mail-group-choose").addClass("disappear")
    $(".temp-back-btn").addClass("disappear")
    $(".new-temp-prev").removeClass("disappear")
    $(".temp-take-btn").removeClass("disappear")
})

$(document).on("click", ".choose-group", function() {
    var choices = {}
    choices.template = $(this).attr("data-chosen")
    choices.groupid = $(this).attr("value")
    choices.grouplable = $(this).attr("data-lable")
    choices.user = user.id

    sessionStorage.removeItem('courierchosen')
    sessionStorage.setItem('courierchosen', JSON.stringify(choices))

    window.location = `/preview`
})

///////////////////////////////
//////// Preview Page /////////
///////////////////////////////
if (window.location.pathname === "/preview" && sessionStorage.getItem('courierchosen') === null) {
    window.location = "/newtemp"
} else if (window.location.pathname === "/preview") {
    $(".preview-group-title").text(prevData.grouplable)
    $.get(`/api/newtemp/${prevData.template}`, function(data) {
        $("#temp-area-prev").html(data.template)
    })
}

$("#user-temp-lable").on("keyup", function() {
    if($("#user-temp-lable").val().trim().length > 0) {
        $("#prev-submit-btn").removeClass("disabled")
    } else {
        $("#prev-submit-btn").addClass("disabled")
    }
})

// $("#prev-submit-btn").on("click", function() {
//     var userTemp = $("#temp-area-prev").html()
//     var userlable = $("#user-temp-lable").val().trim()
//     var mailList = [
//         {
//             "name":"Dale Padelford",
//             "email":"jeffymenda@gmail.com"
//         },
//         {
//             "name":"Jeremy You",
//             "email":"cefi@vamoose.it"
//         },
//         {
//             "name":"Cefi Menda",
//             "email":"cefimenda@intellioninc.com"
//         }
//     ]
//     var emailInfo = {
//         subject:"some subject ###fname###",
//         body:userTemp,
//         alias:"I am great"
//     }
//     $.get("/api/reqLink/" + JSON.parse(sessionStorage.getItem("courieruser")).id, function (response) {
//         $.post(response,{mailList,emailInfo},function(response){
//             console.log("Mails Sent");
//             console.log(response);
//             //TODO CREATE AN EMAIL SENT MESSAGE ON SCREEN
//         })
//     });
// })

///////////////////////////////
/////// USER TEMPLATE ////////
///////////////////////////////


///////////////////////////////
/////// USER MAIL LIST ////////
///////////////////////////////
var mailArr

// Page reload get all of user's mailgroups and maillists
var maillistByUser = (cb) => {
    $.get(`/api/mailgroup/${user.id}`, function(data) {
        mailArr = data
        cb()
    })
}

// create cards with info in mailArr (need maillistByUser to be called first)
var inputAllCards = () => {
    if ($.isEmptyObject(mailArr)) {
        $("#user-group-cards").html($("<h6 class='title center'>You currently have no Mail Groups, please go to <a href='/newmail'>New Mail List</a> to create your email groups</h6>"))
    } else {
        $("#user-group-cards").empty()
        for (var g = 0; g < mailArr.length; g++) {
            var card = createMailistCard(g)
            $("#user-group-cards").append($("<div>").addClass("col s12 m4").html(card))
        }
        
    }
}

// Function to create the card by location in array
var createMailistCard = (i) => {
    var groupEmailArr = mailArr[i].MailLists

    var stringEmail = ""
    for(var y = 0; y < groupEmailArr.length; y++) {
        stringEmail = stringEmail.concat(`${groupEmailArr[y].name}: ${groupEmailArr[y].email}<br>`)
    }

    var card = `<div data-target="modal-mail" class="modal-trigger card blue-grey darken-1 card-mail" value="${mailArr[i].id}" data-thisgroup="${mailArr[i].lable}"><div class="card-content white-text"><span class="card-title card-mail-title">${mailArr[i].lable}</span><p id="string-${mailArr[i].id}">${stringEmail}</p></div></div>`
    return card
}

// on uswe window will get mail by user and load cards
if (window.location.pathname === "/usermail") {
    maillistByUser(inputAllCards)
}

// find location were groupid = paramid
var arrPlaceById = (id) => {
    var place
    for (var z = 0; z < mailArr.length; z++) {
        if(mailArr[z].id === id) {
            place = z
        }
    }
    return place
}

// create model Li with Mailarr by groupid
var createModelEmailEdit = (groupPlace, mailPlace) => {
    var mailList = mailArr[groupPlace].MailLists[mailPlace]
    
    var perEmail = `<div data-groupid="${mailArr[groupPlace].id}"><span id="this-span-name-${mailList.id}">${mailList.name}</span><input type='text' class='edit-name' style='display: none;'> : <span id="this-span-email-${mailList.id}">${mailList.email}</span><input type='text' class='edit-email' style='display: none;'> <a class="secondary-content clear-email" value="${mailList.id}"><i class="material-icons red-text">clear</i></a> <a class="secondary-content done-email" value="${mailList.id}" style="display:none;"><i class="material-icons">check</i></a> <a class="secondary-content update-email" value="${mailList.id}"><i class="material-icons">border_color</i></a></div>`
    var emailLi = $(`<li id="email-${mailList.id}">`).addClass("collection-item").html(perEmail)

    return emailLi
}

// open email list edit module
$(document).on("click", ".card-mail", function() {
    var groupName = $(this).attr("data-thisgroup")
    var groupId = $(this).attr("value")
    var arrPlace = arrPlaceById(parseInt(groupId))
    var mailListArr = mailArr[arrPlace].MailLists

    $("#modal-mail").attr("value", groupId)
    $(".user-mail-card").html($('<ul class="collection with-header">').append(`<li class="collection-header"><h4 id="group-name-h4">${groupName}</h4><input type='text' class='edit-group-input' style='display: none;'></li>`))
    for(var t = 0; t < mailListArr.length; t++) {
        var perEmail = createModelEmailEdit(arrPlace, t)
        $(".user-mail-card .collection").append(perEmail)
    }
})

// delete email from group
$(document).on("click", ".clear-email", function() {
    var emailId = $(this).attr("value")

    $.ajax({
        method: "DELETE",
        url: "/api/maillist/" + emailId
    }).then(function(results) {
        $(`#email-${emailId}`).remove()
        maillistByUser(inputAllCards)
    });
    
})

// update email from group
$(document).on("click", ".update-email", function() {
    var emailId = $(this).attr("value")
    var spanName = $(`#this-span-name-${emailId}`).text();
    var spanEmail = $(`#this-span-email-${emailId}`).text();
    // btns
    $(`#email-${emailId} div .update-email`).hide()
    $(`#email-${emailId} div .done-email`).show()

    // hide span and show input
    $(`#this-span-name-${emailId}`).hide()
    $(`#this-span-email-${emailId}`).hide()
    $(`#email-${emailId} div .edit-name`).show()
    $(`#email-${emailId} div .edit-email`).show()
    $(`#email-${emailId} div .edit-name`).focus()

    // add current value
    $(`#email-${emailId} div .edit-name`).val(spanName)
    $(`#email-${emailId} div .edit-email`).val(spanEmail)
})

$(document).on("click", ".done-email", function() {
    var groupId = $(this).parent().attr("data-groupid")
    var emailId = $(this).attr("value")
    var editName = $(`#email-${emailId} div .edit-name`).val().trim()
    var editEmail = $(`#email-${emailId} div .edit-email`).val().trim()

    // // update database
    $.ajax({
        method: "PUT",
        url: "/api/maillist",
        data: {id: emailId, name: editName, email: editEmail}
    }).then(function(result) {
        // edit li
        $(`#this-span-name-${emailId}`).text(editName)
        $(`#this-span-email-${emailId}`).text(editEmail)

        // btns
        $(`#email-${emailId} div .update-email`).show()
        $(`#email-${emailId} div .done-email`).hide()

        // show span and hide input
        $(`#this-span-name-${emailId}`).show()
        $(`#this-span-email-${emailId}`).show()
        $(`#email-${emailId} div .edit-name`).hide()
        $(`#email-${emailId} div .edit-email`).hide()

        // update cards
        maillistByUser(inputAllCards)
    });
})

// delete group
$("#delete-group-name").on("click", function() {
    var groupId = $(this).parent().parent().attr("value")

    $.ajax({
        method: "DELETE",
        url: "/api/mailgroup/" + groupId
    }).then(function(results) {
        maillistByUser(inputAllCards)
    });
    
})

// udpate group
$("#edit-group-name").on("click", function() {
    var currentVal = $(`#group-name-h4`).text()
    $(`.edit-group-input`).val(currentVal)
    
    // show hide buttons and spans
    $(`#group-name-h4`).hide()
    $(`.edit-group-input`).show()
    $(`.edit-group-input`).focus()
    $("#edit-group-name").hide()
    $("#change-group-name").show()
})

$("#change-group-name").on("click", function() {
    var groupId = $(this).parent().parent().attr("value")
    var newVal = $(`.edit-group-input`).val()
    console.log(groupId);
    console.log(newVal);
    
    $.ajax({
        method: "PUT",
        url: "/api/mailgroup",
        data: {id: groupId, lable: newVal}
    }).then(function(result) {
        // change txt
        $(`#group-name-h4`).text(newVal)

        // show hide all
        $(`#group-name-h4`).show()
        $(`.edit-group-input`).hide()
        $("#edit-group-name").show()
        $("#change-group-name").hide()

        maillistByUser(inputAllCards)
    });
})

})