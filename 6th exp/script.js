/* ==========================================================================
   Web Technology Laboratory - Experiment 6
   Title: JavaScript Styles and Animations
   Student: Pranav Krishna KP | Reg No: URK24CS1273
   File: script.js
   Description: Complete, clean, vanilla JavaScript implementations for all
                programs and additional concepts in Experiment 6.
   ========================================================================== */

/* ==========================================================================
   PROGRAM 1: DIGITAL CLOCK
   Concepts: JavaScript Date Object, getHours(), getMinutes(), getSeconds(),
             setInterval()
   ========================================================================== */

var clockIntervalId = null;
var is24HourFormat = false;
var isClockPaused = false;

/**
 * Updates the digital clock display with current hours, minutes, and seconds.
 * Called automatically every 1000 milliseconds (1 second) via setInterval().
 */
function updateClock() {
    if (isClockPaused) return;

    // 1. Create a new instance of the JavaScript Date Object
    var now = new Date();

    // 2. Extract hours, minutes, and seconds using Date getter methods
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Handle 12-hour vs 24-hour display format
    var period = "";
    if (!is24HourFormat) {
        period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 hour should be displayed as 12 in 12-hr format
    }

    // 3. Helper logic: Pad single-digit numbers with a leading zero (e.g. 7 -> "07")
    var strHours = hours < 10 ? "0" + hours : String(hours);
    var strMinutes = minutes < 10 ? "0" + minutes : String(minutes);
    var strSeconds = seconds < 10 ? "0" + seconds : String(seconds);

    // 4. Update the HTML DOM elements with the formatted values
    var elHours = document.getElementById("clock-hours");
    var elMinutes = document.getElementById("clock-minutes");
    var elSeconds = document.getElementById("clock-seconds");
    var elPeriod = document.getElementById("clock-period");
    var elDate = document.getElementById("clock-date");

    if (elHours) elHours.innerText = strHours;
    if (elMinutes) elMinutes.innerText = strMinutes;
    if (elSeconds) elSeconds.innerText = strSeconds;

    if (elPeriod) {
        if (is24HourFormat) {
            elPeriod.innerText = "24H";
            elPeriod.style.color = "#38bdf8";
        } else {
            elPeriod.innerText = period;
            elPeriod.style.color = "#f59e0b";
        }
    }

    // Format and display current calendar date
    if (elDate) {
        var options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        elDate.innerText = now.toLocaleDateString("en-US", options);
    }
}

/**
 * Toggles between 12-hour and 24-hour time format.
 */
function toggleClockFormat() {
    is24HourFormat = !is24HourFormat;
    var btn = document.getElementById("btn-toggle-clock-format");
    if (btn) {
        btn.innerText = is24HourFormat ? "Switch to 12-Hour Format" : "Switch to 24-Hour Format";
    }
    updateClock();
}

/**
 * Pauses or resumes the digital clock.
 */
function toggleClockPause() {
    isClockPaused = !isClockPaused;
    var btn = document.getElementById("btn-pause-clock");
    var status = document.getElementById("clock-status");

    if (btn) {
        btn.innerText = isClockPaused ? "Resume Clock" : "Pause Clock";
    }
    if (status) {
        if (isClockPaused) {
            status.innerText = "⏸ Paused";
            status.style.color = "#f59e0b";
            status.style.background = "rgba(245, 158, 11, 0.12)";
            status.style.borderColor = "rgba(245, 158, 11, 0.3)";
        } else {
            status.innerText = "● Live (1000ms Interval)";
            status.style.color = "#10b981";
            status.style.background = "rgba(16, 185, 129, 0.12)";
            status.style.borderColor = "rgba(16, 185, 129, 0.3)";
        }
    }
}

// Start Program 1 clock timer: executes updateClock() every 1000ms
clockIntervalId = setInterval(updateClock, 1000);


