
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
//let selectYear = document.getElementById("year");
//let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let displayYear = document.getElementById("displayYear");



function next() {
    currentYear = currentYear + 1;
    showYear(currentYear);
}

function previous() {
    currentYear = currentYear - 1;
    showYear(currentYear);
}

function showYear(Year){
	let tbl = document.getElementById("calendar-body");
	tbl.innerHTML = "";
	for (let m = 0; m < months.length; m++){
		showMonth(m,Year);
	}
}


function showMonth(month, year) {
let tbl = document.getElementById("calendar-body");
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();



    // filing data about month and in the page via DOM.
    displayYear.innerHTML = year;
    

    // creating all cells
    let date = 1;
	 let row = document.createElement("tr");
    for (let i = 0; i < daysInMonth; i++) {
        // creates a table row
     

        //creating individual cells, filing them up with data.
        for (let j = 0; j < daysInMonth+6; j++) {
		
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                cell.classList.add("notCalendarDay");
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                var isWeekend = (j === 0) || (j === 6) || (j === 7) || (j === 13) || (j === 14) || (j === 20) || (j === 21) || (j === 27) || (j === 28) || (j === 34) || (j === 35);
                if(isWeekend) {
                    cell.classList.add("weekend");
                } else { 
                    cell.classList.add("weekday");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }
		 // appending each row into calendar body.
    }
	let thisMonth = document.createElement("td");
		let thisMonthValue = document.createTextNode(months[month]);
		thisMonth.appendChild(thisMonthValue);
        thisMonth.classList.add("month");
		row.prepend(thisMonth);
        tbl.appendChild(row);

}
