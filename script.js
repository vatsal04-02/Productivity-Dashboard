/* =========================================================
   COMMON ELEMENTS
========================================================= */

const dashboard = document.querySelector("#dashboard");
const featureView = document.querySelector("#featureView");


/* =========================================================
   TODO
========================================================= */

const todoFeature = document.querySelector("#todoFeature");
const todoCard = document.querySelector('[data-feature="todo"]');
const backBtn = document.querySelector("#todoFeature .back-btn");

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");


/* =========================================================
   PLANNER
========================================================= */

const plannerFeature = document.querySelector("#plannerFeature");
const plannerCard = document.querySelector('[data-feature="planner"]');
const backBtnPlanner =
    document.querySelector("#plannerFeature .back-btn");

const scheduleList = document.querySelector("#scheduleList");


/* =========================================================
   WEATHER
========================================================= */

const weatherLocation =
    document.querySelector("#weatherLocation");

const weatherIcon =
    document.querySelector("#weatherIcon");

const temperature =
    document.querySelector("#temperature");

const weatherCondition =
    document.querySelector("#weatherCondition");

const humidity =
    document.querySelector("#humidity");

const wind =
    document.querySelector("#wind");

const precipitation =
    document.querySelector("#precipitation");

const weatherFeature =
    document.querySelector("#weatherFeature");

const weatherCard =
    document.querySelector(".weather-dashboard-card");


/* Full weather screen */

const weatherFullLocation =
    document.querySelector("#weatherFullLocation");

const weatherFullIcon =
    document.querySelector("#weatherFullIcon");

const weatherFullTemperature =
    document.querySelector("#weatherFullTemperature");

const weatherFullCondition =
    document.querySelector("#weatherFullCondition");

const weatherFullHumidity =
    document.querySelector("#weatherFullHumidity");

const weatherFullWind =
    document.querySelector("#weatherFullWind");

const weatherFullPrecipitation =
    document.querySelector("#weatherFullPrecipitation");

const weatherBackBtn =
    document.querySelector("#weatherFeature .back-btn");


/* =========================================================
   MOTIVATION / QUOTES
========================================================= */

const motivationFeature =
    document.querySelector("#quoteFeature");

const motivationCard =
    document.querySelector('[data-feature="quote"]');

const motivationBckBtn =
    document.querySelector("#quoteFeature .back-btn");

const quoteText =
    document.querySelector("#quoteText");

const quoteAuthor =
    document.querySelector("#quoteAuthor");

const dashboardQuoteText =
    document.querySelector("#dashboardQuoteText");

const dashboardQuoteAuthor =
    document.querySelector("#dashboardQuoteAuthor");

const newQuote =
    document.querySelector("#newQuote");

const quoteLoading =
    document.querySelector("#quoteLoading");

const quoteError =
    document.querySelector("#quoteError");


/* =========================================================
   POMODORO
========================================================= */

const pomodoroCard =
    document.querySelector('[data-feature="pomodoro"]');

const pomodoroFeature =
    document.querySelector("#pomodoroFeature");

const pomodoroBckBtn =
    document.querySelector("#pomodoroFeature .back-btn");

const timerDisplay =
    document.querySelector("#timerDisplay");

const startTimer =
    document.querySelector("#startTimer");

const pauseTimer =
    document.querySelector("#pauseTimer");

const resetTimer =
    document.querySelector("#resetTimer");

const sessionLabel =
    document.querySelector("#sessionLabel");

const timerProgress =
    document.querySelector("#timerProgress");


/* =========================================================
   GOALS
========================================================= */

const goalsFeature =
    document.querySelector("#goalsFeature");

const goalsCard =
    document.querySelector('[data-feature="goals"]');

const goalsBckBtn =
    document.querySelector("#goalsFeature .back-btn");

const goalInput =
    document.querySelector("#goalInput");

const addGoal =
    document.querySelector("#addGoal");

const goalList =
    document.querySelector("#goalList");

const goalsProgressText =
    document.querySelector("#goalsProgressText");

const goalsPercentage =
    document.querySelector("#goalsPercentage");

const goalsBar =
    document.querySelector("#goalsBar");


/* =========================================================
   THEME
========================================================= */

const themeToggle =
    document.querySelector("#themeToggle");


/* =========================================================
   ARRAYS + LOCAL STORAGE
========================================================= */