/* ==========================================================================
   PROGRAM 2: DYNAMIC BACKGROUND COLOUR
   Concepts: Math.random(), Math.floor(), document.body.style, setInterval()
   ========================================================================== */

var bgIntervalSeconds = 30; // Auto-change interval: 30 seconds
var bgCountdown = bgIntervalSeconds;
var bgTimerIntervalId = null;
var isBgTimerRunning = true;
var defaultPageBg = "#f1f5f9";

/**
 * Generates random RGB values and applies them to the document body background.
 */
function changeBackgroundColor() {
    // 1. Generate random integer numbers between 0 and 255 for Red, Green, and Blue
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // 2. Assemble CSS RGB string
    var rgbString = "rgb(" + r + ", " + g + ", " + b + ")";

    // 3. Convert to Hex code for display
    var hexString = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

    // 4. Change webpage background colour using JavaScript
    document.body.style.backgroundColor = rgbString;

    // 5. Update info displays
    var rgbText = document.getElementById("current-rgb-text");
    var hexText = document.getElementById("current-hex-text");
    var swatch = document.getElementById("color-swatch-preview");

    if (rgbText) rgbText.innerText = rgbString;
    if (hexText) hexText.innerText = hexString;
    if (swatch) swatch.style.backgroundColor = rgbString;

    // Reset countdown back to 30 seconds after changing
    bgCountdown = bgIntervalSeconds;
    updateBgProgressBar();
}

/**
 * Button handler to trigger an immediate color change.
 */
function changeBackgroundNow() {
    changeBackgroundColor();
}

/**
 * Resets the background color back to default soft slate gray.
 */
function resetBackgroundColor() {
    document.body.style.backgroundColor = defaultPageBg;
    var rgbText = document.getElementById("current-rgb-text");
    var hexText = document.getElementById("current-hex-text");
    var swatch = document.getElementById("color-swatch-preview");

    if (rgbText) rgbText.innerText = "rgb(241, 245, 249)";
    if (hexText) hexText.innerText = "#F1F5F9";
    if (swatch) swatch.style.backgroundColor = defaultPageBg;

    bgCountdown = bgIntervalSeconds;
    updateBgProgressBar();
}

/**
 * Updates the 30-second countdown display and visual progress bar every second.
 */
function tickBgCountdown() {
    if (!isBgTimerRunning) return;

    bgCountdown--;
    if (bgCountdown <= 0) {
        changeBackgroundColor();
    } else {
        updateBgProgressBar();
    }
}

function updateBgProgressBar() {
    var timerText = document.getElementById("bg-countdown-timer");
    var progressBar = document.getElementById("bg-timer-progress");

    if (timerText) {
        timerText.innerText = bgCountdown + " seconds";
    }
    if (progressBar) {
        var percentage = (bgCountdown / bgIntervalSeconds) * 100;
        progressBar.style.width = percentage + "%";
    }
}

/**
 * Toggles the 30-second auto-change timer on/off.
 */
function toggleBgTimer() {
    isBgTimerRunning = !isBgTimerRunning;
    var btn = document.getElementById("btn-toggle-bg-timer");
    if (btn) {
        btn.innerText = isBgTimerRunning ? "Pause 30s Timer" : "Resume 30s Timer";
    }
}

// Start 1-second ticker to handle the 30-second auto-change
bgTimerIntervalId = setInterval(tickBgCountdown, 1000);


/* ==========================================================================
   PROGRAM 3: CHANGE FONT SIZE (HOVER ZOOM)
   Concepts: onmouseover, onmouseout, element.style.fontSize
   ========================================================================== */

var isAutoPulsing = false;
var pulseTimer = null;

/**
 * Increases font size to 28px when the mouse cursor enters the element.
 */
