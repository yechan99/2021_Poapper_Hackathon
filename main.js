const express = require('express');
const cookieParser = require('cookie-parser');
const data1 = require('./databases_지곡');
const data2 = require('./databases_학관');
const data3 = require('./databases_버거킹');

const app = express();
app.use(express.static(__dirname));
app.use(express.static("pulic"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    console.log(req.cookies);
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

app.post('/num', (req, res) => {
    const body = req.body;
    console.log(body);
    const f_num = body.number;

    console.log("여기는 num이고 place는 " + place);

    if(place == 1){
        if(data1.db[f_num] == 1){ //data에 존재하는 숫자라면, 대기중인 음식
            res.cookie('num', f_num);
            res.sendFile(__dirname + "/2.html");
        }else if(data1.db[f_num] == 2){ //이미 완성된 음식
            res.sendFile(__dirname + "/4.html");
        }else{ //data에 존재하지 않는 숫자라면, 잘못된 번호
            res.sendFile(__dirname + "/3.html");
        } 
    }else if(place == 2){
        if(data2.db[f_num] == 1){
            res.cookie('num', f_num);
            res.sendFile(__dirname + "/2.html");
        }else if(data2.db[f_num] == 2){
            res.sendFile(__dirname + "/4.html");
        }else{
            res.sendFile(__dirname + "/3.html");
        }
    }else if(place == 3){
        if(data3.db[f_num] == 1){
            res.cookie('num', f_num);
            res.sendFile(__dirname + "/2.html");
        }else if(data3.db[f_num] == 2){
            res.sendFile(__dirname + "/4.html");
        }else{
            res.sendFile(__dirname + "/3.html");
        }
    }
})

app.get('/wait', (req, res) => {
    f_num = req.cookies.num;
    console.log(f_num);

    console.log("여기는 wait이고 place는 " + place);

    if(place == 1){
        setInterval(()=>{
            if(data1.db[f_num] == 2)
                res.sendFile(__dirname + "/4.html");
            else console.log("대기중");}, 3000)
    }else if(place == 2){
        setInterval(()=>{
            if(data2.db[f_num] == 2)
                res.sendFile(__dirname + "/4.html");
            else console.log("대기중");}, 3000)
    }else if(place == 3){
        setInterval(()=>{
            if(data3.db[f_num] == 2)
                res.sendFile(__dirname + "/4.html");
            else console.log("대기중");}, 3000)
    }
})

app.listen(8080, () => console.log("Server is listening on 8080 port!!"));