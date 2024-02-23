const monBtns = document.querySelectorAll('button.mon');
const tueBtns = document.querySelectorAll('button.tue');
const wenBtns = document.querySelectorAll('button.wen');
const thuBtns = document.querySelectorAll('button.thu');
const friBtns = document.querySelectorAll('button.fri');
const dayBtns = [monBtns, tueBtns, wenBtns, thuBtns, friBtns];
let choices = [1, 1, 1, 1, 1]

const monSpan = document.querySelectorAll('span.mon');
const tueSpan = document.querySelectorAll('span.tue');
const wenSpan = document.querySelectorAll('span.wen');
const thuSpan = document.querySelectorAll('span.thu');
const friSpan = document.querySelectorAll('span.fri');
const daySpans = [monSpan, tueSpan, wenSpan, thuSpan, friSpan]

function loadChoices() {
    dayBtns.forEach((day) => {
        day.forEach((number) => {
            number.style.backgroundColor = number.name === choices[dayBtns.indexOf(day)].toString() ? 'green' : "white";
            number.addEventListener('click', () => {
                number.style.backgroundColor = 'green';
                choices[dayBtns.indexOf(day)] = parseInt(number.name);
                day.forEach((others) => {
                    if (others !== number) {
                        others.style.backgroundColor = 'white';
                    };
                })
            })
        })
    })
};
loadChoices();
const sendChoices = document.getElementById('sendChoices');

let soups = [0, 0, 0, 0, 0] // soup thing, it is here only for properly working code

sendChoices.addEventListener('click', () => {
    const data = {
        mon: choices[0],
        tue: choices[1],
        wen: choices[2],
        thu: choices[3],
        fri: choices[4],
        soups: soups
    };
    fetch(`http://localhost:3001/users/choices/${document.getElementById('username').value}`, {
        method: 'POST', // Specify the HTTP method
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON if you're sending JSON data
            // Add any additional headers as needed
        },
        body: JSON.stringify(data) // Convert the data to a JSON string before sending it
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Parse the response body as JSON
        })
        .then(dataI => {
            // Handle the response data here
            document.getElementById('confirmation').innerHTML = dataI;
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
})

// user's choices
document.getElementById('confirm').addEventListener('click', () => {
    fetch('http://localhost:3001/data/users.json')
        .then(response => response.json())
        .then(data => {
            const usersData = data.filter(x => x.name === document.getElementById('username').value);
            choices = []
            for (let index = 0; index < 5; index++) {
                choices.push(usersData[0][["mon", "tue", "wen", "thu", "fri"][index]]);
            };
            loadChoices();
            soups = usersData[0].soups;
            daySoups.forEach((soupDay)=>{
                soupDay.style.backgroundColor = soups[daySoups.indexOf(soupDay)] === 1 ? 'green' : "white";
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});

// soups

const monSoup = document.getElementById('monSoup');
const tueSoup = document.getElementById('tueSoup');
const wenSoup = document.getElementById('wenSoup');
const thuSoup = document.getElementById('thuSoup');
const friSoup = document.getElementById('friSoup');
const daySoups = [monSoup, tueSoup, wenSoup, thuSoup, friSoup]


daySoups.forEach((soupDay) => {
    soupDay.style.backgroundColor = 'white';
    soupDay.addEventListener('click', () => {
        soupDay.style.backgroundColor = soupDay.style.backgroundColor !== 'green' ? 'green' : "white";
        soups[daySoups.indexOf(soupDay)] = soupDay.style.backgroundColor === 'green' ? 1 : 0;
    })
})

// available meals
const soupSpans = document.querySelectorAll('.soupSpans');

fetch('http://localhost:3001/data/choices.json')
    .then(response => response.json())
    .then(data => {
        daySpans.forEach((daySpan) => {
            daySpan.forEach((exactSpan) => {
                exactSpan.innerHTML = data.filter(x => x.day === exactSpan.className)[0]["meal" + exactSpan.getAttribute('name')];
            })
        })
        soupSpans.forEach((soupSpan) => {
            soupSpan.innerHTML = data.filter(x => x.day === soupSpan.getAttribute('name'))[0].soup;
        })
        
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });









