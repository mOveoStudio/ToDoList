var todos = [
    {
        title: "Task 1",
        status: "in_progress"
    },
    {
        title: "Task 2",
        status: "in_progress"
    },
    {
        title: "Task 4",
        status: "in_progress"
    },
    {
        title: "Task 3",
        status: "done"
    }

];

var $todoList,
    $addTodoForm,
    $addTodoInput,
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
    todos.push({
        title: todo.title,
        status: "done"
    });
    refreshTodoList();
}

function unCheckTodo(index) {
    var todo = todos[index];
    removeTodo(index);
    todos.unshift({
        title: todo.title,
        status: "in_progress"
    });

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
        return todo.status === "in_progress";
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

    if (todo.status === "done") {
        $todoActions.appendChild(getRemoveButton(index));
        $todoActions.appendChild(getUnCheckButton(index));
    }

    if (todo.status === "in_progress") {
        $todoActions.appendChild(getRemoveButton(index));
        $todoActions.appendChild(getCheckButton(index));
    }
}

// ---------------------------------
// ACTION FOR TODO LINES
// ---------------------------------
function addLineEvents($line) {
    $line.addEventListener("click", function () {
        $line.classList.toggle("selected");
    });
}

function getLineElement(todo, index) {
    var temp = document.createElement("div");

    temp.innerHTML =
        "<li data-id='" + index + "' data-status='" + todo.status + "'>" +
        "<div class='todo-actions'>" +
        "</div>" +
        "<span>" + todo.title + "</span>" +
        "</li>";

    $line = temp.firstChild;
    addActionsButton($line, todo, index);
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
            status: "in_progress"
        });
        $addTodoForm.reset();
        $addTodoInput.focus();
    }
}


document.addEventListener("DOMContentLoaded", function () {

    $todoList = document.querySelector(".todos");
    $addTodoForm = document.querySelector(".form-add-todo");
    $addTodoInput = $addTodoForm.querySelector("[name='todo-title']");

    $todoCounter = document.querySelector(".todo-counter");

    $addTodoForm.addEventListener("submit", submitTodo);
    refreshTodoList();
});