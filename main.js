const express = require('express');
const cookieParser = require('cookie-parser');
const data = require('./databases_지곡');

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

app.post('/num', (req, res) => {
    const body = req.body;
    console.log(body);
    const f_num = body.number;

    if(data.db[f_num] == 1){ //data에 존재하는 숫자라면, 대기중인 음식
        res.cookie('num', f_num);
        res.sendFile(__dirname + "/2.html");
    }else if(data.db[f_num] == 2){ //이미 완성된 음식
        res.sendFile(__dirname + "/4.html");
    }else{ //data에 존재하지 않는 숫자라면, 잘못된 번호
        res.sendFile(__dirname + "/3.html");
    }
})

app.get('/wait', (req, res) => {
    f_num = req.cookies.num;
    console.log(f_num);

    setInterval(()=>{
        if(data.db[f_num] == 2)
            res.sendFile(__dirname + "/4.html");
        else console.log("대기중");}, 3000)
})

app.listen(8080, () => console.log("Server is listening on 8080 port!!"));