function incSize() {
    var elem = document.getElementById("zoom-paragraph");
    var sizeBadge = document.getElementById("current-size-badge");
    var stateBadge = document.getElementById("zoom-event-state");

    if (elem) {
        // Change font size to 28px
        elem.style.fontSize = "28px";
    }

    if (sizeBadge) sizeBadge.innerText = "28px";
    if (stateBadge) {
        stateBadge.innerText = "Mouse Over (Zoomed In)";
        stateBadge.style.color = "#b45309";
        stateBadge.style.background = "#fef3c7";
    }
}

/**
 * Decreases font size back to 16px when the mouse cursor leaves the element.
 */
function decSize() {
    var elem = document.getElementById("zoom-paragraph");
    var sizeBadge = document.getElementById("current-size-badge");
    var stateBadge = document.getElementById("zoom-event-state");

    if (elem) {
        // Restore font size to 16px
        elem.style.fontSize = "16px";
    }

    if (sizeBadge) sizeBadge.innerText = "16px";
    if (stateBadge) {
        stateBadge.innerText = "Mouse Out (Normal)";
        stateBadge.style.color = "#475569";
        stateBadge.style.background = "#f1f5f9";
    }
}

/**
 * Extra feature: toggles an automatic pulse demonstration.
 */
function togglePulseAnimation() {
    isAutoPulsing = !isAutoPulsing;
    if (isAutoPulsing) {
        var state = false;
        pulseTimer = setInterval(function () {
            state = !state;
            if (state) incSize();
            else decSize();
        }, 700);
    } else {
        clearInterval(pulseTimer);
        decSize();
    }
}


/* ==========================================================================
   PROGRAM 4: CAR MOVEMENT ANIMATION
   Concepts: init(), moveRight(), setTimeout(), clearTimeout(), boundary check
   ========================================================================== */

var car = null;
var carTimer = null;
var carPos = 0;
var carSpeed = 5;
var isCarMoving = false;

/**
 * Initializes car position to 0px and clears any existing animation timer.
 */
function init() {
    car = document.getElementById("car-image");
    if (car) {
        car.style.position = "relative";
        car.style.left = "0px";
    }
    carPos = 0;
    isCarMoving = false;
    clearTimeout(carTimer);
    updateCarTelemetry("Ready / Stationary");
}

/**
 * Moves the car towards the right by carSpeed pixels per frame.
 * Uses recursive setTimeout() to repeatedly advance the position.
 */
function moveRight() {
    var track = document.getElementById("road-track");
    if (!car) car = document.getElementById("car-image");
    if (!track || !car) return;

    // Calculate maximum right boundary so car does not exit the track surface
    var trackWidth = track.clientWidth;
    var carWidth = car.offsetWidth || 150;
    var maxRight = trackWidth - carWidth - 15; // 15px margin before finish edge

    var isLooping = document.getElementById("car-loop-check") ? document.getElementById("car-loop-check").checked : false;

    if (carPos < maxRight) {
        // Car is still inside bounds: advance position
        carPos += carSpeed;
        car.style.left = carPos + "px";
        isCarMoving = true;
        updateCarTelemetry("Cruising Right (" + carSpeed + "px/f)");

        // Recursively call moveRight using setTimeout() every 20 milliseconds
        carTimer = setTimeout(moveRight, 20);
    } else {
        // Boundary reached
        if (isLooping) {
            // If continuous loop is checked, wrap back to starting line
            carPos = 0;
            car.style.left = "0px";
            carTimer = setTimeout(moveRight, 20);
        } else {
            // Stop at finish line
            clearTimeout(carTimer);
            isCarMoving = false;
            updateCarTelemetry("Finished Track! (Stop Boundary)");
        }
    }
}

/**
 * Stops the car animation using clearTimeout().
 */
function stopCar() {
    clearTimeout(carTimer);
    isCarMoving = false;
    updateCarTelemetry("Stopped (clearTimeout called)");
}

/**
 * Updates speed based on user selector.
 */
function updateCarSpeed() {
    var select = document.getElementById("car-speed-select");
    if (select) {
        carSpeed = parseInt(select.value, 10) || 5;
    }
}

