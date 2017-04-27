var ListController = function (model, view) {
        this._model = model;
        this._view = view;
        
        var self = this;
        
        this._view.addItemEvent.attach(function () {
            self.addItem();
        });
        
        this._view.deleteItemEvent.attach(function () {
            var index = self._model.getSelectedIndex();
            self.deleteItem(index);
        });
        
        this._view.setSelectedIndexEvent.attach(function (sender, data) {
            var index = data.index;
            self.setSelectedIndex(index);
        });
        
    };
        
        
    ListController.prototype = {
        
        addItem : function () {
            var item = window.prompt("enter item name", "");
            this._model.addItem(item);
        },
        
        deleteItem : function (index) {
            this._model.deleteItem(index);
        },
        
        setSelectedIndex : function (index) {
            this._model.setSelectedIndex(index);
        }
        
    };
