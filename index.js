const express = require('express');
const app = express();

const fs = require('fs');


app.use(express.static("fe-user"));
app.use(express.json());

app.listen(3001,() => console.log("Listening on port " + 3001 + "..."));


app.get('/data/choices.json', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + '/data/choices.json');
});
app.get('/data/users.json', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + '/data/users.json');
});

app.post('/users/choices/:name',(req,res)=>{
    const name = req.params.name;
    const choiceNums = req.body;
    
    let userMeal = JSON.parse(fs.readFileSync(__dirname + '/data/users.json'));
    let user = userMeal.filter(x => x.name === name);

    if(user.length === 0){
        res.send("Chyba: Tento strávník neexistuje.");
    }else{
        userMeal[userMeal.indexOf(user[0])].mon = choiceNums.mon;
        userMeal[userMeal.indexOf(user[0])].tue = choiceNums.tue;
        userMeal[userMeal.indexOf(user[0])].wen = choiceNums.wen;
        userMeal[userMeal.indexOf(user[0])].thu = choiceNums.thu;
        userMeal[userMeal.indexOf(user[0])].fri = choiceNums.fri;
        userMeal[userMeal.indexOf(user[0])].soups = choiceNums.soups;
        console.log(userMeal);
        res.send("Úspěšně změněno!");
        fs.writeFileSync(__dirname + '/data/users.json',JSON.stringify(userMeal));
    };
})

// manager's requests
///front-end
app.get('users/manager', (req, res)=>{
    res.sendFile(__dirname + '/fe-user/manager/manager.html');
    res.sendFile(__dirname + '/fe-user/manager/style.css');
    res.sendFile(__dirname + '/fe-user/manager/script.js');
})

///jídelníček
app.post('/data/update', (req,res)=>{
    // console.log(req.body) //
    fs.writeFileSync(__dirname + '/data/choices.json',JSON.stringify(req.body));
    res.send('Data uložena!');
})

///noví strávníci
app.post('/data/new-user', (req, res)=>{
    let fileContent = JSON.parse(fs.readFileSync(__dirname + '/data/users.json'));
    console.log(fileContent);
    fileContent.push(req.body);
    console.log(fileContent);
    console.log(JSON.stringify(fileContent));
    console.log(typeof JSON.stringify(fileContent));
    fs.writeFileSync(__dirname + '/data/users.json',JSON.stringify(fileContent));
    res.send('Nový uživatel přidán.');
})