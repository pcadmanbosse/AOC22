const fs = require("fs")
lines = fs.readFileSync("input.txt", "utf-8").split("\n")
width = lines[0].length
height = lines.length
const map = []
const mapInverted = []

for(let y = 0; y<height; y++){
    const row = []
    for(let x = 0; x<width; x++){
        row.push(lines[y][x])
    }
    map.push(row)
}

for(let y = 0; y<width; y++){
    const row = []
    for(let x = 0; x<height; x++){
        row.push(lines[x][y])
    }
    mapInverted.push(row)
}

//q1
let count = 0;
const isVisible = (x, y) => {
    if(x==0 || x==width-1 || y==0 || y==height-1){
        return true;
    }
    const mapRow = map[y]
    const mapInvertedRow = mapInverted[x]
    return Math.max(...mapRow.slice(0, x)) < map[y][x] || Math.max(...mapRow.slice(x +1, width)) < map[y][x] 
    || Math.max(...mapInvertedRow.slice(0, y)) < map[y][x] || Math.max(...mapInvertedRow.slice(y +1, height)) < map[y][x] 
}

map.forEach((_, y)=> {
    _.forEach((__, x) =>{
        if(isVisible(x, y)){
            count++;
        }
    })
})

//q1
console.log(count)

// q2
let maxScore = 0
map.forEach((_, y)=> {
    _.forEach((__, x) =>{
        const mapRow = map[y]
        const mapInvertedRow = mapInverted[x]
        let leftScore = 0;
        for(let l = x-1; l>=0; l--){
            leftScore ++;
            if(mapRow[l] >= map[y][x]){
                break
            }
        }
        let rightScore = 0;
        for(let r = x+1; r<width; r++){
            rightScore++
            if(mapRow[r] >= map[y][x]){
                break
            }
        }
        let topScore = 0;
        for(let t = y-1; t>=0; t--){
            topScore ++;
            if(mapInvertedRow[t] >= map[y][x]){
                break
            }
        }
        let bottomScore =0;
        for(let b = y+1; b<height; b++){
            bottomScore++
            if(mapInvertedRow[b] >= map[y][x]){
               break;
            }
        }
        maxScore = Math.max(maxScore, (bottomScore*topScore*leftScore*rightScore))
    })
})
console.log(maxScore)