const fs = require("fs")
input = fs.readFileSync("input.txt", "utf-8").split("\n")

const map = input.reduce((total, line) => [...total, line.split("")], [])

const canVisitQ1 = (origin, destination) => {
    if(origin === "S" && destination==="a"){
        return true
    }
    if(origin === "S" && destination==="b"){
        return true
    }
    if(origin === "z" && destination==="E"){
        return true
    }
    if(origin === "y" && destination==="E"){
        return true
    }
    return origin.charCodeAt(0) + 1 >= destination.replace("E", "z").charCodeAt(0) 
}

const getNext = (node, allVisits, canVisit) => {
    const {x, y, past} = node
    if(allVisits.find((old) => old.x === x && old.y === y)){
        return []
    }
    const next = [];
    if(y > 0){
        next.push({y: y -1, x, past:past+1})
    }
    if(y < map.length -1){
        next.push({y: y +1, x, past:past+1})
    }
    if(x > 0){
        next.push({y, x: x -1, past:past+1})
    }
    if(x < map[0].length -1){
        next.push({x: x +1,y, past:past+1})
    }
    const filtered =next.filter((nextNode) => {
        const xx = nextNode.x
        const yy = nextNode.y
        return canVisit(map[y][x], map[yy][xx]) && (!(node.x === xx && node.y === yy ))
    })
    return filtered;
}
//q1
// just searched on the input using ctrl f
let startingPos = {y:20, x:0, past:0}
let toVisit = [...getNext(startingPos, [], canVisitQ1)]
let allVisits = []
while(true){
    const nextNode = toVisit.shift()
    if(map[nextNode.y][nextNode.x] === "E"){
        console.log(nextNode.past)
        break;

    }
    toVisit = [...toVisit, ...getNext(nextNode, allVisits, canVisitQ1)]
    allVisits = [...allVisits, {x:nextNode.x, y:nextNode.y}]
}

//q2
// searched input ctrl f
const canVisitQ2 = (origin, destination) =>{
    if(origin === "E" && destination==="z"){
        return true
    }
    if(origin === "E" && destination==="y"){
        return true
    }
    return destination.charCodeAt(0) + 1 >= origin.replace("E", "z").charCodeAt(0) 
}
startingPos = {y: 20, x:136, past: 0}
toVisit = [...getNext(startingPos, [], canVisitQ2)]
allVisits = []
while(toVisit.length > 0){
    const nextNode = toVisit.shift()
    if(map[nextNode.y][nextNode.x] === "a"){
        console.log(nextNode.past)
        break;
    }
    toVisit = [...toVisit, ...getNext(nextNode, allVisits, canVisitQ2)]
    allVisits = [...allVisits, {x:nextNode.x, y:nextNode.y}]
}


