/* =========================================================
   Web Technology Lab - Experiment 5 (JavaScript)
   Title: JavaScript DOM Elements and Events
   Student: Pranav Krishna KP (URK24CS1273)
   ========================================================= */

// ---------------------------------------------------------
// ACTIVITY 1: DOM Elements Demonstration
// ---------------------------------------------------------

// 1. getElementById() Demonstration
function testById() {
    let target = document.getElementById("demo-target-id");
    target.style.backgroundColor = "#e0f2fe"; // Light blue background
    target.style.borderColor = "#0284c7";     // Blue border
    
    let result = document.getElementById("dom-result-text");
    result.innerHTML = "<strong>getElementById() executed:</strong> Selected element with ID <code>demo-target-id</code> and updated its background and border.";
}

// 2. getElementsByTagName() Demonstration
function testByTagName() {
    let target = document.getElementById("demo-target-id");
    let paragraphs = target.getElementsByTagName("p");
    
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.color = "#7c3aed";       // Purple text
        paragraphs[i].style.fontWeight = "bold";
    }
    
    let result = document.getElementById("dom-result-text");
    result.innerHTML = "<strong>getElementsByTagName() executed:</strong> Found " + paragraphs.length + " <code>&lt;p&gt;</code> elements and highlighted their text in purple.";
}

// 3. getElementsByClassName() Demonstration
function testByClassName() {
    let items = document.getElementsByClassName("demo-class-item");
    
    for (let i = 0; i < items.length; i++) {
        items[i].style.backgroundColor = "#10b981"; // Emerald green
        items[i].style.color = "#ffffff";
    }
    
    let result = document.getElementById("dom-result-text");
    result.innerHTML = "<strong>getElementsByClassName() executed:</strong> Found " + items.length + " elements with class <code>demo-class-item</code> and styled them green.";
}

// 4. querySelectorAll() Demonstration
function testQuerySelectorAll() {
    let items = document.querySelectorAll("#demo-target-id .demo-class-item");
    
    items.forEach(function(item, index) {
        item.style.backgroundColor = "#ea580c"; // Orange
        item.style.color = "#ffffff";
        item.textContent = "Selected #" + (index + 1);
    });
    
    let result = document.getElementById("dom-result-text");
    result.innerHTML = "<strong>querySelectorAll() executed:</strong> Selected matching elements using CSS selector <code>#demo-target-id .demo-class-item</code> and updated their labels.";
}

// Reset Activity 1 DOM
function resetDomDemo() {
    let target = document.getElementById("demo-target-id");
    target.style.backgroundColor = "#f8fafc";
    target.style.borderColor = "#94a3b8";
    
    let paragraphs = target.getElementsByTagName("p");
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.color = "#1e293b";
        paragraphs[i].style.fontWeight = "normal";
    }
    
    let items = document.getElementsByClassName("demo-class-item");
    let labels = ["Class Item A", "Class Item B", "Class Item C"];
    for (let i = 0; i < items.length; i++) {
        items[i].style.backgroundColor = "#e2e8f0";
        items[i].style.color = "#1e293b";
        items[i].textContent = labels[i];
    }
    
    document.getElementById("dom-result-text").textContent = "DOM styles reset to default.";
}


// ---------------------------------------------------------
// ACTIVITY 2: JavaScript Events Demonstration
// ---------------------------------------------------------

// 1. onclick Event Counter
let clickCount = 0;
function handleClickEvent() {
    clickCount++;
    let btn = document.getElementById("click-btn");
    btn.textContent = "Click Me (Count: " + clickCount + ")";
}

// 2. onchange Event
function handleChangeEvent() {
    let select = document.getElementById("event-select");
    let status = document.getElementById("change-status");
    if (select.value) {
        status.textContent = "Selected Language: " + select.value;
        status.style.color = "#059669";
    } else {
        status.textContent = "No language selected.";
        status.style.color = "#0284c7";
    }
}

// 3. onmouseover & onmouseout Events
function handleMouseOver() {
    let box = document.getElementById("hover-box");
    box.style.backgroundColor = "#4f46e5";
    box.style.color = "#ffffff";
    box.textContent = "Mouse Pointer Inside Box!";
    document.getElementById("hover-status").textContent = "Status: onmouseover event triggered.";
}

