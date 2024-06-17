const currentDate = document.querySelector(".current-date"),
    currentDays = document.querySelector(".days"),
    prevNextIcons = document.querySelectorAll(".icons span");

let trad = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let dt = new Date(),
    currYear = dt.getFullYear(),
    currMonth = dt.getMonth();

const renderCalendar = () => {
    dt = new Date();

    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),
        lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    
    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }
    
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === dt.getDate() && currMonth === dt.getMonth() && currYear === dt.getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    
    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }


    currentDate.textContent = `${trad[currMonth]} de ${currYear}`;
    currentDays.innerHTML = liTag;
}

prevNextIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) {
            dt = new Date(currYear, currMonth, new Date().getDate());
            currYear = dt.getFullYear();
            currMonth = dt.getMonth();
        }
        
        renderCalendar();
    })
})

renderCalendar();