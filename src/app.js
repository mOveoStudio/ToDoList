'use strict';
// CSS
import './css/styles.scss';

// LIBS
import {square} from  './js/lib';
console.log("THE SQUARE OF 10 IS", square(10));

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


function setTodos(newTodos){
    todos = newTodos;
    refreshTodoList(todos);
    refreshCounter(filterTodos(todos).length);
}

function arraysDiff(lastArray, newArray){
    // ADDED
    var added = newArray.filter(function(item){
        return -1 === lastArray.findIndex(function(e){
                return e.id === item.id;
            })
    });
    console.log("ADDED", added);

    // REMOVED
    var removed = lastArray.filter(function(item){
        return -1 === newArray.findIndex(function(e){
                return e.id === item.id;
            })
    });
    console.log("REMOVED", removed);

    // REMAINED
    var remained = lastArray.filter(function(item){
        return -1 !== newArray.findIndex(function(e){
                return e.id === item.id;
            })
    });
    console.log("REMAINED", remained);
}


// ---------------------------------
// TODO LIST ACTIONS
// ---------------------------------
function addTodo(todo) {
    todo.id = uniqueID();

    var newTodos = todos.slice(0);
    newTodos.unshift(todo);

    setTodos(newTodos);
}

function removeTodo(todo) {
    setTodos(
        todos.filter(function(item){ return item.id !== todo.id})
    );
}

function checkTodo(todo) {
    setTodos(
        todos.map(function(item){
            console.log(item.id === todo.id);
            if(item.id === todo.id){
                item.checked = true;
            }

            return item;
        })
    )
}

function unCheckTodo(todo) {
    setTodos(
        todos.map(function(item){
            if(item.id === todo.id){
                item.checked = false;
            }

            return item;
        })
    )
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
function refreshTodoList(todos) {
    $todoList.innerHTML = "";
    todos.forEach(function (todo, index) {
        var $todoLine = getLineElement(todo, index);
        $todoList.appendChild($todoLine);
    });
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
    setTodos(todos);

});