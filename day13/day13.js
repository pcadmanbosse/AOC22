const fs = require("fs")
pairs = fs.readFileSync("input.txt", "utf-8").split("\n\n").map(p => p.split("\n"))

const preparePacket = (packet) =>{
    return packet.split(/,|(\[|\])/g).filter(c => c!= undefined && c!=='').map(chunk =>{
        if(chunk.match("^[0-9]*$")){
            return parseInt(chunk);
        }
        return chunk;
    })
}

const makeStack = (packet) =>{
    const stack = []
    let currTop = stack;
    let prevTop = [stack];
    for(let c = 0; c < packet.length; c++){
        if(typeof packet[c] == "number"){
            currTop.push(packet[c])
        }
        else if(packet[c] == "["){
            let newTop = []
            currTop.push(newTop)
            prevTop.push(currTop)
            currTop = newTop
        }
        else if(packet[c] == "]"){
            currTop = prevTop.pop()
        }
    }
    return stack;
}

// -1 if p2 bigger, 1 if p2 smaller, 0 if equal
const compare = (left, right) =>{
    if(left == undefined  || right==undefined){
        return 0
    }
    if(typeof left == "number" && typeof right == "number"){
        if(left < right){
            return -1;
        }
        if(left > right){
            return 1;
        }
        return 0;
    }
    let adaptedLeft = left;
    let adaptedRight = right;
    if(!Array.isArray(left)){
        adaptedLeft = [left]
    }
    if(!Array.isArray(right)){
        adaptedRight = [right]
    }
    let i = 0;
    let currentComparaison = compare(adaptedLeft[i], adaptedRight[i])
    while(currentComparaison == 0 && i<Math.min(adaptedLeft.length, adaptedRight.length)){
        i++;
        currentComparaison = compare(adaptedLeft[i], adaptedRight[i])
    }
    if(currentComparaison !== 0){
        return currentComparaison;
    }
    if(adaptedLeft.length> adaptedRight.length){
        return 1;
    }
    if(adaptedRight.length> adaptedLeft.length){
        return -1;
    }
    return 0;

}

//q1
let orderedPairs = [];
pairs.forEach((pair, index) =>{
if(compare(makeStack(preparePacket(pair[0])), makeStack(preparePacket(pair[1]))) < 0){
    orderedPairs.push(index+1);
}
})
console.log(orderedPairs.reduce((t, s) => t+s, 0))

//q2
const allPackets = [...pairs.flat().map((packet) => makeStack(preparePacket(packet))[0]), [[2]], [[6]]].sort((a, b) => compare(a, b));
const index2 = allPackets.findIndex((p) => p.length == 1 && p[0].length == 1 && p[0] == 2)
const index6 = allPackets.findIndex((p) => p.length == 1 && p[0].length == 1 && p[0] == 6)
console.log(index2)
console.log((index2 +1)*(index6+1))
