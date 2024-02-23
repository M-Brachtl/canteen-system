const monInputs = document.querySelectorAll('.mon');
const tueInputs = document.querySelectorAll('.tue');
const wenInputs = document.querySelectorAll('.wen');
const thuInputs = document.querySelectorAll('.thu');
const friInputs = document.querySelectorAll('.fri');
const allInputs = [monInputs, tueInputs, wenInputs, thuInputs, friInputs];
const soupInput = document.querySelectorAll('.soups');
console.log(soupInput);
console.log(monInputs);
fetch('http://localhost:3001/data/choices.json')
    .then(response => response.json())
    .then(data => {
        let meals = [];
        for (let index = 0; index < data.length; index++) {
            meals.push([]);
            for (let ind = 1; ind < 4; ind++) {
                meals[index].push(data[index]["meal" + ind]);
            }
        }
        console.log(meals)
        allInputs.forEach((dayInput)=>{
            dayInput.forEach((mealInput)=>{
                mealInput.value = meals[allInputs.indexOf(dayInput)][parseInt(mealInput.name)-1];
            })
        })
        for (let index = 0; index < soupInput.length; index++) {
            soupInput[index].value = data[index].soup;
        }
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });


document.getElementById('confirm').addEventListener('click',()=>{
    let temporary_data = {};
    let data = [];
    for (let index = 0; index < 5; index++) {
        temporary_data = {
            day: allInputs[index][0].className,
            meal1: allInputs[index][0].value,
            meal2: allInputs[index][1].value,
            meal3: allInputs[index][2].value,
            soup: soupInput[index].value
        };
        data.push(temporary_data);
    }
    console.log(data);
    fetch(`http://localhost:3001/data/update`, {
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
            console.log(dataI);
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
})

// new user

document.getElementById('addUser').addEventListener('click',()=>{
    const data = {
        name: document.getElementById('nameNewUser').value,
        mon: 1,
        tue: 1,
        wen: 1,
        thu: 1,
        fri: 1,
        soups: [0,0,0,0,0]
    };
    console.log(data);
    fetch(`http://localhost:3001/data/new-user`, {
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
            console.log(dataI);
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
})