/**
 * Updates telemetry meters on the dashboard.
 */
function updateCarTelemetry(statusText) {
    var posText = document.getElementById("car-pos-text");
    var progressText = document.getElementById("car-progress-text");
    var statusBadge = document.getElementById("car-status-badge");
    var track = document.getElementById("road-track");

    if (posText) posText.innerText = Math.round(carPos) + " px";

    if (track && progressText) {
        var trackWidth = track.clientWidth || 800;
        var carWidth = (car && car.offsetWidth) ? car.offsetWidth : 150;
        var maxRight = trackWidth - carWidth - 15;
        var pct = maxRight > 0 ? Math.min(100, Math.round((carPos / maxRight) * 100)) : 0;
        progressText.innerText = Math.max(0, pct) + "%";
    }

    if (statusBadge) {
        statusBadge.innerText = statusText;
        if (statusText.indexOf("Cruising") !== -1) {
            statusBadge.style.color = "#10b981";
        } else if (statusText.indexOf("Finished") !== -1) {
            statusBadge.style.color = "#8b5cf6";
        } else if (statusText.indexOf("Stopped") !== -1) {
            statusBadge.style.color = "#f43f5e";
        } else {
            statusBadge.style.color = "#0284c7";
        }
    }
}


/* ==========================================================================
   PROGRAM 5: STUDENT DETAILS USING ARRAY OF OBJECTS
   Concepts: Array of objects, for loop, if/else statements
   ========================================================================== */

// 1. Create an array containing student objects
var students = [
    { name: "Pranav Krishna", regNo: "URK24CS1273", yob: 2004 },
    { name: "Rahul Sharma",   regNo: "URK24CS1001", yob: 1998 },
    { name: "Sneha Patel",    regNo: "URK24CS1045", yob: 2000 },
    { name: "Aditya Verma",   regNo: "URK24CS1112", yob: 1999 },
    { name: "Ananya Iyer",    regNo: "URK24CS1205", yob: 2000 },
    { name: "Kevin Joseph",   regNo: "URK24CS1330", yob: 2003 }
];

var activeStudentFilter = "all";

/**
 * Iterates through the students array using a for loop,
 * categorizes each student using if/else statements, and renders into HTML table.
 */
function displayStudents() {
    var tableBody = document.getElementById("student-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = ""; // Clear table body

    var countAll = students.length;
    var countBefore = 0;
    var countExact = 0;
    var countAfter = 0;

    var currentYear = new Date().getFullYear();

    // 2. Use a for loop to iterate through the array of student objects
    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        var category = "";
        var badgeClass = "";

        // 3. Use if/else statements to categorize students
        if (student.yob < 2000) {
            category = "Born before 2000";
            badgeClass = "cat-before";
            countBefore++;
        } else if (student.yob === 2000) {
            category = "Born in 2000";
            badgeClass = "cat-exact";
            countExact++;
        } else {
            category = "Born after 2000";
            badgeClass = "cat-after";
            countAfter++;
        }

        // Apply active filter if user selected a category tab
        if (activeStudentFilter === "before" && student.yob >= 2000) continue;
        if (activeStudentFilter === "exact" && student.yob !== 2000) continue;
        if (activeStudentFilter === "after" && student.yob <= 2000) continue;

        var age = currentYear - student.yob;

        // Build table row
        var row = document.createElement("tr");
        row.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td><strong>" + student.name + "</strong></td>" +
            "<td><code>" + student.regNo + "</code></td>" +
            "<td>" + student.yob + "</td>" +
            "<td>" + age + " years</td>" +
            "<td><span class='student-cat-badge " + badgeClass + "'>" + category + "</span></td>";

        tableBody.appendChild(row);
    }

    // Update count badges
    var elAll = document.getElementById("count-all");
    var elBefore = document.getElementById("count-before");
    var elExact = document.getElementById("count-exact");
    var elAfter = document.getElementById("count-after");

    if (elAll) elAll.innerText = countAll;
    if (elBefore) elBefore.innerText = countBefore;
    if (elExact) elExact.innerText = countExact;
    if (elAfter) elAfter.innerText = countAfter;
}

