var ListController = function (model, view) {
        this._model = model;
        this._view = view;
        
        var self = this;
        
        this._view.addItemEvent.attach(function () {
            self.addItem();
        });
        
        this._view.deleteItemEvent.attach(function () {
            var index = $("#id1").val();
            self.deleteItem(index);
        });

        this._view.completeItemEvent.attach(function () {
            var index = $("#id1").val();
            self.completeItem(index);
        });
        
        this._view.setSelectedIndexEvent.attach(function (sender, data) {
            var index = $("#id1").val();
            self.setSelectedIndex(index);
        });
        
    };
        
        
    ListController.prototype = {
        
        addItem : function () {       
            var name = document.getElementById("name").value;
            var minutes = document.getElementById("time").value;
            var priority = document.getElementById("priority").value;
            var duedate = document.getElementById("date").value;

            var item = '{"name": "'+name+'","minutes":'+minutes+',"priority": "'+priority+'","duedate": "'+duedate+'","totaltime":0.0,"complete":false}';
            console.log(item);
            this._model.addItem(item);
        },
        
        deleteItem : function (index) {
            this._model.deleteItem(index);
        },

        completeItem : function (index) {
            this._model.completeItem(index);
        },
        
        setSelectedIndex : function (index) {
            this._model.setSelectedIndex(index);
        }
        
    };
