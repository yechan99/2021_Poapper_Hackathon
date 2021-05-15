let database = {} //대기중이면 1, 완성되었으면 2, 없다면 undefined
database[100] = 2
database[101] = 1
database[102] = 1
database[103] = 1
//예시로 만들어 놓겠다. database는 조금 더 생각이 필요한 듯
setTimeout(() => {
    database[101] = 2
}, 12000); //흠...
setTimeout(() => {
    database[102] = 2
}, 20000); //흠...

exports.db = database;