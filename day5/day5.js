const crates = `
            [L] [M]         [M]    
        [D] [R] [Z]         [C] [L]
        [C] [S] [T] [G]     [V] [M]
[R]     [L] [Q] [B] [B]     [D] [F]
[H] [B] [G] [D] [Q] [Z]     [T] [J]
[M] [J] [H] [M] [P] [S] [V] [L] [N]
[P] [C] [N] [T] [S] [F] [R] [G] [Q]
[Z] [P] [S] [F] [F] [T] [N] [P] [W]
 1   2   3   4   5   6   7   8   9 
`

const fs = require("fs")
instructionsInput = fs.readFileSync("input.txt", "utf-8").split("\n").filter((_, i) => i>9).map(
    v => {
        const regex = `move (.*) from (.*) to (.*)`;
        groups = v.match(regex)
        return [parseInt(groups[1]), parseInt(groups[2]) -1, parseInt(groups[3])-1]
    }
)

let cratesMapped = [["Z", "P","M", "H", "R"],["P", "C", "J", "B"], ["S", "N", "H", "G", "L", "C", "D"], ["F", "T", "M", "D", "Q", "S", "R", "L"], ["F", "S", "P", "Q", "B", "T", "Z", "M"],
["T", "F", "S", "Z", "B", "G"], ["N", "R", "V"], ["P", "G", "L", "T", "D", "V", "C", "M"], ["W", "Q", "N", "J", "F", "M", "L"]]

// q1
instructionsInput.forEach(([quantity,  from, to]) =>{
    cratesToMove = cratesMapped[from].slice(cratesMapped[from].length - quantity)
    remainingCrates = cratesMapped[from].slice(0, cratesMapped[from].length - quantity )
    cratesToMove.reverse()
    cratesMapped[from] = remainingCrates
    cratesMapped[to] = [...cratesMapped[to], ...cratesToMove]
})
console.log(cratesMapped)
console.log("")
// VQZNJMWTR

cratesMapped = [["Z", "P","M", "H", "R"],["P", "C", "J", "B"], ["S", "N", "H", "G", "L", "C", "D"], ["F", "T", "M", "D", "Q", "S", "R", "L"], ["F", "S", "P", "Q", "B", "T", "Z", "M"],
["T", "F", "S", "Z", "B", "G"], ["N", "R", "V"], ["P", "G", "L", "T", "D", "V", "C", "M"], ["W", "Q", "N", "J", "F", "M", "L"]]
//q2
instructionsInput.forEach(([quantity,  from, to]) =>{
    cratesToMove = cratesMapped[from].slice(cratesMapped[from].length - quantity)
    remainingCrates = cratesMapped[from].slice(0, cratesMapped[from].length - quantity )
    cratesMapped[from] = remainingCrates
    cratesMapped[to] = [...cratesMapped[to], ...cratesToMove]
})
console.log(cratesMapped)

// VQZNJMWTR
