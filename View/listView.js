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

            for(var i = 0; i< data.length; i++){
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
                $('#myTable').append('<tr><td>'+name+'</td><td>Priority</td><td></td></tr>');
            }
            
            this._model.setSelectedIndex(-1);
            
        }
        
    };