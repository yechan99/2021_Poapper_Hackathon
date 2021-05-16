let database = {} //대기중이면 1, 완성되었으면 2, 없다면 undefined
database[300] = 2
database[301] = 1
database[302] = 1
database[303] = 1
//예시로 만들어 놓겠다. database는 조금 더 생각이 필요한 듯
setTimeout(() => {
    database[301] = 2
}, 12000); //흠...
setTimeout(() => {
    database[302] = 2
}, 20000); //흠...
setTimeout(() => {
    database[303] = 2
}, 30000); //흠...

exports.db = database;