const fs = require("fs")
const lines = fs.readFileSync("input.txt", "utf-8").split("\n")

currNode = {
    "name": "/",
    parent: undefined,
    size: BigInt(0),
}

dirmap= {

}

const getIdentifier = (dir) =>{
    if(dir.parent){
        return getIdentifier(dir.parent) + dir.name
    }
    return dir.name
}

const updateParents = (dir, quantity) =>{
    dir.size = dir.size + quantity
    dirmap[getIdentifier(dir)] = dir.size
    if(dir.parent){
        updateParents(dir.parent, quantity)
    }
}

for(let i=1; i<lines.length; i++){
   if(lines[i] == "$ ls"){
    }
    else if(lines[i].includes("dir")){
    }
   else if(lines[i].includes("cd ..")){
        currNode = currNode.parent
    }

    else if(lines[i].includes("$ cd")){
        cdToName = lines[i].split("$ cd")[1]
        newdir = {
            "name": cdToName,
            parent: currNode,
            size: BigInt(0)
        }
        currNode = newdir
    }
    else{
        quantity = BigInt(lines[i].split(" ")[0]);
        updateParents(currNode, quantity)
    }
}
// q1
console.log(Object.values(dirmap).filter((value) => {
    return value <= BigInt(100000)
}).reduce((t, n) => t+n, BigInt(0)))
//q2
console.log(Object.values(dirmap).filter((v) => (BigInt(70000000) - dirmap["/"] + v) >= BigInt(30000000)).sort()[0])