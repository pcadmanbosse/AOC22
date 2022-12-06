const fs = require("fs")

rounds = fs.readFileSync("input.txt", "utf-8").split("\n");
const [elveTurns, myTurns] = rounds.reduce(([elve, me], currentRound) => {
    [whatHeDid, whatIdid]  = currentRound.split(" ");
    elve.push(whatHeDid)
    me.push(whatIdid)
    return [elve, me]
}, [[], []])

attack_values = {
    "X": 1,
    "Y": 2,
    "Z": 3
}

const compare = (myAttack, elveAttack) =>{
    if(myAttack === "Y"){
        if(elveAttack === "A"){
            return 6
        }
        if(elveAttack === "B"){
            return 3
        }
        if(elveAttack === "C"){
            return 0
        }
    }
    if(myAttack === "X"){
        if(elveAttack === "A"){
            return 3
        }
        if(elveAttack === "B"){
            return 0
        }
        if(elveAttack === "C"){
            return 6
        }
    }
    if(myAttack === "Z"){
        if(elveAttack === "A"){
            return 0
        }
        if(elveAttack === "B"){
            return 6
        }
        if(elveAttack === "C"){
            return 3
        }
    }
}



// q1 
console.log(elveTurns.reduce((total, _, index) => {
    return total + attack_values[myTurns[index]] + compare(myTurns[index], elveTurns[index])
}, 0))


// Q2
combos = {
    "AX": 3,
    "AY": 4,
    "AZ": 8,
    "BX": 1,
    "BY": 5,
    "BZ": 9,
    "CX": 2,
    "CY": 6,
    "CZ": 7

}
console.log(elveTurns.reduce((total, _, index) =>{
    return total + combos[elveTurns[index]+myTurns[index]]
}, 0))