/**
 * Filter students by category tab.
 */
function filterStudents(filterType) {
    activeStudentFilter = filterType;

    // Toggle active CSS class on pills
    var pills = document.querySelectorAll(".student-stat-pill");
    pills.forEach(function (pill) {
        pill.classList.remove("active");
    });

    if (filterType === "all" && pills[0]) pills[0].classList.add("active");
    if (filterType === "before" && pills[1]) pills[1].classList.add("active");
    if (filterType === "exact" && pills[2]) pills[2].classList.add("active");
    if (filterType === "after" && pills[3]) pills[3].classList.add("active");

    displayStudents();
}

/**
 * Handles adding a new student to the array dynamically.
 */
function handleAddStudent(e) {
    e.preventDefault();

    var nameInput = document.getElementById("stu-name");
    var regInput = document.getElementById("stu-reg");
    var yobInput = document.getElementById("stu-yob");

    if (!nameInput || !regInput || !yobInput) return;

    var name = nameInput.value.trim();
    var regNo = regInput.value.trim().toUpperCase();
    var yob = parseInt(yobInput.value, 10);

    if (name && regNo && !isNaN(yob)) {
        // Push new object to students array
        students.push({
            name: name,
            regNo: regNo,
            yob: yob
        });

        // Reset form and re-render
        nameInput.value = "";
        regInput.value = "";
        yobInput.value = "";

        displayStudents();
    }
}


/* ==========================================================================
   SECTION 7: ADDITIONAL CONCEPT DEMONSTRATIONS
   ========================================================================== */

/* --- 1. setTimeout() Demo --- */
var demoTimeoutId = null;
var demoTimeoutSecs = 3;
var demoTimeoutTickInterval = null;

function triggerTimeoutDemo() {
    cancelTimeoutDemo();
    var resultBox = document.getElementById("timeout-result");
    var countdown = 3;

    if (resultBox) {
        resultBox.innerText = "Timer started! Triggering in " + countdown + "s...";
        resultBox.style.color = "#2563eb";
    }

    demoTimeoutTickInterval = setInterval(function () {
        countdown--;
        if (countdown > 0 && resultBox) {
            resultBox.innerText = "Timer running... " + countdown + "s remaining";
        }
    }, 1000);

    // Call callback function after 3000ms delay using setTimeout()
    demoTimeoutId = setTimeout(function () {
        clearInterval(demoTimeoutTickInterval);
        if (resultBox) {
            resultBox.innerText = "✓ setTimeout() Executed callback successfully after 3 seconds!";
            resultBox.style.color = "#047857";
        }
    }, 3000);
}

function cancelTimeoutDemo() {
    if (demoTimeoutId) {
        clearTimeout(demoTimeoutId);
        clearInterval(demoTimeoutTickInterval);
        demoTimeoutId = null;
        var resultBox = document.getElementById("timeout-result");
        if (resultBox) {
            resultBox.innerText = "Timer cancelled with clearTimeout().";
            resultBox.style.color = "#dc2626";
        }
    }
}

/* --- 2. setInterval() & clearInterval() Stopwatch Demo --- */
var stopwatchIntervalId = null;
var stopwatchCentiseconds = 0;
var isStopwatchRunning = false;

function startIntervalDemo() {
    if (isStopwatchRunning) return;
    isStopwatchRunning = true;

    // Repeat every 100 milliseconds
    stopwatchIntervalId = setInterval(function () {
        stopwatchCentiseconds++;
        var totalSecs = Math.floor(stopwatchCentiseconds / 10);
        var tenths = stopwatchCentiseconds % 10;
        var mins = Math.floor(totalSecs / 60);
        var secs = totalSecs % 60;

        var strMins = mins < 10 ? "0" + mins : mins;
        var strSecs = secs < 10 ? "0" + secs : secs;

        var display = document.getElementById("interval-counter-val");
        if (display) {
            display.innerText = strMins + ":" + strSecs + "." + tenths;
        }
    }, 100);
}

