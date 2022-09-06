// Components //

// Months - for loop 12x year.length
// -> Weeks - months header
// Days  year[0].days

// Load event (init)
// insertadj. year, month, days

import { year, daysOfWeek} from "./yearDB.js"

// --- YEAR COMPONENT --- //

const headerComponent = function (year) {
  return /*html*/`
    <div class="header-container">
      <div class="year">${year}</div>
    </div>
  `
}
const yearComponent = function () {
  return /*html*/`
    <div class="year-container"></div>
  `
}

// --- MONTHS COMPONENT --- //

const monthComponent = function (month, nth){
  return /*html*/`
    <div class="month-container month-${nth}">
      <div class="month-name">${month}</div>
      <div class="days-week"></div>
      <div class="days-container"></div>
    </div>
  `
}

const dayOfWeekComponent = function (dayOfWeek){
  return /*html */ `
    <div class="day-name">${dayOfWeek}</div> 
  `
}

// --- DAYS COMPONENT --- //

const dayComponent = function (day) {
  return /*html*/`
    <div class="day">
        <time datetime="YYYY"></time>
        <time datetime="MM"></time>
        <time datetime="DD">${day}</time>
    </div>`;
}

const placeholderDayComponent = function(){
  return /*html*/ `
    <div class="day-placeholder"></div>
  `
}

function loadEvent() {
  document.querySelector("#root").insertAdjacentHTML("beforeend", headerComponent("2022"));
  document.querySelector("#root").insertAdjacentHTML("beforeend", yearComponent());
  
  for (let m = 0; m < year.length; m++){
    const date = new Date(`${year[m].name} 01, 2022`);

    document.querySelector(".year-container").insertAdjacentHTML("beforeend", monthComponent(year[m].name, year[m].nth));
        
    for(let dw = 0; dw < daysOfWeek.length; dw++){
      document.querySelector(`.month-${m + 1} .days-week`).insertAdjacentHTML("beforeend", dayOfWeekComponent(daysOfWeek[dw]));
    }
    for(let pd = 0; pd < date.getDay() - 1; pd++){
      document.querySelector(`.month-${m + 1} .days-container`).insertAdjacentHTML("beforeend", placeholderDayComponent())
    }
    for(let d = 1; d < year[m].days + 1; d++){
      document.querySelector(`.month-${m + 1} .days-container`).insertAdjacentHTML("beforeend", dayComponent(d))
    }
  }

  const daysEffect = document.querySelectorAll(".day")

  daysEffect.forEach((e) => {
    e.addEventListener('click', () => {
      e.classList.toggle('days-effect')
    }) 
  })

}

window.addEventListener('load', loadEvent)