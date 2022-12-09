const fs = require("fs")
movements = fs.readFileSync("input.txt", "utf-8").split("\n")

const q2visited=new Set()
const q1visited=new Set()
q1visited.add("0:0")
q2visited.add("0:0")
// U L R D
let headX = 0
let headY = 0

let knots = []
for(let i = 0; i<9; i++){
    knots.push([0, 0])
}

const isAdjacent = (x1, x2, y1, y2) =>{
    return Math.abs(x2-x1) <= 1 && Math.abs(y2-y1) <=1
}

movements.forEach((row) => {
    const direction = row.split(" ")[0]
    const quantity = parseInt(row.split(" ")[1])
    for(let i =1; i<=quantity; i++){
        switch(direction){
            case "U": 
                headY = headY + 1
                break
            case "D":
                headY -= 1
                break
            case "L":
                headX = headX - 1
                break
            case "R":
                headX += 1
        }
        knots.forEach((_, index) =>{
            previousKnotX = index===0?headX:knots[index-1][0]
            previousKnotY = index===0?headY:knots[index-1][1]
            while(!isAdjacent(previousKnotX, knots[index][0], previousKnotY, knots[index][1])){
                const diagonalBoost = (previousKnotX !== knots[index][0] && previousKnotY !== knots[index][1])?0:1
                if(knots[index][0] < previousKnotX -diagonalBoost){
                    knots[index][0] ++
                }
                else if(knots[index][0] > previousKnotX + diagonalBoost){
                    knots[index][0] --
                }
                if(knots[index][1] < previousKnotY -diagonalBoost){
                    knots[index][1] ++
                }
                else if(knots[index][1] > previousKnotY +diagonalBoost){
                    knots[index][1] --
                }
                
                if(index === 8){
                    q2visited.add(`${knots[index][0]}:${knots[index][1]}`)
                }
                if(index === 0){
                    q1visited.add(`${knots[index][0]}:${knots[index][1]}`)
                }
            }
        })
    }
   

   
})

console.log(q1visited.size)
console.log(q2visited.size)
