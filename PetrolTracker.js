// Dark/Light Mode Toggle
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        body.classList.replace("dark-mode", "light-mode");
        themeToggle.textContent = "Switch to Dark Mode";
    } else {
        body.classList.replace("light-mode", "dark-mode");
        themeToggle.textContent = "Switch to Light Mode";
    }
});

// Reset the form
document.getElementById("reset-btn").addEventListener("click", function () {
    document.getElementById("petrol-form").reset();
    document.getElementById("results").style.display = 'none';
    document.getElementById("myChart").style.display = 'none';
});

// Calculate Logic
document.getElementById("calculate-btn").addEventListener("click", function () {
    const vehicleType = document.getElementById("vehicle-type").value;
    const engineCC = parseInt(document.getElementById("engine-cc").value);
    const petrolAmount = parseFloat(document.getElementById("petrol-amount").value);
    const petrolRate = parseFloat(document.getElementById("petrol-rate").value);

    if (petrolAmount <= 0 || petrolRate <= 0) {
        alert("Please enter valid petrol amount and rate.");
        return;
    }

    let mileage = 0;
    let suggestion = "";

    // Calculate mileage based on engine CC and vehicle type
    if (vehicleType === "2w-gear") {
        if (engineCC === 125) mileage = 50;
        else if (engineCC === 150) mileage = 45;
        else if (engineCC === 200) mileage = 40;
        suggestion = "2-Wheeler (Gear) - Excellent fuel efficiency!";
    } else if (vehicleType === "2w-non-gear") {
        mileage = engineCC === 125 ? 55 : 50;
        suggestion = "2-Wheeler (Non-Gear) - Great for short commutes.";
    } else if (vehicleType === "car") {
        mileage = engineCC === 125 ? 15 : engineCC === 150 ? 12 : 10;
        suggestion = "Car - Reliable, but fuel costs can be higher.";
    }

    const averageCost = petrolRate / mileage;
    const possibleDistance = mileage * petrolAmount;

    // Display results
    document.getElementById("milage").innerText = `Mileage: ${mileage.toFixed(2)} km/L`;
    document.getElementById("average").innerText = `Average Cost/km: ${averageCost.toFixed(2)} Rs/km`;
    document.getElementById("travel-distance").innerText = `Distance Possible: ${possibleDistance.toFixed(2)} km`;
    document.getElementById("vehicle-suggestion").innerText = `Vehicle Suggestion: ${suggestion}`;

    // Display Graph with updated yearly data
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'], // Years as labels
            datasets: [{
                label: 'Petrol Rate (Rs/L)',
                data: [90, 100, 120, 105, 103], // Petrol rates for each year
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    });
    document.getElementById("myChart").style.display = 'block';
    document.getElementById("results").style.display = 'block';
});
