const express = require('express');
const cookieParser = require('cookie-parser');
const data = require('./databases')

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.sendFile(__dirname + "/1.html"); //알맞은 html 사용... html에서 action="/num" method="POST"를 통해 넘어가도록
})

app.post('/num', (req, res) => {
    const body = req.body;
    console.log(body);
    const f_num = body.num;

    if(data.db[f_num] == 1){ //data에 존재하는 숫자라면
        res.cookie('num', f_num);
        res.sendFile(__dirname + "/2.html");
    }else if(data.db[f_num] == 2){
        res.sendFile(__dirname + "/4.html");
    }else{
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