const taskArr = [];
const goalArr = [];


/* -------------------------
   LOAD TASKS
------------------------- */

const savedTasks =
    localStorage.getItem("tasks");

if(savedTasks){

    try{

        const parsedTasks =
            JSON.parse(savedTasks);

        if(Array.isArray(parsedTasks)){

            parsedTasks.forEach((task) => {

                /*
                   Handles both:

                   old:
                   "Buy milk"

                   new:
                   {
                       text: "Buy milk",
                       completed: false
                   }
                */

                if(typeof task === "string"){

                    taskArr.push({
                        text: task,
                        completed: false,
                        important: false,
                        time: null
                    });

                }
                else if(task && typeof task === "object"){

                    taskArr.push({

                        text: task.text || "",

                        completed:
                            task.completed === true,

                        important:
                            task.important === true,

                        time:
                            task.time || null

                    });

                }

            });

        }

    }
    catch(error){

        console.log(
            "Could not load tasks:",
            error
        );

    }

}


/* -------------------------
   LOAD GOALS
------------------------- */

const savedGoals =
    localStorage.getItem("goals");

if(savedGoals){

    try{

        const parsedGoals =
            JSON.parse(savedGoals);

        if(Array.isArray(parsedGoals)){

            parsedGoals.forEach((goal) => {

                if(typeof goal === "string"){

                    goalArr.push({

                        text: goal,
                        completed: false

                    });

                }
                else if(goal && typeof goal === "object"){

                    goalArr.push({

                        text: goal.text || "",

                        completed:
                            goal.completed === true

                    });

                }

            });

        }

    }
    catch(error){

        console.log(
            "Could not load goals:",
            error
        );

    }

}


/* =========================================================
   THEME
========================================================= */

const savedTheme =
    localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark");

}


if(themeToggle){

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem(
                "theme",
                "dark"
            );

        }
        else{

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    });

}


/* =========================================================
   TODO OPERATIONS
========================================================= */

