
const dashboard = document.querySelector("#dashboard");
const featureView = document.querySelector("#featureView");
const todoFeature = document.querySelector("#todoFeature");
const  todoCard = document.querySelector('[data-feature="todo"]');

const backBtn = document.querySelector(".back-btn");

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

const taskArr =[];

//todo operations
function todoOperations(){

 let todoDashboard = function(){
    todoCard.addEventListener("click",()=>{

    dashboard.classList.add("hidden");
    featureView.classList.add("open");
    todoFeature.classList.add("active");
  });


 backBtn.addEventListener("click",()=>{
    dashboard.classList.remove("hidden");
    featureView.classList.remove("open");
    todoFeature.classList.remove("active");
 })

 }

 todoDashboard();

 const ui = () => {

    taskList.innerHTML = "";

    taskArr.forEach((task, index) => {

        taskList.innerHTML += `
            <div class="task-item ${task.completed ? "completed" : ""}" data-index="${index}">
                <span class="task-text">${task.text}</span>

                <div class="task-actions">
                    <button class="complete-btn ${task.completed ? "completed-btn" : ""}">
                        <i class="ri-check-line"></i>
                    </button>

                    <button class="edit-btn">
                        <i class="ri-pencil-ai-line"></i>
                    </button>

                    <button class="delete-btn">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </div>
        `;
    });

    function buttons() {

        const deleteBtns = document.querySelectorAll(".delete-btn");

        deleteBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

                const index =
                    btn.parentElement.parentElement.dataset.index;

                taskArr.splice(index, 1);

                ui();
            });

        });


        const editBtns = document.querySelectorAll(".edit-btn");

        editBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

                const index =
                    btn.parentElement.parentElement.dataset.index;

                const newTask =
                    prompt("Edit your task:", taskArr[index].text);

                if (newTask !== null && newTask.trim() !== "") {

                    taskArr[index].text = newTask.trim();

                    ui();
                }

            });

        });

        const completeBtns = document.querySelectorAll(".complete-btn");

        completeBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

             const index =
             btn.parentElement.parentElement.dataset.index;

             taskArr[index].completed = true;
         
 
             ui();

            });

        });

        

    }

    
    buttons();

 };

 addBtn.addEventListener("click",(event)=>{

        event.preventDefault();

        const task = taskInput.value;

        if(task.trim() !== ""){

            taskArr.push({
                text: task,
                completed: false
            });

            taskInput.value = "";

            ui();
        }

 })




}

todoOperations();







