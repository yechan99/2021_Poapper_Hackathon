const express = require('express');
const cookieParser = require('cookie-parser');
const data = [require('./databases_jigok'), require('./databases_sbar'), require('./databases_burger')];

const app = express();
app.use(express.static(__dirname));
app.use(express.static("pulic"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use('/', express.static(__dirname + "/script"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/main_page/main.html");
})

var place;

app.get('/1', (req, res) => {
    place = 1;
    res.sendFile(__dirname + "/input_page/input.html");
})
app.get('/2', (req, res) => {
    place = 2;
    res.sendFile(__dirname + "/input_page/input.html");
})
app.get('/3', (req, res) => {
    place = 3;
    res.sendFile(__dirname + "/input_page/input.html");
})

var num;
app.post('/num', (req, res) => {
    const body = req.body;
    console.log(body);
    num = body.number;

    console.log("여기는 num이고 place는 " + place);
    if(data[place-1].db[num] == 1){ //data에 존재하는 숫자라면, 대기중인 음식
        res.cookie('num', num);
        res.sendFile(__dirname + "/waiting_page/waiting.html");
    }else if(data[place-1].db[num] == 2){ //이미 완성된 음식
        res.sendFile(__dirname + "/ready_page/ready.html");
    }else{ //data에 존재하지 않는 숫자라면, 잘못된 번호
        res.sendFile(__dirname + "/wrong_page/wrong.html");
    } 
})

app.get('/get_number', (req, res) => {
    res.json(num);
})

var refreshIntervalId;

app.get('/wait', (req, res) => {
    f_num = req.cookies.num;
    console.log(f_num);

    console.log("여기는 wait이고 place는 " + place);
    refreshIntervalId = setInterval(()=>{
        if(data[place-1].db[f_num] == 2){
            res.sendFile(__dirname + "/ready_page/ready.html");
            clearInterval(refreshIntervalId);
        }
        else {
            console.log("대기중");
        }
    }, 3000)
})

app.get('/cancel', (req, res) => {
    if(refreshIntervalId){
        clearInterval(refreshIntervalId);
    }
    res.sendFile(__dirname + "/main_page/main.html");
})

app.listen(8080, () => console.log("Server is listening on 8080 port!!"));