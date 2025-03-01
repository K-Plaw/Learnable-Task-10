"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// TodoList Class
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
        this.nextId = 1;
    }
    TodoList.prototype.addTodo = function (task, dueDate) {
        this.todos.push({ id: this.nextId++, task: task, completed: false, dueDate: dueDate });
        console.log("Added: ".concat(task, " (Due: ").concat(dueDate.toLocaleString(), ")"));
    };
    TodoList.prototype.completeTodo = function (id) {
        var todo = this.todos.find(function (t) { return t.id === id; });
        if (todo) {
            todo.completed = true;
            console.log("You have Completed: ".concat(todo.task));
        }
        else {
            console.log("Todo not found.");
        }
    };
    TodoList.prototype.removeTodo = function (id) {
        this.todos = this.todos.filter(function (t) { return t.id !== id; });
        console.log("Removed todo with ID ".concat(id));
    };
    TodoList.prototype.listTodos = function () {
        var _this = this;
        if (this.todos.length === 0) {
            console.log("No todos found.");
            return;
        }
        console.log("\nYour Todo List:");
        this.todos.forEach(function (t) {
            var dueDateFormatted = t.dueDate.toLocaleString();
            var timeRemaining = _this.calculateTimeRemaining(t.dueDate);
            var status = t.completed
                ? "✅ Completed"
                : timeRemaining === "Overdue"
                    ? "❌ Overdue"
                    : "\u23F3 Due in ".concat(timeRemaining);
            console.log("[".concat(t.id, "] ").concat(t.task, " - ").concat(status, " (Due: ").concat(dueDateFormatted, ")"));
        });
    };
    TodoList.prototype.clearCompletedTodos = function () {
        this.todos = this.todos.filter(function (t) { return !t.completed; });
        console.log("Cleared all completed todos.");
    };
    TodoList.prototype.calculateTimeRemaining = function (dueDate) {
        var now = new Date();
        var timeDiff = dueDate.getTime() - now.getTime();
        if (timeDiff <= 0) {
            return "Overdue";
        }
        var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        return "".concat(days, " days, ").concat(hours, " hours, ").concat(minutes, " minutes");
    };
    return TodoList;
}());
// CLI Interface
var todoList = new TodoList();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function showMenu() {
    console.log("\n--- PLAW's MASTER SCHEDULE APP ---");
    console.log("\n--- Todo List ---");
    console.log("1. Add Task to To-do List");
    console.log("2. Complete Task in To-do List");
    console.log("3. Remove Task From To-do List");
    console.log("4. Show All Tasks In To-do List");
    console.log("5. Clear Completed To-do List Tasks");
    console.log("6. Exit");
    rl.question("Choose an option: ", function (choice) {
        handleMenuOption(choice);
    });
}
function handleMenuOption(choice) {
    switch (choice) {
        case "1":
            rl.question("Enter task: ", function (task) {
                rl.question("Enter due date and time (YYYY-MM-DD HH:MM): ", function (dateTime) {
                    var _a = dateTime.split(" "), date = _a[0], time = _a[1];
                    var _b = date.split("-").map(Number), year = _b[0], month = _b[1], day = _b[2];
                    var _c = time.split(":").map(Number), hours = _c[0], minutes = _c[1];
                    var dueDate = new Date(year, month - 1, day, hours, minutes);
                    if (isNaN(dueDate.getTime())) {
                        console.log("Invalid date or time format. Please use YYYY-MM-DD HH:MM.");
                    }
                    else {
                        todoList.addTodo(task, dueDate);
                    }
                    showMenu();
                });
            });
            break;
        case "2":
            rl.question("Enter Task ID to complete: ", function (id) {
                todoList.completeTodo(parseInt(id));
                showMenu();
            });
            break;
        case "3":
            rl.question("Enter Task ID to remove: ", function (id) {
                todoList.removeTodo(parseInt(id));
                showMenu();
            });
            break;
        case "4":
            todoList.listTodos();
            showMenu();
            break;
        case "5":
            todoList.clearCompletedTodos();
            showMenu();
            break;
        case "6":
            console.log("Thank You For Using Our Todo List! See You Later!");
            console.log("Plan your future and stay organized and productive with PLAW's Master Schedule");
            console.log("Check out our other apps and services at https://plaws.com");
            rl.close();
            break;
        default:
            console.log("Invalid option. Try again.");
            showMenu();
    }
}
// Start CLI
showMenu();