function todoOperations(){

    /* -------------------------
       OPEN TODO
    ------------------------- */

    if(todoCard){

        todoCard.addEventListener("click", () => {

            dashboard.classList.add("hidden");

            featureView.classList.add("open");

            todoFeature.classList.add("active");

        });

    }


    /* -------------------------
       BACK FROM TODO
    ------------------------- */

    if(backBtn){

        backBtn.addEventListener("click", () => {

            dashboard.classList.remove("hidden");

            featureView.classList.remove("open");

            todoFeature.classList.remove("active");

        });

    }


    /* -------------------------
       TODO OVERVIEW
    ------------------------- */

    const updateOverview = () => {

        const total =
            taskArr.length;

        const completed =
            taskArr.filter(
                task => task.completed
            ).length;

        const important =
            taskArr.filter(
                task => task.important
            ).length;


        const overviewTotal =
            document.querySelector("#overviewTotal");

        const overviewCompleted =
            document.querySelector("#overviewCompleted");

        const overviewImportant =
            document.querySelector("#overviewImportant");

        const todoTotal =
            document.querySelector("#todoTotal");


        if(overviewTotal){

            overviewTotal.textContent =
                total;

        }

        if(overviewCompleted){

            overviewCompleted.textContent =
                completed;

        }

        if(overviewImportant){

            overviewImportant.textContent =
                important;

        }

        if(todoTotal){

            todoTotal.textContent =
                total;

        }

    };


    /* -------------------------
       TODO UI
    ------------------------- */

    const ui = () => {

        if(!taskList){

            return;

        }


        taskList.innerHTML = "";


        taskArr.forEach((task, index) => {

            taskList.innerHTML += `

                <div
                    class="task-item ${task.completed ? "completed" : ""}"
                    data-index="${index}"
                >

                    <span class="task-text">
                        ${task.text}
                    </span>


                    <div class="task-actions">

                        <button
                            class="complete-btn ${task.completed ? "completed-btn" : ""}"
                            type="button"
                        >

                            <i class="ri-check-line"></i>

                        </button>


                        <button
                            class="edit-btn"
                            type="button"
                        >

                            <i class="ri-pencil-ai-line"></i>

                        </button>


                        <button
                            class="schedule-btn"
                            type="button"
                        >

                            <i class="ri-time-line"></i>

                        </button>


                        <button
                            class="delete-btn"
                            type="button"
                        >

                            <i class="ri-delete-bin-line"></i>

                        </button>

                    </div>

                </div>

            `;

        });


        /* -------------------------
           DELETE
        ------------------------- */

        const deleteBtns =
            document.querySelectorAll(".delete-btn");


        deleteBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

                const item =
                    btn.closest(".task-item");

                const index =
                    Number(item.dataset.index);


                taskArr.splice(index, 1);


                localStorage.setItem(
                    "tasks",
                    JSON.stringify(taskArr)
                );


                ui();

            });

        });


        /* -------------------------
           EDIT
        ------------------------- */

        const editBtns =
            document.querySelectorAll(".edit-btn");


        editBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

                const item =
                    btn.closest(".task-item");

                const index =
                    Number(item.dataset.index);


                const newTask =
                    prompt(
                        "Edit your task:",
                        taskArr[index].text
                    );


                if(
                    newTask !== null &&
                    newTask.trim() !== ""
                ){

                    taskArr[index].text =
                        newTask.trim();


                    localStorage.setItem(
                        "tasks",
                        JSON.stringify(taskArr)
                    );


                    ui();

                }

            });

        });


        /* -------------------------
           COMPLETE
        ------------------------- */

        const completeBtns =
            document.querySelectorAll(".complete-btn");


        completeBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

                const item =
                    btn.closest(".task-item");

                const index =
                    Number(item.dataset.index);


                taskArr[index].completed =
                    !taskArr[index].completed;


                localStorage.setItem(
                    "tasks",
                    JSON.stringify(taskArr)
                );


                ui();

            });

        });


        /* -------------------------
           SCHEDULE
        ------------------------- */

        const scheduleBtns =
            document.querySelectorAll(".schedule-btn");


        scheduleBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

                const item =
                    btn.closest(".task-item");

                const index =
                    Number(item.dataset.index);


                const time =
                    prompt(
                        "Enter time (e.g. 14:30):"
                    );


                if(
                    time !== null &&
                    time.trim() !== ""
                ){

                    taskArr[index].time =
                        time.trim();


                    localStorage.setItem(
                        "tasks",
                        JSON.stringify(taskArr)
                    );


                    renderPlanner();

                }

            });

        });


        updateOverview();

        renderPlanner();

    };


    /* -------------------------
       ADD TODO
    ------------------------- */

    if(addBtn){

        addBtn.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                const task =
                    taskInput.value.trim();


                if(task !== ""){

                    taskArr.push({

                        text: task,

                        completed: false,

                        important: false,

                        time: null

                    });


                    localStorage.setItem(
                        "tasks",
                        JSON.stringify(taskArr)
                    );


                    taskInput.value = "";


                    ui();

                }

            }
        );

    }


    /* Enter key */

    if(taskInput){

        taskInput.addEventListener(
            "keydown",
            (event) => {

                if(event.key === "Enter"){

                    event.preventDefault();

                    addBtn.click();

                }

            }
        );

    }


    ui();

}


/* Start Todo */

todoOperations();


/* =========================================================
   DAILY PLANNER
========================================================= */

function dailyPlannerOperations(){

    if(plannerCard){

        plannerCard.addEventListener(
            "click",
            () => {

                dashboard.classList.add("hidden");

                featureView.classList.add("open");

                plannerFeature.classList.add("active");


                renderPlanner();

                showPlannerDate();

            }
        );

    }


    if(backBtnPlanner){

        backBtnPlanner.addEventListener(
            "click",
            () => {

                dashboard.classList.remove("hidden");

                featureView.classList.remove("open");

                plannerFeature.classList.remove("active");

            }
        );

    }

}


dailyPlannerOperations();


/* -------------------------
   RENDER PLANNER
------------------------- */

function renderPlanner(){

    if(!scheduleList){

        return;

    }


    scheduleList.innerHTML = "";


    taskArr
        .filter(task => task.time !== null)
        .sort(
            (a, b) =>
                a.time.localeCompare(b.time)
        )
        .forEach((task) => {

            scheduleList.innerHTML += `

                <div
                    class="time-slot ${task.completed ? "completed" : ""}"
                >

                    <span class="slot-time">
                        ${task.time}
                    </span>

                    <div class="slot-line"></div>

                    <span class="plan-task">
                        ${task.text}
                    </span>

                </div>

            `;

        });

}


/* -------------------------
   PLANNER DATE
------------------------- */

