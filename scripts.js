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
        title: "Task 3",
        status: "done"
    },
    {
        title: "Task 4",
        status: "in_progress"
    }

];

var $todoList,
    $addTodoForm,
    $addTodoInput;

function addTodo(todo){
    todos.push(todo);
    refreshTaskList();
}

function getLineElement(todo){
    var $line = document.createElement("li");
    $line.innerHTML = todo.title;
    $line.setAttribute("data-status", todo.status);

    return $line;
}

function refreshTaskList(){
    $todoList.innerHTML = "";
    todos.forEach(function(todo){
        var $todoLine = getLineElement(todo);
        $todoList.appendChild($todoLine);
    })
}

function submitTodo(e){
    e.preventDefault();

    var inputValue = $addTodoInput.value;

    if(inputValue !== ""){
        addTodo({
            title: inputValue,
            status: "in_progress"
        });
        $addTodoForm.reset();
        $addTodoInput.focus();
    }
}


document.addEventListener("DOMContentLoaded", function() {

    $todoList = document.querySelector(".todos");
    $addTodoForm = document.querySelector(".form-add-todo");
    $addTodoInput = $addTodoForm.querySelector("[name='todo-title']");

    $addTodoForm.addEventListener("submit", submitTodo);
    refreshTaskList();
});