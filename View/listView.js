var Event = function (sender) {
        this._sender = sender;
        this._listeners = [];
    }
    
    Event.prototype = {
      
        attach: function (listener) {
            this._listeners.push(listener);
        },
        
        notify : function (args) {
            for(var i = 0; i < this._listeners.length; i += 1) {
             this._listeners[i](this._sender, args);   
            }
        }
        
    };
        
    var ListView = function (model, elements) {
        this._model = model;
        this._elements = elements;
        
        this.addItemEvent = new Event(this);
        this.deleteItemEvent = new Event(this);
        this.setSelectedIndexEvent = new Event(this);
        
        
        var self = this;
        
        this._model.addItemEvent.attach(function(){
            self.rebuildList();
        });
        
        this._model.deleteItemEvent.attach(function (){
            self.rebuildList();
        });
        
        
        this._elements.list.change(function (event) {
            var index = event.currentTarget.selectedIndex;
            self.setSelectedIndexEvent.notify({index : index});
        });
        
        this._elements.addButton.click(function () {
            self.addItemEvent.notify();
        });
        
        this._elements.delButton.click(function () {
           self.deleteItemEvent.notify();
        });
        
    };
        
    ListView.prototype = {
        
        show : function () {
            this.rebuildList();
        },
        
        rebuildList : function () {
            console.log(this._model._items);
            var data = this._model._items;
            var iter = new Iterator(data);
            var i = 0;

            for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
                var name = "";
                var minutes = "";
                var priority= "";
                var duedate= "";
                $.each(data[i], function(key, val) {
                    if(key == "name"){
                      name = val;
                    }
                    if(key == "minutes"){
                      minutes = val;
                    }
                    if(key == "priority"){
                      priority = val;
                    }
                    if(key == "duedate"){
                      duedate = val;
                    }
                });
                var htmlCode = '<tr><td>'+name+'</td><td>'+priority+'</td><td>'+minutes+'</td><td>'+duedate+'</td></tr>';
                $('#myTable').append(htmlCode);
                i++;
        }
            
            
            this._model.setSelectedIndex(-1);
            
        }
        
    };

    var Iterator = function(items) {
        this.index = 0;
        this.items = items;
    }
     
    Iterator.prototype = {
        first: function() {
            this.reset();
            return this.next();
        },
        next: function() {
            return this.items[this.index++];
        },
        hasNext: function() {
            return this.index <= this.items.length;
        },
        reset: function() {
            this.index = 0;
        },
        each: function(callback) {
            for (var item = this.first(); this.hasNext(); item = this.next()) {
                callback(item);
            }
        }
    }
     