function stopIntervalDemo() {
    if (isStopwatchRunning) {
        // Stop the interval using clearInterval()
        clearInterval(stopwatchIntervalId);
        isStopwatchRunning = false;
    }
}

function resetIntervalDemo() {
    stopIntervalDemo();
    stopwatchCentiseconds = 0;
    var display = document.getElementById("interval-counter-val");
    if (display) display.innerText = "00:00.0";
}

/* --- 3. Date Object Methods Demo --- */
function refreshDateMethods() {
    var output = document.getElementById("date-methods-output");
    if (!output) return;

    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var methods = [
        { name: "getFullYear()", val: d.getFullYear() },
        { name: "getMonth()", val: d.getMonth() + " (" + months[d.getMonth()] + ")" },
        { name: "getDate()", val: d.getDate() },
        { name: "getDay()", val: d.getDay() + " (" + days[d.getDay()] + ")" },
        { name: "getHours()", val: d.getHours() },
        { name: "getMinutes()", val: d.getMinutes() },
        { name: "getSeconds()", val: d.getSeconds() },
        { name: "getMilliseconds()", val: d.getMilliseconds() },
        { name: "getTime()", val: d.getTime() + " (ms)" },
        { name: "toDateString()", val: '"' + d.toDateString() + '"' }
    ];

    var html = "";
    for (var i = 0; i < methods.length; i++) {
        html += "<div class='date-method-row'>" +
            "<span class='date-method-name'>d." + methods[i].name + "</span>" +
            "<span class='date-method-val'>" + methods[i].val + "</span>" +
            "</div>";
    }
    output.innerHTML = html;
}

/* --- 4. JavaScript Classes and Objects Demo --- */
// ES6 Class definition
class Vehicle {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    getInfo() {
        return this.year + " " + this.brand + " " + this.model;
    }

    calculateAge() {
        return new Date().getFullYear() - this.year;
    }
}

function instantiateClassDemo() {
    var carSamples = [
        new Vehicle("Toyota", "Supra MK4", 1998),
        new Vehicle("Nissan", "Skyline GT-R", 2002),
        new Vehicle("Porsche", "911 GT3 RS", 2023),
        new Vehicle("Tesla", "Model 3 Performance", 2024)
    ];

    var randomCar = carSamples[Math.floor(Math.random() * carSamples.length)];
    var resultBox = document.getElementById("class-result");

    if (resultBox) {
        resultBox.innerHTML =
            "<strong>Instantiated:</strong> <code>new Vehicle('" + randomCar.brand + "', '" + randomCar.model + "', " + randomCar.year + ")</code><br>" +
            "<strong>Method getInfo():</strong> " + randomCar.getInfo() + "<br>" +
            "<strong>Method calculateAge():</strong> " + randomCar.calculateAge() + " years old";
    }
}

/* --- 5. Changing CSS styles using element.style --- */
var boxRadiused = false;
var boxBordered = false;
var boxShadowed = false;

