var todos = [
    {
        title: "Task 1",
        priority: "normal",
        checked: false
    },
    {
        title: "Task 2",
        priority: "normal",
        checked: false
    },
    {
        title: "Task 4",
        priority: "high",
        checked: false
    },
    {
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
    todos.unshift(todo);
    refreshTodoList();
}

function removeTodo(index) {
    todos.splice(index, 1);
    refreshTodoList();
}

function checkTodo(index) {
    var todo = todos[index];
    removeTodo(index);

    todo.checked = true;
    todos.push(todo);
    refreshTodoList();
}

function unCheckTodo(index) {
    var todo = todos[index];
    removeTodo(index);

    todo.checked = false;
    todos.unshift(todo);

    refreshTodoList();
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

function getRemoveButton(index) {
    var $removeButton = getActionButton("fa-trash-alt");

    $removeButton.addEventListener("click", function (e) {
        e.stopPropagation();
        removeTodo(index)
    });

    return $removeButton;
}

function getCheckButton(index) {
    var $checkButton = getActionButton("fa-check");

    $checkButton.addEventListener("click", function (e) {
        e.stopPropagation();
        checkTodo(index)
    });

    return $checkButton;
}

function getUnCheckButton(index) {
    var $unCheckedButton = getActionButton("fa-redo-alt");

    $unCheckedButton.addEventListener("click", function (e) {
        e.stopPropagation();
        unCheckTodo(index)
    });

    return $unCheckedButton;
}

function addActionsButton($line, todo, index) {
    var $todoActions = $line.querySelector(".todo-actions");

    if (todo.checked) {
        $todoActions.appendChild(getRemoveButton(index));
        $todoActions.appendChild(getUnCheckButton(index));
    }else{
        $todoActions.appendChild(getRemoveButton(index));
        $todoActions.appendChild(getCheckButton(index));
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

function getLineElement(todo, index) {
    var temp = document.createElement("div");

    temp.innerHTML =
        "<li data-id='" + index + "' data-checked='" + todo.checked + "' data-priority='" + todo.priority + "'>" +
        "<div class='todo-actions'>" +
        "</div>" +
        "<span>" + todo.title + "</span>" +
        "</li>";

    $line = temp.firstChild;

    addActionsButton($line, todo, index);
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