
const dashboard = document.querySelector("#dashboard");
const featureView = document.querySelector("#featureView");
const todoFeature = document.querySelector("#todoFeature");
const  todoCard = document.querySelector('[data-feature="todo"]');

const backBtn = document.querySelector(".back-btn");

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

const plannerFeature = document.querySelector("#plannerFeature");
const plannerCard = document.querySelector('[data-feature="planner"]');
const backBtnPlanner = document.querySelector("#plannerFeature .back-btn");

const scheduleList = document.querySelector("#scheduleList");

const weatherLocation = document.querySelector("#weatherLocation");
const weatherIcon = document.querySelector("#weatherIcon");
const temperature = document.querySelector("#temperature");
const weatherCondition = document.querySelector("#weatherCondition");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const precipitation = document.querySelector("#precipitation");

const weatherFeature = document.querySelector("#weatherFeature");
const weatherCard = document.querySelector(".weather-dashboard-card");

const quoteText = document.querySelector("#quoteText");
const quoteAuthor = document.querySelector("#quoteAuthor");

const dashboardQuoteText =
    document.querySelector("#dashboardQuoteText");

const dashboardQuoteAuthor =
    document.querySelector("#dashboardQuoteAuthor");

const newQuote = document.querySelector("#newQuote");

const quoteLoading =
    document.querySelector("#quoteLoading");

const quoteError =
    document.querySelector("#quoteError");

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

  const updateOverview =()=>{
   
    const total = taskArr.length + " tasks";
    const completed = taskArr.filter(task => task.completed).length;
    const important = taskArr.filter(task => task.important).length;

    document.querySelector("#overviewTotal").textContent = total;
    document.querySelector("#overviewCompleted").textContent = completed;
    document.querySelector("#overviewImportant").textContent = important;
    document.querySelector("#todoTotal").textContent = total;
 }

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

                    <button class="schedule-btn">
                      <i class="ri-time-line"></i>
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


        const scheduleBtns = document.querySelectorAll(".schedule-btn");

        scheduleBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

             const index =
             btn.parentElement.parentElement.dataset.index;

             const time = prompt("Enter time (e.g. 14:30):");

               if (time !== null && time.trim() !== "") {

                 taskArr[index].time = time;

                  console.log(taskArr);

                  renderPlanner();
                }

            });

        }); 

        

    }
    
    buttons();
    updateOverview();
    renderPlanner();

 };



 addBtn.addEventListener("click",(event)=>{

        event.preventDefault();

        const task = taskInput.value;

        if(task.trim() !== ""){

            taskArr.push({
                text: task,
                completed: false,
                important: false,
                time: null
            });

            taskInput.value = "";

            ui();
        }

 })




}

todoOperations();

//Daily planner operations

function dailyPlannerOperations(){

    plannerCard.addEventListener("click",()=>{
        dashboard.classList.add("hidden");
        featureView.classList.add("open");
        plannerFeature.classList.add("active");

        renderPlanner();
        showPlannerDate();
    })

    backBtnPlanner.addEventListener("click",()=>{
        dashboard.classList.remove("hidden");
        featureView.classList.remove("open");
        plannerFeature.classList.remove("active");
    })

}

dailyPlannerOperations();

function renderPlanner(){
        scheduleList.innerHTML = "";

        taskArr
        .filter(task => task.time !== null)
        .sort((a,b) => a.time.localeCompare(b.time))
        .forEach((task,index)=>{
            scheduleList.innerHTML += `
             <div class="time-slot ${task.completed ? "completed" : ""}">
                    <span class="slot-time">${task.time}</span>

                    <div class="slot-line"></div>

                    <span class="plan-task">${task.text}</span>
              </div>
            `;
        });


}

function showPlannerDate() {

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    document.querySelector("#plannerDate").textContent =
        today.toLocaleDateString("en-IN", options);
}


//Weather operations
function weatherOperations() {
    const getLocation = () =>{
         navigator.geolocation.getCurrentPosition((position)=>{
             const latitude = position.coords.latitude;
             const longitude = position.coords.longitude;
    
    
             getWeather(latitude, longitude);
    
             getLocationName(latitude, longitude);
         },
    
         (error) =>{
            console.log("location error:", error);
         }
    
      );
    };
    
    const getLocationName = async (latitude, longitude) => {
    
        const url =
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    
        const response = await fetch(url);
    
        const data = await response.json();
    
    
        const address = data.address;
    
        const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality;
    
        const state = address.state;
    
        weatherLocation.textContent = `${city}, ${state}`;
    };
    
    
    const getWeather = async (latitude, longitude) => {
    
        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=auto`;
    
        const response = await fetch(url);
    
        const data = await response.json();
    
       
    
       
        const current = data.current;
    
        temperature.textContent =
        `${Math.round(current.temperature_2m)}°`;
    
        humidity.textContent =
        `${current.relative_humidity_2m}%`;
    
        wind.textContent =
        `${current.wind_speed_10m} km/h`;
    
        precipitation.textContent =
        `${current.precipitation} mm`;
    
    };
    
    getLocation();
    
    weatherCard.addEventListener("click",()=>{
        return dashboard;
    })
};

weatherOperations();

//Motivation page

const motivationFeature = document.querySelector("#quoteFeature");
const motivationCard = document.querySelector('[data-feature="quote"]')
const motivationBckBtn = document.querySelector( "#quoteFeature .back-btn")

motivationCard.addEventListener("click",()=>{
    dashboard.classList.add("hidden");
    featureView.classList.add("open");
    motivationFeature.classList.add("active");
});

motivationBckBtn.addEventListener("click",()=>{
    dashboard.classList.remove("hidden");
    featureView.classList.remove("open");
    motivationFeature.classList.remove("active");
});

const getQuote = async () => {

    try {

        quoteLoading.classList.remove("hidden");
        quoteError.classList.add("hidden");

        const response =
            await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await response.json();


        // Full quote screen
        quoteText.textContent = data.quote;
        quoteAuthor.textContent = `— ${data.author}`;

        // Dashboard preview
        dashboardQuoteText.textContent =
            `“${data.quote}”`;

        dashboardQuoteAuthor.textContent =
            `— ${data.author}`;

    } catch (error) {

        console.log("Quote error:", error);

        quoteError.classList.remove("hidden");

    } finally {

        quoteLoading.classList.add("hidden");

    }
};


newQuote.addEventListener("click", () => {
    getQuote();
});

getQuote();