function showPlannerDate(){

    const plannerDate =
        document.querySelector("#plannerDate");


    if(!plannerDate){

        return;

    }


    const today =
        new Date();


    const options = {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    };


    plannerDate.textContent =
        today.toLocaleDateString(
            "en-IN",
            options
        );

}


/* =========================================================
   WEATHER
========================================================= */

function weatherOperations(){


    /* -------------------------
       WEATHER CODE
    ------------------------- */

    function getWeatherCondition(code){

        if(code === 0){

            return "Clear sky";

        }

        if(code === 1){

            return "Mainly clear";

        }

        if(code === 2){

            return "Partly cloudy";

        }

        if(code === 3){

            return "Overcast";

        }

        if(
            code === 45 ||
            code === 48
        ){

            return "Foggy";

        }

        if(
            code >= 51 &&
            code <= 57
        ){

            return "Drizzle";

        }

        if(
            code >= 61 &&
            code <= 67
        ){

            return "Rain";

        }

        if(
            code >= 71 &&
            code <= 77
        ){

            return "Snow";

        }

        if(
            code >= 80 &&
            code <= 82
        ){

            return "Rain showers";

        }

        if(
            code >= 95 &&
            code <= 99
        ){

            return "Thunderstorm";

        }

        return "Current conditions";

    }


    /* -------------------------
       WEATHER ICON
    ------------------------- */

    function getWeatherIcon(code){

        if(code === 0){

            return "☀";

        }

        if(
            code === 1 ||
            code === 2
        ){

            return "🌤";

        }

        if(code === 3){

            return "☁";

        }

        if(
            code >= 45 &&
            code <= 48
        ){

            return "🌫";

        }

        if(
            code >= 51 &&
            code <= 67
        ){

            return "🌧";

        }

        if(
            code >= 71 &&
            code <= 77
        ){

            return "❄";

        }

        if(
            code >= 80 &&
            code <= 82
        ){

            return "🌦";

        }

        if(
            code >= 95
        ){

            return "⛈";

        }

        return "☀";

    }


    /* -------------------------
       LOCATION
    ------------------------- */

    function getLocation(){

        if(!navigator.geolocation){

            console.log(
                "Geolocation is not supported."
            );

            return;

        }


        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                console.log(
                    "Location:",
                    latitude,
                    longitude
                );


                getWeather(
                    latitude,
                    longitude
                );


                getLocationName(
                    latitude,
                    longitude
                );

            },


            (error) => {

                console.log(
                    "Location error:",
                    error
                );

                if(weatherCondition){

                    weatherCondition.textContent =
                        "Location unavailable";

                }

            }

        );

    }


    /* -------------------------
       LOCATION NAME
    ------------------------- */

    async function getLocationName(
        latitude,
        longitude
    ){

        try{

            const url =
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;


            const response =
                await fetch(url);


            if(!response.ok){

                throw new Error(
                    "Location request failed"
                );

            }


            const data =
                await response.json();


            const address =
                data.address || {};


            const city =
                address.city ||
                address.town ||
                address.village ||
                address.municipality ||
                address.county ||
                "Your Location";


            const state =
                address.state || "";


            const locationText =
                state
                    ? `${city}, ${state}`
                    : city;


            /* Dashboard */

            if(weatherLocation){

                weatherLocation.textContent =
                    locationText;

            }


            /* Full screen */

            if(weatherFullLocation){

                weatherFullLocation.textContent =
                    locationText;

            }

        }
        catch(error){

            console.log(
                "Location name error:",
                error
            );

        }

    }


    /* -------------------------
       WEATHER API
    ------------------------- */

    async function getWeather(
        latitude,
        longitude
    ){

        try{

            const url =
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=auto`;


            const response =
                await fetch(url);


            if(!response.ok){

                throw new Error(
                    "Weather request failed"
                );

            }


            const data =
                await response.json();


            console.log(
                "WEATHER DATA:",
                data
            );


            const current =
                data.current;


            const condition =
                getWeatherCondition(
                    current.weather_code
                );


            const icon =
                getWeatherIcon(
                    current.weather_code
                );


            /* -------------------------
               DASHBOARD
            ------------------------- */

            if(temperature){

                temperature.textContent =
                    `${Math.round(
                        current.temperature_2m
                    )}°`;

            }


            if(weatherCondition){

                weatherCondition.textContent =
                    condition;

            }


            if(humidity){

                humidity.textContent =
                    `${current.relative_humidity_2m}%`;

            }


            if(wind){

                wind.textContent =
                    `${current.wind_speed_10m} km/h`;

            }


            if(precipitation){

                precipitation.textContent =
                    `${current.precipitation} mm`;

            }


            if(weatherIcon){

                weatherIcon.textContent =
                    icon;

            }


            /* -------------------------
               FULL WEATHER SCREEN
            ------------------------- */

            if(weatherFullTemperature){

                weatherFullTemperature.textContent =
                    `${Math.round(
                        current.temperature_2m
                    )}°`;

            }


            if(weatherFullCondition){

                weatherFullCondition.textContent =
                    condition;

            }


            if(weatherFullHumidity){

                weatherFullHumidity.textContent =
                    `${current.relative_humidity_2m}%`;

            }


            if(weatherFullWind){

                weatherFullWind.textContent =
                    `${current.wind_speed_10m} km/h`;

            }


            if(weatherFullPrecipitation){

                weatherFullPrecipitation.textContent =
                    `${current.precipitation} mm`;

            }


            if(weatherFullIcon){

                weatherFullIcon.textContent =
                    icon;

            }

        }
        catch(error){

            console.log(
                "Weather error:",
                error
            );


            if(weatherCondition){

                weatherCondition.textContent =
                    "Unable to load weather";

            }

        }

    }


    /* -------------------------
       OPEN WEATHER
    ------------------------- */

    if(weatherCard){

        weatherCard.addEventListener(
            "click",
            () => {

                if(
                    !weatherFeature ||
                    !featureView
                ){

                    return;

                }


                dashboard.classList.add(
                    "hidden"
                );

                featureView.classList.add(
                    "open"
                );

                weatherFeature.classList.add(
                    "active"
                );

            }
        );

    }


    /* -------------------------
       BACK WEATHER
    ------------------------- */

    if(weatherBackBtn){

        weatherBackBtn.addEventListener(
            "click",
            () => {

                dashboard.classList.remove(
                    "hidden"
                );

                featureView.classList.remove(
                    "open"
                );

                if(weatherFeature){

                    weatherFeature.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    /* Get weather immediately */

    getLocation();

}


weatherOperations();


/* =========================================================
   MOTIVATION / QUOTES
========================================================= */

function motivationOperations(){

    if(motivationCard){

        motivationCard.addEventListener(
            "click",
            () => {

                dashboard.classList.add(
                    "hidden"
                );

                featureView.classList.add(
                    "open"
                );

                motivationFeature.classList.add(
                    "active"
                );

            }
        );

    }


    if(motivationBckBtn){

        motivationBckBtn.addEventListener(
            "click",
            () => {

                dashboard.classList.remove(
                    "hidden"
                );

                featureView.classList.remove(
                    "open"
                );

                motivationFeature.classList.remove(
                    "active"
                );

            }
        );

    }


    /* -------------------------
       GET QUOTE
    ------------------------- */

    async function getQuote(){

        try{

            if(quoteLoading){

                quoteLoading.classList.remove(
                    "hidden"
                );

            }


            if(quoteError){

                quoteError.classList.add(
                    "hidden"
                );

            }


            const response =
                await fetch(
                    "https://dummyjson.com/quotes/random"
                );


            if(!response.ok){

                throw new Error(
                    "Failed to fetch quote"
                );

            }


            const data =
                await response.json();


            console.log(
                "QUOTE:",
                data
            );


            /* Full screen */

            if(quoteText){

                quoteText.textContent =
                    data.quote;

            }


            if(quoteAuthor){

                quoteAuthor.textContent =
                    `— ${data.author}`;

            }


            /* Dashboard */

            if(dashboardQuoteText){

                dashboardQuoteText.textContent =
                    `“${data.quote}”`;

            }


            if(dashboardQuoteAuthor){

                dashboardQuoteAuthor.textContent =
                    `— ${data.author}`;

            }

        }
        catch(error){

            console.log(
                "Quote error:",
                error
            );


            if(quoteError){

                quoteError.classList.remove(
                    "hidden"
                );

            }

        }
        finally{

            if(quoteLoading){

                quoteLoading.classList.add(
                    "hidden"
                );

            }

        }

    }


    if(newQuote){

        newQuote.addEventListener(
            "click",
            () => {

                getQuote();

            }
        );

    }


    /* Initial quote */

    getQuote();

}


motivationOperations();


/* =========================================================
   POMODORO
========================================================= */

function pomodoroOperations(){

    /* -------------------------
       NAVIGATION
    ------------------------- */

    if(pomodoroCard){

        pomodoroCard.addEventListener(
            "click",
            () => {

                dashboard.classList.add(
                    "hidden"
                );

                featureView.classList.add(
                    "open"
                );

                pomodoroFeature.classList.add(
                    "active"
                );

            }
        );

    }


    if(pomodoroBckBtn){

        pomodoroBckBtn.addEventListener(
            "click",
            () => {

                dashboard.classList.remove(
                    "hidden"
                );

                featureView.classList.remove(
                    "open"
                );

                pomodoroFeature.classList.remove(
                    "active"
                );

            }
        );

    }


    /* -------------------------
       TIMER
    ------------------------- */

    const totalSeconds =
        25 * 60;

    let remainingSeconds =
        totalSeconds;

    let timer = null;


    /* -------------------------
       DISPLAY
    ------------------------- */

    const updateTimerDisplay = () => {

        const minutes =
            Math.floor(
                remainingSeconds / 60
            );


        const seconds =
            remainingSeconds % 60;


        if(timerDisplay){

            timerDisplay.textContent =
                `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        }


        /* Progress */

        if(timerProgress){

            const percentage =
                (
                    (totalSeconds -
                    remainingSeconds)
                    /
                    totalSeconds
                ) * 100;


            timerProgress.style.width =
                `${percentage}%`;

        }

    };


    /* -------------------------
       START
    ------------------------- */

    if(startTimer){

        startTimer.addEventListener(
            "click",
            () => {

                if(timer !== null){

                    return;

                }


                timer =
                    setInterval(
                        () => {

                            if(
                                remainingSeconds > 0
                            ){

                                remainingSeconds--;

                                updateTimerDisplay();

                            }
                            else{

                                clearInterval(timer);

                                timer = null;


                                if(sessionLabel){

                                    sessionLabel.textContent =
                                        "SESSION COMPLETE";

                                }

                            }

                        },
                        1000
                    );

            }
        );

    }


    /* -------------------------
       PAUSE
    ------------------------- */

    if(pauseTimer){

        pauseTimer.addEventListener(
            "click",
            () => {

                if(timer !== null){

                    clearInterval(timer);

                    timer = null;

                }

            }
        );

    }


    /* -------------------------
       RESET
    ------------------------- */

    if(resetTimer){

        resetTimer.addEventListener(
            "click",
            () => {

                clearInterval(timer);

                timer = null;


                remainingSeconds =
                    totalSeconds;


                if(sessionLabel){

                    sessionLabel.textContent =
                        "WORK SESSION";

                }


                updateTimerDisplay();

            }
        );

    }


    updateTimerDisplay();

}