function handleMouseOut() {
    let box = document.getElementById("hover-box");
    box.style.backgroundColor = "#e0e7ff";
    box.style.color = "#4338ca";
    box.textContent = "Hover Your Mouse Over This Box!";
    document.getElementById("hover-status").textContent = "Status: onmouseout event triggered.";
}

// 4. onkeydown Event
function handleKeyDown(event) {
    let status = document.getElementById("key-status");
    status.innerHTML = "Last Key Pressed: <strong>" + event.key + "</strong> (Key Code: " + event.keyCode + ")";
}

// 5. onsubmit Event
function handleFormSubmit(event) {
    event.preventDefault(); // Stop page reload
    let name = document.getElementById("student-name").value;
    let status = document.getElementById("submit-status");
    status.innerHTML = "Form successfully submitted for: <strong>" + name + "</strong>";
    status.style.color = "#059669";
}


// ---------------------------------------------------------
// ACTIVITY 3: String Word Finder
// ---------------------------------------------------------

function findWords() {
    let text = document.getElementById("sentence-input").value.trim();
    let resultBox = document.getElementById("word-results");
    
    if (!text) {
        resultBox.innerHTML = "<span style='color:red;'>Please enter a sentence first.</span>";
        return;
    }
    
    // Split words by space, punctuation, and newline
    let words = text.match(/[a-zA-Z0-9]+/g);
    
    if (!words || words.length === 0) {
        resultBox.innerHTML = "<span style='color:red;'>No valid words found in the sentence.</span>";
        return;
    }
    
    let shortest = words[0];
    let longest = words[0];
    
    for (let i = 1; i < words.length; i++) {
        if (words[i].length < shortest.length) {
            shortest = words[i];
        }
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    
    resultBox.innerHTML = `
        <p><strong>Total Words Count:</strong> ${words.length}</p>
        <p><strong>Shortest Word:</strong> <span style="color:#0284c7; font-weight:bold;">"${shortest}"</span> (${shortest.length} characters)</p>
        <p><strong>Longest Word:</strong> <span style="color:#7c3aed; font-weight:bold;">"${longest}"</span> (${longest.length} characters)</p>
    `;
}

function clearWordFinder() {
    document.getElementById("sentence-input").value = "";
    document.getElementById("word-results").textContent = "Results will be displayed here.";
}


// ---------------------------------------------------------
// ACTIVITY 4: BMI Calculator
// ---------------------------------------------------------

function calculateBMI() {
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let resultBox = document.getElementById("bmi-result");
    
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        resultBox.innerHTML = "<span style='color:red;'>Please enter valid positive numbers for weight and height.</span>";
        return;
    }
    
    // Convert height from cm to meters
    let heightInMeters = height / 100;
    let bmi = weight / (heightInMeters * heightInMeters);
    bmi = bmi.toFixed(2);
    
    let category = "";
    let badgeClass = "";
    
    if (bmi < 18.5) {
        category = "Underweight";
        badgeClass = "bmi-underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal Weight";
        badgeClass = "bmi-normal";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        category = "Overweight";
        badgeClass = "bmi-overweight";
    } else {
        category = "Obese";
        badgeClass = "bmi-obese";
    }
    
    resultBox.innerHTML = `
        <p>Your Calculated BMI: <strong>${bmi} kg/m&sup2;</strong></p>
        <p>Category: <span class="bmi-badge ${badgeClass}">${category}</span></p>
    `;
}

function resetBMI() {
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    document.getElementById("bmi-result").textContent = "Enter weight and height and click 'Calculate BMI'.";
}


// ---------------------------------------------------------
// ACTIVITY 5: Fruit Farm Generator
// ---------------------------------------------------------

