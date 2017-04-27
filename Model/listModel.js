var ListModel = function(items) {
        this._items = items;
        this._selectedIndex = -1;
        
        this.addItemEvent = new Event(this);
        this.deleteItemEvent = new Event(this);
        this.setSelectedIndexEvent = new Event(this);
        this.completeItemEvent = new Event(this);
        
    };
        
        
    ListModel.prototype = {
        
        addItem : function (item) {
            var factory = new Factory();
            //factory.createtask(item);

            this._items.push(JSON.parse(item));
            var dataString = "data = \'" + JSON.stringify(this._items) + "\';"
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(dataString);
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",dataStr);
            dlAnchorElem.setAttribute("download", "items.json");
            dlAnchorElem.click();
            this.addItemEvent.notify();
        },
        
        deleteItem : function (index) {
            var dataString = "data = \'" + JSON.stringify(this._items.splice(index, 1)) + "\';"
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(dataString);
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",dataStr);
            dlAnchorElem.setAttribute("download", "items.json");
            dlAnchorElem.click();
            this.deleteItemEvent.notify();
        },

        completeItem : function (index) {
            this._items[index-1].complete = true;
            var dataString = "data = \'" + JSON.stringify(this._items) + "\';"
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(dataString);
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",dataStr);
            dlAnchorElem.setAttribute("download", "items.json");
            dlAnchorElem.click();
            this.completeItemEvent.notify();
        },
        
        getItems: function () {
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

    function Factory() {
        this.createtask = function (type) {
            var task;
            var type = task.priority;
            if (type == 1) {
                task = new Low();
            } else if (type == 2) {
                task = new Medium();
            } else if (type == 3) {
                task = new High();
            }
     
            task.type = type;
     
            return task;
        }
    }

    var Low = function () {
        this.priority = "Low";
    };
     
    var Medium = function () {
        this.priority = "Medium";
    };
     
    var High = function () {
        this.priority = "High";
    };
