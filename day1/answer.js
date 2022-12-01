const fs = require("fs")

elves = fs.readFileSync("input.txt", "utf-8").split("\n\n").map(e => {
    return e.split("\n").map(e => parseInt(e)).reduce((p, n) => p+n, 0)
})

// Q1
console.log(Math.max(...elves))
// Q2
console.log(elves.sort((a, b) => b-a).slice(0, 3).reduce((a, b) => a+b, 0))