function generateFruitFarm() {
    let rows = parseInt(document.getElementById("farm-rows").value);
    let cols = parseInt(document.getElementById("farm-cols").value);
    let container = document.getElementById("farm-grid-container");
    let stats = document.getElementById("fruit-stats");
    
    if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1) {
        container.innerHTML = "<span style='color:red;'>Please enter valid numbers of rows and columns (minimum 1).</span>";
        return;
    }
    
    // Cap rows and cols at 10 for clean display
    if (rows > 10) rows = 10;
    if (cols > 10) cols = 10;
    
    let appleCount = 0;
    let orangeCount = 0;
    
    let tableHtml = "<table class='farm-table'>";
    
    for (let r = 0; r < rows; r++) {
        tableHtml += "<tr>";
        for (let c = 0; c < cols; c++) {
            // Randomly select Apple (0) or Orange (1)
            let isApple = Math.random() < 0.5;
            if (isApple) {
                appleCount++;
                tableHtml += "<td><img src='images/apple.svg' alt='Apple' title='Apple'></td>";
            } else {
                orangeCount++;
                tableHtml += "<td><img src='images/orange.svg' alt='Orange' title='Orange'></td>";
            }
        }
        tableHtml += "</tr>";
    }
    
    tableHtml += "</table>";
    
    container.innerHTML = tableHtml;
    
    // Update stats
    document.getElementById("apple-count").textContent = appleCount;
    document.getElementById("orange-count").textContent = orangeCount;
    document.getElementById("total-fruit-count").textContent = (appleCount + orangeCount);
    stats.style.display = "flex";
}

function clearFruitFarm() {
    document.getElementById("farm-grid-container").textContent = "Click 'Plant Orchard' to generate the fruits.";
    document.getElementById("fruit-stats").style.display = "none";
}


// ---------------------------------------------------------
// ACTIVITY 6: Currency Converter
// ---------------------------------------------------------

const USD_TO_INR_RATE = 83.50; // Conversion factor: 1 USD = 83.50 INR

function convertCurrency() {
    let amount = parseFloat(document.getElementById("currency-amount").value);
    let type = document.getElementById("conversion-type").value;
    let resultBox = document.getElementById("currency-result");
    
    if (isNaN(amount) || amount < 0) {
        resultBox.innerHTML = "<span style='color:red;'>Please enter a valid positive amount.</span>";
        return;
    }
    
    if (type === "inr-to-usd") {
        let usd = (amount / USD_TO_INR_RATE).toFixed(2);
        resultBox.innerHTML = `<strong>&#8377;${amount.toLocaleString('en-IN')} INR</strong> = <span style="color:#059669; font-size:18px; font-weight:bold;">$${usd} USD</span> <br><small>Rate: 1 USD = &#8377;${USD_TO_INR_RATE}</small>`;
    } else {
        let inr = (amount * USD_TO_INR_RATE).toFixed(2);
        resultBox.innerHTML = `<strong>$${amount.toLocaleString()} USD</strong> = <span style="color:#059669; font-size:18px; font-weight:bold;">&#8377;${parseFloat(inr).toLocaleString('en-IN')} INR</span> <br><small>Rate: 1 USD = &#8377;${USD_TO_INR_RATE}</small>`;
    }
}


// ---------------------------------------------------------
// ACTIVITY 7: Coin Flip
// ---------------------------------------------------------

let coinStats = {
    total: 0,
    heads: 0,
    tails: 0
};

function flipCoin() {
    let coinElement = document.getElementById("coin-element");
    let coinImg = document.getElementById("coin-img");
    let outcomeText = document.getElementById("coin-outcome");
    
    // Add flip spin animation
    coinElement.classList.remove("flip-animation");
    void coinElement.offsetWidth; // Trigger reflow
    coinElement.classList.add("flip-animation");
    
    outcomeText.textContent = "Flipping...";
    
    // 50% random chance
    let isHeads = Math.random() < 0.5;
    
    setTimeout(function() {
        coinStats.total++;
        if (isHeads) {
            coinStats.heads++;
            coinImg.src = "images/heads.svg";
            outcomeText.innerHTML = "Outcome: <span style='color:#d97706;'>HEADS!</span>";
        } else {
            coinStats.tails++;
            coinImg.src = "images/tails.svg";
            outcomeText.innerHTML = "Outcome: <span style='color:#2563eb;'>TAILS!</span>";
        }
        
        // Update scoreboard
        document.getElementById("score-total").textContent = coinStats.total;
        document.getElementById("score-heads").textContent = coinStats.heads;
        document.getElementById("score-tails").textContent = coinStats.tails;
    }, 300);
}

