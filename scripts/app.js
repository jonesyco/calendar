/*
TODO: Browserify horoscope.js, dateToWords.js into bundles.js
      - "browserify horoscope.js, title.js -O > bundle.js"
TODO: store user preferences in localForage. Load upon initialization
      -interface colors: how to get hex value from input type color?
      -astrological sign: 
TODO: upon init, load date portion of all keys and place icon on matching date tile to show that the date contains entries
TODO: add picture module
*/
//const localforage = require("localforage");

let today = new Date();
let currentYear = today.getFullYear();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var displayYearSpan = document.getElementById("displayYear");
var displayYear = currentYear;
displayYearSpan.innerHTML = displayYear;
showYear(displayYear);

function current() {
    showYear(currentYear);
}

function next() {
  displayYear = displayYear + 1
  displayYearSpan.innerHTML = displayYear;
  showYear(displayYear);
}

function previous() {
  displayYear = displayYear - 1
  displayYearSpan.innerHTML = displayYear;
  showYear(displayYear);
}

function showYear(year){
    let tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    for (let m = 0; m < months.length; m++){
        showMonth(m,year);
    }
   
}

function showMonth(month, year) {
    let tbl = document.getElementById("calendar-body");
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let date = 1;
    let row = document.createElement("tr");
    for (let i = 0; i < daysInMonth; i++) {
       
        for (let j = 0; j < daysInMonth+6; j++) {
        
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                
                cell.appendChild(cellText);
                cell.add
                cell.classList.add("notCalendarDay");
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let thisCellDate = year.toString() + '-' + (Number(month) + 1).toString() + '-' + date.toString();
                let cellId = thisCellDate;
                cell.id = cellId;
                let cellText = document.createTextNode(date);
               
               
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("today");
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



// FETCH WEATHER AND LUNAR API DATA
async function getWeather(weatherDate) {
 let url = "";
 url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/97202/'+ weatherDate + '?unitGroup=metric&key=7CYFXDXNF3S7KABAG8A37QWUG&contentType=json';
 try {
     let res = await fetch(url);
     return await res.json();
 } catch (error) {
     console.log(error);
 }
}

/// RENDER WEATHER FOR ANY GIVEN DATE

async function renderWeather(weatherDate) {
 let conditions = await getWeather(weatherDate);
 let html = '';
 let tempmin = Math.round(Number(conditions.days[0].tempmin) * 1.8 + 32);
 let tempmax = Math.round(Number(conditions.days[0].tempmax) * 1.8 + 32);
 let moonphase = conditions.days[0].moonphase;
 var lunarIcon = "", lunarIconTitle = "";
 if(moonphase == 0){
   lunarIcon = 'newmoon.png' //newmoon
   lunarIconTitle = "New&nbsp;Moon"
 } 
 else if (moonphase > 0 && moonphase < 0.25){
   lunarIcon = 'waxingcrescent.png' //waxing crescent
   lunarIconTitle = "Waxing&nbsp;Crescent"
 }
 else if (moonphase == 0.25){
   lunarIcon = 'firstquarter.png' //first quarter
   lunarIconTitle = "First&nbsp;Quarter"
 }
 else if (moonphase > 0.25 && moonphase < 0.5){
   lunarIcon = 'waxinggibbous.png' //waxing gibbous
   lunarIconTitle = "Waxing&nbsp;Gibbous"
 }
 else if (moonphase == 0.5){
   lunarIcon = 'fullmoon.png' //fullmoon
   lunarIconTitle = "Full&nbsp;Moon"
 }
 else if (moonphase > 0.5 && moonphase < 0.75){
   lunarIcon = 'waninggibbous.png' //waning gibbous
   lunarIconTitle = "Waning&nbsp;Gibbous"
 }
 else if (moonphase == 0.75){
   lunarIcon = 'lastquarter.png' //last quarter
   lunarIconTitle = "Last&nbsp;Quarter"
 }
 else if (moonphase > 0.75 && moonphase < 1.1){
   lunarIcon = 'waningcrescent.png' //waning crescent
   lunarIconTitle = "Waning&nbsp;Crescent"
 }
 else{
   lunarIcon = '&#127799;'
   lunarIconTitle = "Spooky"
 }
 
/*
 let weather = "<div class='weather'>🌡️ " + tempmin +  " &#176; - " + tempmax + " &#176; </div>";
 let lunar
 weather += "<div class='moonphase' title=" + lunarIconTitle + ">" + lunarIcon + " </div>";
 */
 let weatherContainer = document.querySelector('.weatherContainer');
 //let lunarContainer = document.querySelector('.lunarContainer');
 weatherContainer.innerHTML = "temperature&nbsp;" + tempmin +  "&#176;&nbsp;-&nbsp;" + tempmax + "&#176;&nbsp;&nbsp;<img class='moonphase' src='images/" + lunarIcon + "' title='"+lunarIconTitle+"' />&nbsp;&nbsp;moonphase:&nbsp;" + lunarIconTitle;
 //lunarContainer.innerHTML = "lunar phase: <img class='moonphase' src='images/" + lunarIcon + "' title='"+lunarIconTitle+"' />";

}

// DYNAMIC MODAL AND FORMS CREATION
var dateKey = '';
var activeDate = '';


function BuildModal(e){
        
        dateKey = e.target.id;
        activeDate = document.getElementById(e.target.id);
        //console.log(dateKey);
        activeDate.classList.add('activeDate');
           var modal = document.getElementById("dateModal");
           modal.setAttribute("name",e.target.id);
           
           let modalDate = document.getElementById("modalDate");
           let saveDate = document.getElementById("saveDate");
           
           
           LoadJournal(dateKey);
           LoadTasks(dateKey);
   
        
           //modalDate.innerHTML = e.target.id;
           let dateTest = new Date(e.target.id);
           const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
           modalDate.innerHTML = dateTest.toLocaleDateString(undefined, options);
           saveDate.value = e.target.id;
           var weatherDate = e.target.id;
           //getQuote();
           renderWeather(weatherDate);
           modal.style.display = "block";
}
    
function LoadTasks(dateKey){
  let entryType = '-tasks';
  let apiKey = "" + dateKey+entryType + "";
  localforage.getItem(apiKey).then((value) => {
    document.getElementById("taskEntry").innerHTML = value;
  })
  
}

function LoadJournal(dateKey){
 
  let entryType = '-journal';
  let apiKey = "" + dateKey+entryType + "";
  localforage.getItem(apiKey).then((value) => {
    document.getElementById("journalValue").innerHTML = value;
  })
 
}

function SaveTasks(dateKey){
  let entryType = '-tasks';
  let apiKey = "" + dateKey+entryType + "";
  let entry = document.getElementById("taskEntry").innerHTML;
  SaveContent(apiKey,entry);
}

function SaveJournal(dateKey,journal){
  let entryType = '-journal';
  let apiKey = "" + dateKey+entryType + "";
  let entry = journal;
  SaveContent(apiKey,entry);
}



var modal = document.getElementById("dateModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
 modal.style.display = "none";
 activeDate.classList.remove('activeDate');
}

window.onclick = function(event) {
 if (event.target == modal) {
   modal.style.display = "none";
   activeDate.classList.remove('activeDate');
 }
}

///TOGGLES VISIBLE SECTIONS IN MODAL
function ShowSection(evt, tabname) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
} 

document.getElementById("defaultOpen").click();


///HELPER FUNCTIONS FOR LOADING AND SAVING ALL VALUES USING LOCALFORAGE
function LoadContent(apiKey){
  localforage.setDriver([
    localforage.INDEXEDDB
  ]).then(function(){
    localforage.getItem(apiKey).then(function(readValue) {
      if (readValue === null)readValue = 'empty value';
      console.log('Read: ', readValue);
     // return readValue;
  }).catch(function(err){
    console.log(err);  
  })
})
};

function SaveContent(apiKey, entry){
  
  localforage.setDriver([
    localforage.INDEXEDDB
    ]).then(function(){
      localforage.setItem(apiKey, entry, function(){
        console.log('Using:' + localforage.driver());
        console.log('Saving:'+ entry + ' for '+ apiKey);
        //add logs
      }).catch(function(err){
        console.log(err);  
      })
    })
};

 




// EVENT LISTENERS
window.addEventListener("click", (e) => {

   switch(e.target.className){
     case "btn_del":
        let node = e.target.parentNode;
        if(node.parentNode) node.parentNode.removeChild(node);
        SaveTasks(dateKey);
        break;

      case "btn_check":
        let chkList = e.target.parentElement;
        chkList.classList.toggle("on");
        SaveTasks(dateKey);
        break;

      case "btn_submit":

   }
   
  });


window.addEventListener("dblclick", (e) => {
  if(e.target && e.target.nodeName == "TD"){
    BuildModal(e);
  }
})
 
