const fs = require("fs")

pairs = fs.readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(","))


// q1
const bInsideA = (a, b) => {
    const [min, max] = a.split("-")
    const [bmin, bmax] = b.split("-")
    return parseInt(min) <= parseInt(bmin) && parseInt(bmax) <= parseInt(max)
}
pairsWhereOneContainsOther = pairs.filter(
    pair => bInsideA(pair[0], pair[1]) || bInsideA(pair[1], pair[0])
)
console.log(pairsWhereOneContainsOther.length)

// q2
const bOverlapsA = (a, b) =>{
    [min, max] = a.split("-")
    const [bmin, bmax] = b.split("-")
    return (parseInt(min) <= parseInt(bmin) && parseInt(bmin) <= parseInt(max)) || (parseInt(min) <= parseInt(bmax) && parseInt(bmax) <= parseInt(max)) 

}
console.log(pairs.filter(
    pair => bOverlapsA(pair[0], pair[1]) || bOverlapsA(pair[1], pair[0])
).length)