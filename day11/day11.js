const fs = require("fs")
monkeyBlocks = fs.readFileSync("input.txt", "utf-8").split("\n\n")

let monkeys = [];
const makeTheMonkeys = () =>{
    monkeys = monkeyBlocks.map(block => {
        const [_, itemLine, opline, test, trueres, falseres] = block.split("\n")
        return {
            items: itemLine.split(':')[1].split(",").map(v => parseInt(v)),
            operation: opline.split("old ")[1],
            test: parseInt(test.split("divisible by")[1]),
            trueres: parseInt(trueres.split("throw to monkey")[1]),
            falseres: parseInt(falseres.split("throw to monkey")[1]),
            inspected: 0
        }
    })
}

const passesTest=(item, division) =>{
    return item%division === 0;
}

const handleOperation = (item, op) =>{
    const [operation, amount] = op.split(" ");
    if(amount === "old"){
        return item*item
    }
    let intVal = parseInt(amount)
    if(operation == "+"){
        return item+intVal
    }
    return item*intVal
}

makeTheMonkeys()
const period = monkeys.map(m => m.test).reduce((m, t) => m*t, 1)
const playRound = (isQ1) =>{
    for(let i =0; i<monkeys.length; i++){
        while(monkeys[i].items.length > 0){
            monkeys[i].inspected++;
            const item = monkeys[i].items.shift();
            let worryLevel = handleOperation(item, monkeys[i].operation)
            if(isQ1){
                worryLevel = Math.floor(worryLevel/3);
            }
            if(passesTest(worryLevel, monkeys[i].test)){
                    monkeys[monkeys[i].trueres].items.push(worryLevel%period)
            }else{
                monkeys[monkeys[i].falseres].items.push(worryLevel%period)
            }
        }
    }
}

//Q1
makeTheMonkeys()
for(let i =0; i<20; i++){
    playRound(true)
}
console.log(330*328)

//Q2
makeTheMonkeys()
for(let i =0; i<10000; i++){
    playRound()
}
console.log(monkeys)
