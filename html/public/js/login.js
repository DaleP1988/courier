// First page buttons
$("#sign-up").on("click", function() {
  $("#index-body").addClass("disappear")
  $("#sign-up-body").removeClass("disappear")
})

$("#login").on("click", function() {
  $("#index-body").addClass("disappear")
  $("#login-body").removeClass("disappear")
})

$(".back-arrow").on("click", function() {
  $("#index-body").removeClass("disappear")

  if(!$("#login-body").hasClass("disappear")) {
    $("#login-body").addClass("disappear")
  }

  if(!$("#sign-up-body").hasClass("disappear")) {
    $("#sign-up-body").addClass("disappear")
  }
})