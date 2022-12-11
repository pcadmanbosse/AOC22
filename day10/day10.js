const fs = require("fs")
input = fs.readFileSync("input.txt", "utf-8").split("\n")

let val = 1;
let buffer = []

let q1 = 0;
let q2 = "";
let row = "";
let cycles=[20, 60, 100, 140, 180, 220]

for (let i = 0; i<input.length ; i++){
    if(!input[i].includes("noop")){
        let val = parseInt(input[i].split(" ")[1])
        buffer.push(0)
        buffer.push(val)
    }
    else{
        buffer.push(0)
    }
}
for(let i = 1; i<=260; i++){
    //Q1
    if(cycles.includes(i)){
        q1 = q1+ val*i
        console.log({q1, val, mulval: val*i})
    }
    //Q2
    let spritePos = (i-1)%40
    if(spritePos === 0 ){
        q2+=row
        q2+="\n"
        row=""
    }
    if(val -1 <=spritePos && val +1 >=spritePos){
        row+="#"
    }else{
        row+="."
    }

    nextVal = buffer.shift()
    val+=nextVal
}

console.log(q1)
console.log(q2)