pomodoroOperations();


/* =========================================================
   DAILY GOALS
========================================================= */


/* -------------------------
   GOAL NAVIGATION
------------------------- */

if(goalsCard){

    goalsCard.addEventListener(
        "click",
        () => {

            dashboard.classList.add(
                "hidden"
            );

            featureView.classList.add(
                "open"
            );

            goalsFeature.classList.add(
                "active"
            );

        }
    );

}


if(goalsBckBtn){

    goalsBckBtn.addEventListener(
        "click",
        () => {

            dashboard.classList.remove(
                "hidden"
            );

            featureView.classList.remove(
                "open"
            );

            goalsFeature.classList.remove(
                "active"
            );

        }
    );

}


/* =========================================================
   GOAL PROGRESS
========================================================= */

const updateGoalProgress = () => {

    const totalGoals =
        goalArr.length;


    const completedGoals =
        goalArr.filter(
            goal => goal.completed
        ).length;


    let percentage = 0;


    if(totalGoals > 0){

        percentage =
            Math.round(
                (
                    completedGoals /
                    totalGoals
                ) * 100
            );

    }


    if(goalsProgressText){

        goalsProgressText.textContent =
            `${completedGoals} of ${totalGoals} completed`;

    }


    if(goalsPercentage){

        goalsPercentage.textContent =
            `${percentage}%`;

    }


    if(goalsBar){

        goalsBar.style.width =
            `${percentage}%`;

    }

};


