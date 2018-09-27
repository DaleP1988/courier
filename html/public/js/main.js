// main button
$(".main-button").on("click", function() {
    if($("#main-area").hasClass("disappear")) {
        $("#main-area").removeClass("disappear")
    }
    $("#new-templates-area").addClass("disappear")
    $("#new-mail-list-area").addClass("disappear")
    $("#user-mail-list-area").addClass("disappear")
    $("#user-templates-area").addClass("disappear")
    $("#about-us-area").addClass("disappear")
    $("#settings-area").addClass("disappear")
})

// new template button
$(".new-temp-btn").on("click", function() {
    if($("#new-templates-area").hasClass("disappear")) {
        $("#new-templates-area").removeClass("disappear")
    }
    $("#main-area").addClass("disappear")
    $("#new-mail-list-area").addClass("disappear")
    $("#user-mail-list-area").addClass("disappear")
    $("#user-templates-area").addClass("disappear")
    $("#about-us-area").addClass("disappear")
    $("#settings-area").addClass("disappear")
})

// new maillist button
$(".new-mlist-btn").on("click", function() {
    if($("#new-mail-list-area").hasClass("disappear")) {
        $("#new-mail-list-area").removeClass("disappear")
    }
    $("#new-templates-area").addClass("disappear")
    $("#main-area").addClass("disappear")
    $("#user-mail-list-area").addClass("disappear")
    $("#user-templates-area").addClass("disappear")
    $("#about-us-area").addClass("disappear")
    $("#settings-area").addClass("disappear")
})

// user mail list button
$(".user-mlist-btn").on("click", function() {
    if($("#user-mail-list-area").hasClass("disappear")) {
        $("#user-mail-list-area").removeClass("disappear")
    }
    $("#new-templates-area").addClass("disappear")
    $("#new-mail-list-area").addClass("disappear")
    $("#main-area").addClass("disappear")
    $("#user-templates-area").addClass("disappear")
    $("#about-us-area").addClass("disappear")
    $("#settings-area").addClass("disappear")
})

// user template button
$(".user-temp-btn").on("click", function() {
    if($("#user-templates-area").hasClass("disappear")) {
        $("#user-templates-area").removeClass("disappear")
    }
    $("#new-templates-area").addClass("disappear")
    $("#new-mail-list-area").addClass("disappear")
    $("#user-mail-list-area").addClass("disappear")
    $("#main-area").addClass("disappear")
    $("#about-us-area").addClass("disappear")
    $("#settings-area").addClass("disappear")
})

// about up button
$(".about-us-btn").on("click", function() {
    if($("#about-us-area").hasClass("disappear")) {
        $("#about-us-area").removeClass("disappear")
    }
    $("#new-templates-area").addClass("disappear")
    $("#new-mail-list-area").addClass("disappear")
    $("#user-mail-list-area").addClass("disappear")
    $("#user-templates-area").addClass("disappear")
    $("#main-area").addClass("disappear")
    $("#settings-area").addClass("disappear")
})

// Settings button
$(".setting-btn").on("click", function() {
    if($("#settings-area").hasClass("disappear")) {
        $("#settings-area").removeClass("disappear")
    }
    $("#new-templates-area").addClass("disappear")
    $("#new-mail-list-area").addClass("disappear")
    $("#user-mail-list-area").addClass("disappear")
    $("#user-templates-area").addClass("disappear")
    $("#about-us-area").addClass("disappear")
    $("#main-area").addClass("disappear")
})