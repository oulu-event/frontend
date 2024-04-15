function calendar(firstWeekDay, month, numberOfDays) {
    // Your code goes here
    const weekDayMap = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday" };
    let currentDay = firstWeekDay;
    let line = "";
    for (let i = 1; i <= numberOfDays; i++) {
        if (currentDay == 7) {
            line += `${weekDayMap[currentDay]} ${i}.${month}.`;
            currentDay = 1;
            console.log(line);
            line = "";
        } else {
            line += `${weekDayMap[currentDay]} ${i}.${month}. `;
            currentDay++;
        }
        if(i == numberOfDays){
            return console.log(line);
        }
    }
}

calendar(2, 11, 30);