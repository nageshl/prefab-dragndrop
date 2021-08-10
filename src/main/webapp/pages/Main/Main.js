/*
 * Use App.getDependency for Dependency Injection
 * eg: var DialogService = App.getDependency('DialogService');
 */

/*
 * This function will be invoked when any of this prefab's property is changed
 * @key: property name
 * @newVal: new value of the property
 * @oldVal: old value of the property
 */
Prefab.onPropertyChange = function(key, newVal, oldVal) {
    /*switch (key) {
        case "draggablewidgetnames":
            Prefab.draggablewidgetnames.forEach(Prefab.setDroppable);
            break;
        case "droppablewidgenames":
            Prefab.droppablewidgenames.forEach(Prefab.setDroppable);
            break;
    }*/
};

Prefab.onReady = function() {
    // this method will be triggered post initialization of the prefab.
    setTimeout(function() {
        Prefab.draggablewidgetnames.forEach(Prefab.setDraggable);
        Prefab.droppablewidgenames.forEach(Prefab.setDroppable);
        Prefab.dragndropmapping = {};
    }, 100);
};

Prefab.setDroppable = function(name) {
    var node = document.getElementsByName(name);
    for (var i = 0; i < node.length; i++) {
        node[i].setAttribute('id', name + "-" + i);
        node[i].setAttribute('ondrop', 'drop(event)');
        node[i].setAttribute('ondragover', 'allowDrop(event)');
    }
};

Prefab.setDraggable = function(name) {
    var node = document.getElementsByName(name);
    for (var i = 0; i < node.length; i++) {
        node[i].setAttribute('id', name + "-" + i);
        node[i].setAttribute('draggable', true);
        node[i].setAttribute('ondragstart', 'drag(event)');
    }
};

allowDrop = function(ev) {
    ev.preventDefault();
};

drag = function(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
};

drop = function(ev) {
    ev.preventDefault();
    var id = ev.dataTransfer.getData("id");
    if (!ev.target.hasChildNodes()) {
        Prefab.dragndropmapping[id] = ev.target.widget.name;
        ev.target.appendChild(document.getElementById(id));
    }
};