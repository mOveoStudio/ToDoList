'use strict';

var todos = [
    {
        id: 0,
        title: "Task 1",
        priority: "normal",
        checked: false
    },
    {
        id: 1,
        title: "Task 2",
        priority: "normal",
        checked: false
    },
    {
        id: 2,
        title: "Task 4",
        priority: "high",
        checked: false
    },
    {
        id: 3,
        title: "Task 3",
        priority: "normal",
        checked: true
    }

];

var $todoList,
    $addTodoForm,
    $addTodoInput,
    $addTodoCheckbox,
    $todoCounter;


// ---------------------------------
// TODO LIST ACTIONS
// ---------------------------------
function addTodo(todo) {
    todo.id = uniqueID();
    todos.unshift(todo);
    refreshTodoList();
}

function removeTodo(todo) {
    var index = todos.findIndex(function(item){ return item.id === todo.id });
    todos.splice(index, 1);
    refreshTodoList();
}

function checkTodo(todo) {
    removeTodo(todo);

    todo.checked = true;
    todos.push(todo);

    refreshTodoList();
}

function unCheckTodo(todo) {
    removeTodo(todo);

    todo.checked = false;
    todos.unshift(todo);

    refreshTodoList();
}

function uniqueID(){
    var id = todos.length;
    while(todos.some(function(todo){return todo.id === id})){
        id++;
    }
    return id;
}

// ---------------------------------
// REGENERATE HTML TODO LIST
// ---------------------------------
function refreshTodoList() {
    $todoList.innerHTML = "";
    todos.forEach(function (todo, index) {
        var $todoLine = getLineElement(todo, index);
        $todoList.appendChild($todoLine);
    });

    refreshCounter(filterTodos(todos).length);
}

function filterTodos(todos) {
    return todos.filter(function (todo) {
        return todo.checked === false;
    })
}

function refreshCounter(total) {
    $todoCounter.innerHTML = total;
}


// ---------------------------------
// ACTION BUTTONS FOR TODO LINES
// ---------------------------------
function getActionButton(icon) {
    var $checkButton = document.createElement("button");
    var $checkButtonIcon = document.createElement("i");
    $checkButton.classList.add("fas", icon);

    $checkButton.appendChild($checkButtonIcon);
    return $checkButton
}

function getRemoveButton(todo) {
    var $removeButton = getActionButton("fa-trash-alt");

    $removeButton.addEventListener("click", function (e) {
        e.stopPropagation();
        removeTodo(todo)
    });

    return $removeButton;
}

function getCheckButton(todo) {
    var $checkButton = getActionButton("fa-check");

    $checkButton.addEventListener("click", function (e) {
        e.stopPropagation();
        checkTodo(todo)
    });

    return $checkButton;
}

function getUnCheckButton(todo) {
    var $unCheckedButton = getActionButton("fa-redo-alt");

    $unCheckedButton.addEventListener("click", function (e) {
        e.stopPropagation();
        unCheckTodo(todo)
    });

    return $unCheckedButton;
}

function addActionsButton($line, todo) {
    var $todoActions = $line.querySelector(".todo-actions");

    if (todo.checked) {
        $todoActions.appendChild(getRemoveButton(todo));
        $todoActions.appendChild(getUnCheckButton(todo));
    }else{
        $todoActions.appendChild(getRemoveButton(todo));
        $todoActions.appendChild(getCheckButton(todo));
    }
}


// ---------------------------------
// PRIORITIES FOR TODO LINES
// ---------------------------------
function addPriorityIcon($line, todo){
    if(todo.priority === "high"){
        var $highPriorityIcon = document.createElement("i");
        $highPriorityIcon.classList.add("fas", "fa-exclamation-circle");
        $line.appendChild($highPriorityIcon);
    }
}


// ---------------------------------
// TODO LINES
// ---------------------------------
function addLineEvents($line) {
    $line.addEventListener("click", function () {
        $line.classList.toggle("selected");
    });
}

function getLineElement(todo) {
    var temp = document.createElement("div");

    temp.innerHTML =
        "<li data-id='" + todo.id + "' data-checked='" + todo.checked + "' data-priority='" + todo.priority + "'>" +
        "<div class='todo-actions'>" +
        "</div>" +
        "<span>" + todo.title + "</span>" +
        "</li>";

    var $line = temp.firstChild;

    addActionsButton($line, todo);
    addPriorityIcon($line, todo);
    addLineEvents($line);
    return $line;
}


// ---------------------------------
// ADD TODO FORM SUBMISSION
// ---------------------------------
function submitTodo(e) {
    e.preventDefault();

    var inputValue = $addTodoInput.value;

    if (inputValue !== "") {
        addTodo({
            title: inputValue,
            checked: false,
            priority: ($addTodoCheckbox.checked) ? "high" : "normal"
        });
        $addTodoForm.reset();
        $addTodoInput.focus();
    }
}


document.addEventListener("DOMContentLoaded", function () {

    $todoList = document.querySelector(".todos");
    $addTodoForm = document.querySelector(".form-add-todo");
    $addTodoInput = $addTodoForm.querySelector("[name='todo-title']");
    $addTodoCheckbox = document.querySelector("[name='todo-important']");

    $todoCounter = document.querySelector(".todo-counter");

    $addTodoForm.addEventListener("submit", submitTodo);
    $addTodoCheckbox.addEventListener("click", function(){$addTodoInput.focus();});

    $addTodoInput.focus();
    refreshTodoList();
});