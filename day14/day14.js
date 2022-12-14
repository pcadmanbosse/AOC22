const fs = require("fs")
const {prettyprintmap, prettyprintmaptofile} = require("../utils/prettyprintmap")
const sandlines = fs.readFileSync("input.txt", "utf-8").split("\n").map(sl => sl.split(" -> ").map(coords => {
    const [x, y] = coords.split(",")
    return {x:parseInt(x), y:parseInt(y)}
}))
const makeMap = (sandlines) =>{
    const edgeRight = Math.max(...sandlines.flat().map(s => s.x))
    const edgeBottom = Math.max(...sandlines.flat().map(s => s.y))

    const map = [];
    for(let y = 0; y<=edgeBottom+2; y++){
        const row = []
        for(let x = 0; x<=edgeRight*2; x++){
            row.push(".")
        }
        map.push(row)
    }
    map[map.length -1] =  map[map.length-1].map(_ => "#")
    sandlines.forEach(sandline => {
        for(let i = 0; i<sandline.length -1; i++){
            for(let y = Math.min(sandline[i].y, sandline[i+1].y);y<=Math.max(sandline[i].y, sandline[i+1].y); y++){
                map[y][sandline[i].x] = "#"
            }
            for(let x = Math.min(sandline[i].x, sandline[i+1].x);x<=Math.max(sandline[i].x, sandline[i+1].x); x++){
                map[sandline[i].y][x] = "#"
            }
        }
    })
    return map;
}

// Q1
const canGo = (map, y, x) =>{
    return map[y][x] == "."
}

const fall = (map, max, q2) =>{
    let attemptY = 0;
    let attemptX = 0;
    while(canGo(map, attemptY, 500+attemptX)){
        if(!q2 && attemptY>max){
            return false;
        }
        else if(canGo(map, attemptY+1, 500+attemptX)){
            attemptY++;
        }
        else if(canGo(map, attemptY+1, 500+attemptX-1)){
            attemptY++;
            attemptX--;
        }
        else if(canGo(map, attemptY+1, 500+attemptX+1)){
            attemptY++;
            attemptX = attemptX+1;
        }
        else if(attemptX == 0 && attemptY == 0){
            return false;
        }
        else{
            map[attemptY][500+attemptX]='o';
            return true;
        }
    }
}

let map = makeMap(sandlines)
let count = 0;
const max = Math.max(...sandlines.flat().map(s => s.y)) -1
while(fall(map, max, false)){
    count++;
}
console.log(count)

// Q2
map = makeMap(sandlines)
count = 0;
while(fall(map, max, true)){
    count++;
}
console.log(count)
prettyprintmaptofile(map, "text.txt")
// 498,13 -> 498,17 -> 491,17 -> 491,21 -> 507,21 -> 507,17 -> 502,17 -> 502,13
