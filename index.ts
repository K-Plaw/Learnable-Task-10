import * as readline from "readline";

// TodoItem Interface
interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  dueDate: Date; // Combined date and time
}

// TodoList Class
class TodoList {
  private todos: TodoItem[] = [];
  private nextId: number = 1;

  addTodo(task: string, dueDate: Date): void {
    this.todos.push({ id: this.nextId++, task, completed: false, dueDate });
    console.log(`Added: ${task} (Due: ${dueDate.toLocaleString()})`);
  }

  completeTodo(id: number): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = true;
      console.log(`You have Completed: ${todo.task}`);
    } else {
      console.log("Todo not found.");
    }
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
    console.log(`Removed todo with ID ${id}`);
  }

  listTodos(): void {
    if (this.todos.length === 0) {
      console.log("No todos found.");
      return;
    }
    console.log("\nYour Todo List:");
    this.todos.forEach((t) => {
      const dueDateFormatted = t.dueDate.toLocaleString();
      const timeRemaining = this.calculateTimeRemaining(t.dueDate);
      const status = t.completed
        ? "✅ Completed"
        : timeRemaining === "Overdue"
        ? "❌ Overdue"
        : `⏳ Due in ${timeRemaining}`;
      console.log(`[${t.id}] ${t.task} - ${status} (Due: ${dueDateFormatted})`);
    });
  }

  clearCompletedTodos(): void {
    this.todos = this.todos.filter((t) => !t.completed);
    console.log("Cleared all completed todos.");
  }

  private calculateTimeRemaining(dueDate: Date): string {
    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return "Overdue";
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, ${minutes} minutes`;
  }
}

// CLI Interface
const todoList = new TodoList();
const rl = readline.createInterface({
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
  rl.question("Choose an option: ", (choice) => {
    handleMenuOption(choice);
  });
}

function handleMenuOption(choice: string) {
  switch (choice) {
    case "1":
      rl.question("Enter task: ", (task) => {
        rl.question("Enter due date and time (YYYY-MM-DD HH:MM): ", (dateTime) => {
          const [date, time] = dateTime.split(" ");
          const [year, month, day] = date.split("-").map(Number);
          const [hours, minutes] = time.split(":").map(Number);

          const dueDate = new Date(year, month - 1, day, hours, minutes);
          if (isNaN(dueDate.getTime())) {
            console.log("Invalid date or time format. Please use YYYY-MM-DD HH:MM.");
          } else {
            todoList.addTodo(task, dueDate);
          }
          showMenu();
        });
      });
      break;
    case "2":
      rl.question("Enter todo ID to complete: ", (id) => {
        todoList.completeTodo(parseInt(id));
        showMenu();
      });
      break;
    case "3":
      rl.question("Enter todo ID to remove: ", (id) => {
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
