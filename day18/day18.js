const fs = require("fs")
const inputs = fs.readFileSync("input.txt", "utf-8").split("\n")



let maxZ = 0;
let maxY = 0;
let maxX = 0;
const map = [];

for(let z = 0; z<=50; z++){
    let grid = []
    for(let y=0; y<=50; y++){
        let row=[]
        for(let x=0; x<=50; x++){
            row.push("o")
        }
        grid.push(row)
    }
    map.push(grid)
}

inputs.forEach(coords =>{
    const [x, y, z] = coords.split(",").map(c => parseInt(c))
    if(z> maxZ) maxZ = z
    if(y>maxY) maxY=y
    if(x>maxX) maxX=x
    map[z][y][x] = "x"
})


// q1
let sides = 0;
for(let z = 0; z<=maxZ; z++){
    for(let y=0; y<=maxY; y++){
        for(let x=0; x<=maxX; x++){
            if(map[z][y][x] === "o")continue;
            if(z-1<0 || map[z-1][y][x] === "o"){
                sides++;
            }
            if(z+1=== maxZ+1 || map[z+1][y][x] === "o"){
                sides++;
            }
            if(y-1 <0 || map[z][y-1][x] === "o"){
                sides++;
            }
            if(y+1===maxY+1 ||map[z][y+1][x] === "o" ){
                sides++;
            }
            if(x-1 <0 || map[z][y][x-1]=== "o" ){
                sides++;
            }
            if(x+1===maxX+1 || map[z][y][x+1]=== "o" ){
                sides++;
            }
        }
    }
}
console.log(sides)

//q2
let visited = new Set();
let edges=0

const visitAll = (map,maxZ, maxY, maxX, startZ, startY, startX) =>{
    let stack = [[startZ, startY, startX]]
    while(stack.length > 0){
        const [z,y,x] = stack.pop();
        if(z<0 || z>maxZ || y<0 || y>maxY || x<0 || x>maxX){
            continue;
        }

        if(map[z][y][x] === "x"){
            edges++;
            continue;
        }
        if(visited.has(`${z}/${y}/${x}`)){
            continue;
        }
        visited.add(`${z}/${y}/${x}`)



        stack.push([z-1,y,x])
        stack.push([z+1,y,x])
        stack.push([z,y+1,x])
        stack.push([z,y-1,x])
        stack.push([z,y,x+1])
        stack.push([z,y,x-1])
    }
}

for(let z = 0; z<=maxZ; z++){
    for(let y=0; y<=maxY; y+=maxY){
        for(let x=0; x<=maxX; x++){
                visitAll(map, maxZ, maxY, maxX, z,y,x);

        }
    }
}
for(let z = 0; z<=maxZ; z+=maxZ){
    for(let y=0; y<=maxY; y++){
        for(let x=0; x<=maxX; x++){
                visitAll(map, maxZ, maxY, maxX, z,y,x);
        }
    }
}
for(let z = 0; z<=maxZ; z++){
    for(let y=0; y<=maxY; y++){
        for(let x=0; x<=maxX; x+=maxX){
                visitAll(map, maxZ, maxY, maxX, z,y,x);

        }
    }
}
console.log(edges)
