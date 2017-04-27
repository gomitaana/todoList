# TodoList MVC Javascript

It is an application of a task list manager, that have integrated a small timer application.This application used the MVC architectural pattern.

## Getting Started

Download the proyect and open in any browser index.html, the application is a standalone app so it doen´t need internet to work.

## Patterns Used.

For this application I use:

Iterator:
When the list is displayed it is loaded for a local file named items.json and read by a a iterator class as show below.

```
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
```

Everytime a user add a task the application used the factory pattern, I divide the task by the priority and each one is loaded by the function that is in charge of that type.

```
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
```

For the GUI I used two patterns the Observer to listen everytime a model change and a command pattern to interact with the timer and the buttons.