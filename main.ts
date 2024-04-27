#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string [] = [];
let condition = true;

// Print a welcome message
console.log(chalk.bold.rgb(204, 204, 204)(`\n\t\t   <<<=============================================================================>>> `));
console.log(chalk.bold.rgb(204, 204, 204)(`  <<<==========================>>> ${chalk.bold.hex('#9999FF')('Welcome To \'Code With Ali\' - To-Do List Application ')}<<<==========================>>> `));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t   <<<=============================================================================>>> \n`));

// Choice list & conditions
let main = async () => {
    while(condition){
        let option = await inquirer.prompt(
            [
                {
                    name: "choice",
                    type: "list",
                    message: chalk.bold.hex('#EDDE74')("Select an option:"),
                    choices: ["Add Task", "Update Task", "Delete Task", "View To-Do List", chalk.hex('#f94449')("Exit")],
                }
            ]
        );
        if(option.choice === "Add Task"){
            await addTask()
        }
        else if(option.choice === "Update Task"){
            await updateTask()
        }
        else if (option.choice === "Delete Task"){
            await deleteTask()
        }
        else if(option.choice === "View To-Do List"){
            viewTask()
        }
        else if(option.choice === chalk.hex('#f94449')("Exit")){
            await exitTask()
        }
    }
}

// Funtion to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt(
        [
            {
                name: "task",
                type: "input",
                message: chalk.hex('#9999FF')("Enter your new task :"),
            }
        ]
    );
    todoList.push(newTask.task);
    console.log((chalk.rgb(204, 204, 204))(`\n \"${newTask.task}\" ${chalk.hex('77DD77')('has been added successfully on your Todo-List!')}`)); 
    console.log((chalk.hex('#75c1fb')(` [To check your To-Do List please select option \'View Todo-List\'] \n`)));   
}

// Function to view complete Todo-List 
let viewTask = () => {
    console.log(chalk.bold.italic.hex('#f2b04c')("\n To-Do List:\n"));
    todoList.forEach((task, index) => {
        console.log(` ${index + 1}: ${task}`);
    });
    console.log("\n");
}

// Funtion to delete a task from Todo-List
let deleteTask = async () => {
    viewTask()
    let taskIndex = await inquirer.prompt(
        {
            name: "index",
            type: "number",
            message: chalk.hex('#9999FF')("Enter the 'index no.' of the task you want to delete :"),
        }
    );
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log((chalk.rgb(204, 204, 204))(`\n \"${deletedTask}\" ${chalk.hex('#77DD77')('has been deleted successfully from your To-Do List!')}`));
    console.log((chalk.hex('#75c1fb')(` [To check your To-Do List please select option \'View To-Do List\'] \n`)));
}

// Function to update a task
let updateTask = async () => {
    viewTask()
    let updateTaskIndex = await inquirer.prompt(
        [
            {
                name: "index",
                type: "number",
                message: chalk.hex('#9999FF')("Enter the 'index no.' of the task you want to update :"),
            },
            {
                name: "newTaskName",
                type: "input",
                message: chalk.hex('#9999FF')("Enter your new task :"),
            }
        ]
    );
    todoList[updateTaskIndex.index - 1] = updateTaskIndex.newTaskName
    console.log((chalk.rgb(204, 204, 204))(`${chalk.hex('#77DD77')('\n Task at index no.')} \'${updateTaskIndex.index}\' ${chalk.hex('#77DD77')('has been updated to')} \"${updateTaskIndex.newTaskName}\" ${chalk.hex('#77DD77')('successfully!')}`));
    console.log((chalk.hex('#75c1fb')(` [To check your updated To-Do List please select option \'View To-Do List\'] \n`)));
}

// Funtion to exit the application
let exitTask = async () => {
    let exitchoice = await inquirer.prompt( 
        [
            {
                name: "choice",
                type: "list",
                message: chalk.hex('f59b7c')("Are you sure you want to exit?"),
                choices: ["Yes", "No"],
            }
        ]
    );
    if(exitchoice.choice === "Yes"){
        condition = false;
    }
    else if(exitchoice.choice === "No"){
        condition = true;
        console.log("\n");
    };
}

main();
