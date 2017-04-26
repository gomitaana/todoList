$(function () {
    var model = new ListModel();
    var view = new ListView(model);
    var controller = new ListController(model, view);
 });