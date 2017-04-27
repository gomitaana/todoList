var ListModel = function(items) {
        var mydata = JSON.parse(data);
        this._items = mydata;
        this._selectedIndex = -1;
        
        this.addItemEvent = new Event(this);
        this.deleteItemEvent = new Event(this);
        this.setSelectedIndexEvent = new Event(this);
        
    };
        
        
    ListModel.prototype = {
        
        addItem : function (item) {
            this._items.push(item);
            this.addItemEvent.notify();
        },
        
        deleteItem : function (index) {
            this._items.splice(index, 1);
            this.deleteItemEvent.notify();
        },
        
        getItems: function () {
            var mydata = JSON.parse(data);
            return [].concat(this._items);
        },
        
        getSelectedIndex : function () {
            return this._selectedIndex;
        },
        
        setSelectedIndex : function (index) {
            var previousIndex = this._selectedIndex;
            this._selectedIndex = index;
            this.setSelectedIndexEvent.notify();
        },
        
    };