function changeBoxStyle(action) {
    var box = document.getElementById("style-target-box");
    if (!box) return;

    if (action === "bg") {
        var r = Math.floor(Math.random() * 200);
        var g = Math.floor(Math.random() * 200);
        var b = Math.floor(Math.random() * 200);
        // Direct manipulation of element.style.backgroundColor and color
        box.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        box.style.color = "#ffffff";
    } else if (action === "radius") {
        boxRadiused = !boxRadiused;
        // Direct manipulation of element.style.borderRadius
        box.style.borderRadius = boxRadiused ? "24px" : "6px";
    } else if (action === "border") {
        boxBordered = !boxBordered;
        // Direct manipulation of element.style.borderColor and borderWidth
        box.style.border = boxBordered ? "3px dashed #ef4444" : "2px solid #cbd5e1";
    } else if (action === "shadow") {
        boxShadowed = !boxShadowed;
        // Direct manipulation of element.style.boxShadow
        box.style.boxShadow = boxShadowed ? "0 10px 25px rgba(37, 99, 235, 0.45)" : "none";
    } else if (action === "reset") {
        box.style.backgroundColor = "#f1f5f9";
        box.style.color = "#0f172a";
        box.style.borderRadius = "6px";
        box.style.border = "2px solid #cbd5e1";
        box.style.boxShadow = "none";
        boxRadiused = false;
        boxBordered = false;
        boxShadowed = false;
    }
}

/* --- 6. Showing and Hiding Elements using display --- */
function toggleDisplay(mode) {
    var target = document.getElementById("display-target");
    var status = document.getElementById("display-status-text");
    if (!target) return;

    if (mode === "hide") {
        // Hide element using display = "none"
        target.style.display = "none";
        if (status) status.innerHTML = "Current: <code>element.style.display = 'none'</code> (Hidden from layout)";
    } else if (mode === "show") {
        // Show element using display = "block"
        target.style.display = "block";
        if (status) status.innerHTML = "Current: <code>element.style.display = 'block'</code> (Visible)";
    } else if (mode === "toggle") {
        if (target.style.display === "none") {
            target.style.display = "block";
            if (status) status.innerHTML = "Current: <code>element.style.display = 'block'</code> (Visible)";
        } else {
            target.style.display = "none";
            if (status) status.innerHTML = "Current: <code>element.style.display = 'none'</code> (Hidden)";
        }
    }
}

/* --- 7. Fade-Out & Fade-In Animation using Opacity --- */
var fadeInterval = null;

function fadeOutElement() {
    var elem = document.getElementById("fade-target");
    var meter = document.getElementById("fade-meter");
    if (!elem) return;

    clearInterval(fadeInterval);
    var opacity = 1.0;

    // Decrement opacity gradually in small steps of 0.05
    fadeInterval = setInterval(function () {
        if (opacity > 0) {
            opacity -= 0.05;
            if (opacity < 0) opacity = 0;
            elem.style.opacity = opacity.toFixed(2);
            if (meter) meter.innerText = "Opacity: " + opacity.toFixed(2);
        } else {
            clearInterval(fadeInterval);
        }
    }, 30);
}

function fadeInElement() {
    var elem = document.getElementById("fade-target");
    var meter = document.getElementById("fade-meter");
    if (!elem) return;

    clearInterval(fadeInterval);
    var opacity = parseFloat(elem.style.opacity) || 0;

    // Increment opacity gradually in small steps of 0.05
    fadeInterval = setInterval(function () {
        if (opacity < 1.0) {
            opacity += 0.05;
            if (opacity > 1) opacity = 1;
            elem.style.opacity = opacity.toFixed(2);
            if (meter) meter.innerText = "Opacity: " + opacity.toFixed(2);
        } else {
            clearInterval(fadeInterval);
        }
    }, 30);
}

function resetFadeElement() {
    clearInterval(fadeInterval);
    var elem = document.getElementById("fade-target");
    var meter = document.getElementById("fade-meter");
    if (elem) elem.style.opacity = "1";
    if (meter) meter.innerText = "Opacity: 1.00";
}


/* ==========================================================================
   INITIALIZATION ON PAGE LOAD
   ========================================================================== */
window.onload = function () {
    // 1. Initialize digital clock
    updateClock();

    // 2. Initialize car animation position
    init();

    // 3. Initialize student objects table
    displayStudents();

    // 4. Populate Date methods inspector
    refreshDateMethods();

    // 5. Initialize background countdown UI
    updateBgProgressBar();
};
