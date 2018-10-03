$(function () {
    $("#previewButton").click(function () {
        event.preventDefault()
        var name = $("#name-input").val().trim()
        $("#nameHolder").text(name)
    })
});