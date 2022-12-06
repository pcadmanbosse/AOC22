const fs = require("fs")

rucksacks = fs.readFileSync("input.txt", "utf-8").split("\n").map(
    line => [line.slice(0, line.length/2), line.slice(line.length/2 )]
);

const charToValue = (char) => {
    if(char.toUpperCase() === char){
        return char.charCodeAt(0) - (65-27)
    }
    return char.charCodeAt(0) - 96
}
// q1 
q1 = rucksacks.map(rucksack =>{
    return [...rucksack[0]].filter(c => rucksack[1].includes(c))[0]
}).reduce((t,c) => t+charToValue(c), 0)

console.log(q1)

//q2
elves = fs.readFileSync("input.txt", "utf-8").split("\n")
groups = []
for(let i = 0; i<elves.length - 2; i+=3){
    groups.push([elves[i], elves[i+1], elves[i+2]])
}
console.log(groups.reduce((t, g) => t+charToValue([...g[0]].filter(c => g[1].includes(c) && g[2].includes(c))[0]), 0))