/* =========================================================
   GOAL UI
========================================================= */

const goalUI = () => {

    if(!goalList){

        return;

    }


    goalList.innerHTML = "";


    if(goalArr.length === 0){

        goalList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ◎
                </div>

                <h4>
                    No goals yet
                </h4>

                <p>
                    Add a goal and start making progress.
                </p>

            </div>

        `;

    }


    goalArr.forEach(
        (goal, index) => {

            goalList.innerHTML += `

                <div
                    class="goal-item ${goal.completed ? "completed" : ""}"
                    data-index="${index}"
                >

                    <span class="goal-text">
                        ${goal.text}
                    </span>


                    <div class="goal-actions">

                        <button
                            class="goalcomplete-btn ${goal.completed ? "completed-btn" : ""}"
                            type="button"
                        >

                            <i class="ri-check-line"></i>

                        </button>


                        <button
                            class="goaledit-btn"
                            type="button"
                        >

                            <i class="ri-pencil-ai-line"></i>

                        </button>


                        <button
                            class="goaldelete-btn"
                            type="button"
                        >

                            <i class="ri-delete-bin-line"></i>

                        </button>

                    </div>

                </div>

            `;

        }
    );


    /* -------------------------
       DELETE
    ------------------------- */

    const goaldeleteBtns =
        document.querySelectorAll(
            ".goaldelete-btn"
        );


    goaldeleteBtns.forEach(
        (btn) => {

            btn.addEventListener(
                "click",
                () => {

                    const item =
                        btn.closest(
                            ".goal-item"
                        );


                    const index =
                        Number(
                            item.dataset.index
                        );


                    goalArr.splice(
                        index,
                        1
                    );


                    localStorage.setItem(
                        "goals",
                        JSON.stringify(goalArr)
                    );


                    goalUI();

                }
            );

        }
    );


    /* -------------------------
       EDIT
    ------------------------- */

    const goaleditBtns =
        document.querySelectorAll(
            ".goaledit-btn"
        );


    goaleditBtns.forEach(
        (btn) => {

            btn.addEventListener(
                "click",
                () => {

                    const item =
                        btn.closest(
                            ".goal-item"
                        );


                    const index =
                        Number(
                            item.dataset.index
                        );


                    const newGoal =
                        prompt(
                            "Edit your Goal:",
                            goalArr[index].text
                        );


                    if(
                        newGoal !== null &&
                        newGoal.trim() !== ""
                    ){

                        goalArr[index].text =
                            newGoal.trim();


                        localStorage.setItem(
                            "goals",
                            JSON.stringify(goalArr)
                        );


                        goalUI();

                    }

                }
            );

        }
    );


    /* -------------------------
       COMPLETE
    ------------------------- */

    const goalcompleteBtns =
        document.querySelectorAll(
            ".goalcomplete-btn"
        );


    goalcompleteBtns.forEach(
        (btn) => {

            btn.addEventListener(
                "click",
                () => {

                    const item =
                        btn.closest(
                            ".goal-item"
                        );


                    const index =
                        Number(
                            item.dataset.index
                        );


                    goalArr[index].completed =
                        !goalArr[index].completed;


                    localStorage.setItem(
                        "goals",
                        JSON.stringify(goalArr)
                    );


                    goalUI();

                }
            );

        }
    );


    updateGoalProgress();

};




if(addGoal){

    addGoal.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            const goal =
                goalInput.value.trim();


            if(goal !== ""){

                goalArr.push({

                    text: goal,

                    completed: false

                });


                localStorage.setItem(
                    "goals",
                    JSON.stringify(goalArr)
                );


                goalInput.value = "";


                goalUI();

            }

        }
    );

}



if(goalInput){

    goalInput.addEventListener(
        "keydown",
        (event) => {

            if(event.key === "Enter"){

                event.preventDefault();

                addGoal.click();

            }

        }
    );

}




goalUI();




function updateDashboardData(){

    

    const todoTotal =
        document.querySelector("#todoTotal");


    if(todoTotal){

        todoTotal.textContent =
            taskArr.length;

    }


    

    const dashboardGoals =
        document.querySelector(
            "#dashboardGoals"
        );


    if(dashboardGoals){

        const completed =
            goalArr.filter(
                goal => goal.completed
            ).length;


        dashboardGoals.textContent =
            `${completed} / ${goalArr.length}`;

    }

}


updateDashboardData();