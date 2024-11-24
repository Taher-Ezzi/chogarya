const taseerValues = {
    Monday: {
        day: [
            "قمر", "زحل", "مشتري", "مريخ",
            "شمس", "زهرة", "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس"

        ],
        night: [
            "زهرة", "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر",
            "زحل", "مشتري"
        ]
    },
    Tuesday: {
        day: [
            "مريخ",
            "شمس", "زهرة", "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر",
        ],
        night: [
            "زحل", "مشتري", "مريخ",
            "شمس", "زهرة", "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس", "زهرة"
        ]
    },
    Wednesday: {
        day: [
            "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر", "زحل", "مشتري", "مريخ",
        ],
        night: [
            "شمس", "زهرة", "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر", "زحل"
        ]
    },
    Thursday: {
        day: [
            "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر", "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد"
        ],

        night: [
            "قمر",
            "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر", "زحل", "مشتري", "مريخ", "شمس",
        ]
    },
    Friday: {
        day: [
            "زهرة", "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر",
            "زحل", "مشتري"
        ],
        night: [
            "مريخ",
            "شمس", "زهرة", "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر",
        ]
    },
    Saturday: {
        day: [
            "زحل", "مشتري", "مريخ",
            "شمس", "زهرة", "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس", "زهرة"
        ],
        night: [
            "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر", "زحل", "مشتري", "مريخ",
        ]
    },
    Sunday: {
        day: [
            "شمس", "زهرة", "عطارد", "قمر",
            "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر", "زحل"
        ],
        night: [
            "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد", "قمر", "زحل", "مشتري", "مريخ", "شمس",
            "زهرة", "عطارد"
        ]
    }
};

document.getElementById("time-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input times and day
    const sunrise = document.getElementById("sunrise").value;
    const sunset = document.getElementById("sunset").value;
    const nextSunrise = document.getElementById("next-sunrise").value; // Optional
    const selectedDay = document.getElementById("day").value;

    if (!sunrise || !sunset || !selectedDay) {
        alert("Please fill all required fields.");
        return;
    }

    // Convert times to Date objects
    const sunriseDate = new Date(`1970-01-01T${sunrise}:00`);
    const sunsetDate = new Date(`1970-01-01T${sunset}:00`);
    const nextSunriseDate = nextSunrise ? new Date(`1970-01-02T${nextSunrise}:00`) : null;

    // Calculate intervals
    const dayInterval = Math.floor((sunsetDate - sunriseDate) / 12); // Day interval

    // Generate Day Table
    const dayTableBody = document.querySelector("#day-table tbody");
    dayTableBody.innerHTML = "";
    let dayStart = new Date(sunriseDate); // Start with sunrise
    for (let i = 0; i < 12; i++) {
        const partEnd = new Date(dayStart.getTime() + dayInterval);
        const displayStart = new Date(dayStart.getTime() + 60000); // Display start +1 minute

        // Get Taseer value for the day part
        const dayTaseer = taseerValues[selectedDay].day[i];
        const taseerColor = getTaseerColor(dayTaseer);

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${i + 1}</td>
          <td>${formatTime12Hour(displayStart)}</td>
          <td>${formatTime12Hour(partEnd)}</td>
          <td>${dayTaseer}</td>
        `;
        row.style.backgroundColor = taseerColor; // Apply background color to the entire row
        dayTableBody.appendChild(row);

        dayStart = new Date(partEnd.getTime() + 1);
    }

    // Generate Night Table only if nextSunrise is provided
    const nightTableBody = document.querySelector("#night-table tbody");
    if (nextSunriseDate) {
        const nightInterval = Math.floor((nextSunriseDate - sunsetDate) / 12); // Night interval
        nightTableBody.innerHTML = "";
        let nightStart = new Date(sunsetDate); // Start with sunset
        for (let i = 0; i < 12; i++) {
            const partEnd = new Date(nightStart.getTime() + nightInterval);
            const displayStart = new Date(nightStart.getTime() + 60000); // Display start +1 minute

            // Get Taseer value for the night part
            const nightTaseer = taseerValues[selectedDay].night[i];
            const taseerColor = getTaseerColor(nightTaseer);

            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${i + 1}</td>
              <td>${formatTime12Hour(displayStart)}</td>
              <td>${formatTime12Hour(partEnd)}</td>
              <td>${nightTaseer}</td>
            `;
            row.style.backgroundColor = taseerColor; // Apply background color to the entire row
            nightTableBody.appendChild(row);

            nightStart = new Date(partEnd.getTime() + 1);
        }
    } else {
        nightTableBody.innerHTML = "<tr><td colspan='4'>No data available</td></tr>";
    }
});

// Helper function to format time as 12-hour
function formatTime12Hour(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours}:${minutes} ${ampm}`;
}

// Helper function to get Taseer color
function getTaseerColor(taseer) {
    if (["شمس", "مشتري", "زهرة"].includes(taseer)) {
        return "lightgreen"; // Green for "شمس", "مشتري", "زهرة"
    }
    if (["زحل", "مريخ"].includes(taseer)) {
        return "lightcoral"; // Red for "زحل", "مشتري"
    }
    return "white"; // Default background color
}