function resetCoinStats() {
    coinStats.total = 0;
    coinStats.heads = 0;
    coinStats.tails = 0;
    
    document.getElementById("score-total").textContent = "0";
    document.getElementById("score-heads").textContent = "0";
    document.getElementById("score-tails").textContent = "0";
    document.getElementById("coin-outcome").textContent = "Click button to flip!";
    document.getElementById("coin-img").src = "images/heads.svg";
}


// ---------------------------------------------------------
// ACTIVITY 8: Birthday Cake Order Form
// ---------------------------------------------------------

const PRICE_HALF_KG = 300; // Rs. 300
const PRICE_ONE_KG  = 550; // Rs. 550
const PRICE_TWO_KG  = 1000; // Rs. 1000
const TAX_PERCENT   = 9;   // 9% tax

function calculateCakeOrder() {
    let qtyHalf = parseInt(document.getElementById("cake-half").value) || 0;
    let qtyOne  = parseInt(document.getElementById("cake-one").value) || 0;
    let qtyTwo  = parseInt(document.getElementById("cake-two").value) || 0;
    
    if (qtyHalf < 0) qtyHalf = 0;
    if (qtyOne < 0) qtyOne = 0;
    if (qtyTwo < 0) qtyTwo = 0;
    
    let subtotal = (qtyHalf * PRICE_HALF_KG) + (qtyOne * PRICE_ONE_KG) + (qtyTwo * PRICE_TWO_KG);
    
    if (subtotal === 0) {
        document.getElementById("cake-bill").innerHTML = "<span style='color:red;'>Please enter a quantity for at least one cake.</span>";
        return;
    }
    
    // 9% Tax
    let taxAmount = subtotal * (TAX_PERCENT / 100);
    
    // Get Selected Tip Radio
    let tipRadios = document.getElementsByName("cake-tip");
    let tipPercent = 10;
    for (let i = 0; i < tipRadios.length; i++) {
        if (tipRadios[i].checked) {
            tipPercent = parseFloat(tipRadios[i].value);
            break;
        }
    }
    
    let tipAmount = subtotal * (tipPercent / 100);
    let totalPayable = subtotal + taxAmount + tipAmount;
    
    let billHtml = `
        <h3 style="color:#0f172a; margin-bottom:10px;">Order Bill Summary</h3>
        <table class="bill-table">
            <tr>
                <td>1/2 kg Cakes (${qtyHalf} &times; &#8377;${PRICE_HALF_KG}):</td>
                <td style="text-align:right;">&#8377;${(qtyHalf * PRICE_HALF_KG).toFixed(2)}</td>
            </tr>
            <tr>
                <td>1 kg Cakes (${qtyOne} &times; &#8377;${PRICE_ONE_KG}):</td>
                <td style="text-align:right;">&#8377;${(qtyOne * PRICE_ONE_KG).toFixed(2)}</td>
            </tr>
            <tr>
                <td>2 kg Cakes (${qtyTwo} &times; &#8377;${PRICE_TWO_KG}):</td>
                <td style="text-align:right;">&#8377;${(qtyTwo * PRICE_TWO_KG).toFixed(2)}</td>
            </tr>
            <tr>
                <td><strong>Subtotal:</strong></td>
                <td style="text-align:right;"><strong>&#8377;${subtotal.toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td>GST / Tax (${TAX_PERCENT}%):</td>
                <td style="text-align:right;">&#8377;${taxAmount.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Selected Tip (${tipPercent}%):</td>
                <td style="text-align:right;">&#8377;${tipAmount.toFixed(2)}</td>
            </tr>
            <tr class="total-row">
                <td>Total Payable Amount:</td>
                <td style="text-align:right;">&#8377;${totalPayable.toFixed(2)}</td>
            </tr>
        </table>
    `;
    
    document.getElementById("cake-bill").innerHTML = billHtml;
}

function resetCakeOrder() {
    document.getElementById("cake-half").value = "1";
    document.getElementById("cake-one").value = "0";
    document.getElementById("cake-two").value = "0";
    document.getElementById("cake-bill").textContent = "Select quantities and tip, then click 'Calculate Total Cost'.";
}
