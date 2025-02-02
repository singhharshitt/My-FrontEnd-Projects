let userinput = document.getElementById("date");
// Set the max date to today
userinput.max = new Date().toISOString().split("T")[0];

let result = document.getElementById("result");

function calcAge() {
    if (!userinput.value) {
        result.innerHTML = "Please select your birthdate."; // Handle empty input
        return;
    }

    let birthdate = new Date(userinput.value);
    let d1 = birthdate.getDate();
    let m1 = birthdate.getMonth() + 1; // Months are 0-indexed
    let y1 = birthdate.getFullYear();

    let today = new Date();
    let d2 = today.getDate();
    let m2 = today.getMonth() + 1; // Months are 0-indexed
    let y2 = today.getFullYear();

    let d3, m3, y3;

    // Calculate years
    y3 = y2 - y1;

    // Calculate months
    if (m2 >= m1) {
        m3 = m2 - m1;
    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }

    // Calculate days
    if (d2 >= d1) {
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }

    // Adjust for negative months
    if (m3 < 0) {
        m3 = 11;
        y3--;
    }

    // Determine message based on age
    let ageMessage = "";
    if (y3 < 0) {
        result.innerHTML = "Invalid birthdate! Please enter a valid date.";
        return;
    } else if (y3 < 13) {
        ageMessage = "You are a child.";
    } else if (y3 < 20) {
        ageMessage = "You are a teenager.";
    } else if (y3 < 60) {
        ageMessage = "You are an adult.";
    } else {
        ageMessage = "You are a senior citizen.";
    }

    // Display the result
    result.innerHTML = `You are ${y3} years, ${m3} months, and ${d3} days old. <br>${ageMessage}`;
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate(); // Correctly calculate days in the month
}
