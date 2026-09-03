
const dashboard = document.querySelector("#dashboard");
const featureView = document.querySelector("#featureView");
const todoFeature = document.querySelector("#todoFeature");
const  todoCard = document.querySelector('[data-feature="todo"]');

const backBtn = document.querySelector(".back-btn");

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

const taskArr =[];



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

const ui = ()=>{

    taskList.innerHTML = "";

    taskArr.forEach((task) => {
    taskList.innerHTML += `
        <div class="task-item">
            <span class="task-text">${task}</span>

            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `;
    });
    
}

addBtn.addEventListener("click",(event)=>{

    event.preventDefault();
    const task = taskInput.value;
    taskArr.push(task);

    taskInput.value = "";
    ui();
})

