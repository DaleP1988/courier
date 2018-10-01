$(function() {
// VARIABLES
var user = JSON.parse(sessionStorage.getItem('courieruser'))
var prevData = JSON.parse(sessionStorage.getItem('courierchosen'))
var emailArr = [] // needed for importing emails to mailLists table
var manualRowCount = 1 // needed for create new manual rows

// reset user when logoff
$(".logoff").on("click", function() {
    sessionStorage.removeItem('courieruser')
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
        resetManual()
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
    choices.grouplable = $(this).attr("data-group")
    choices.user = user.id

    sessionStorage.removeItem('courierchosen')
    sessionStorage.setItem('courierchosen', JSON.stringify(choices))

    window.location = `http://localhost:3000/preview`
})

///////////////////////////////
/////// USER MAIL LIST ////////
///////////////////////////////

// create the cards
$.get(`/api/mailgroup/${user.id}`, function(data) {
    for(var i = 0; i < data.length; i++) {
        var groupEmails = data[i].MailLists
        var stringEmail = ""
        for(var j = 0; j < groupEmails.length; j++) {
            stringEmail = stringEmail + `${groupEmails[j].email} `
        }
        var card = `<div class="card blue-grey darken-1 card-mail" value="${data[i].id}"><div class="card-content white-text"><span class="card-title card-mail-title">${data[i].lable}</span><p>${stringEmail}</p></div></div>`
        var groupLi = `<div>${data[i].lable}<a class="secondary-content choose-group" value="${data[i].id} data-lable="${data[i].lable}"><i class="material-icons">send</i></a></div>`
        $("#user-group-cards").append($("<div>").addClass("col s12 m4 l3").html(card))
        $(".mail-group-choose .collection").append($("<li>").addClass("collection-item").html(groupLi))
    }
//     if ($(".preview-group-title").attr("data-group") !== "") {
//         console.log($(".preview-group-title").attr("data-group"));
//     }
})

if ($("#preview-are").length > 0) {
    var prevData = JSON.parse(sessionStorage.getItem('courierchosen'))
    console.log(prevData);
}



})