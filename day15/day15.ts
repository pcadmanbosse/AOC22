const fs = require("fs")

const inputs = fs.readFileSync("input.txt", "utf-8").split("\n").map((l: string) => {
    const [_, sensorX, sensorY, beaconX, beaconY]: any = l.match(/Sensor at x=(.*), y=(.*): closest beacon is at x=(.*), y=(.*)/)
    const manhattan = Math.abs(parseInt(sensorY)-parseInt(beaconY))+Math.abs(parseInt(sensorX)-parseInt(beaconX))
    return {sensorX: parseInt(sensorX), sensorY: parseInt(sensorY), beaconX: parseInt(beaconX), beaconY: parseInt(beaconY), manhattan}
})

const manhattan = (x1: number, y1: number, x2: number, y2: number) =>{
    return Math.abs(y2-y1) + Math.abs(x2-x1)
}

//Q1
const rowY=2000000
const distinct_overlaps = new Set<number>()
inputs.forEach((input: any) =>{
    let startX = input.sensorX - input.manhattan + Math.abs(rowY - input.sensorY)
    const endX = input.sensorX + input.manhattan  - Math.abs(rowY - input.sensorY)
    for(let x = startX; x<=endX; x++){
        distinct_overlaps.add(x)
    }
})
inputs.forEach((element:any) => {
    if(element.beaconY === rowY && distinct_overlaps.has(element.beaconX)){
        distinct_overlaps.delete(element.beaconX)
    }
});
console.log(distinct_overlaps.size)

//Q2
const boundTop= 4000000
// return {sensorX: parseInt(sensorX), sensorY: parseInt(sensorY), beaconX: parseInt(beaconX), beaconY: parseInt(beaconY), manhattan}

let result = {x: 0, y:0};
inputs.forEach((i:any) => {
    for(let y = Math.max(i.sensorY - i.manhattan, 0); y<=Math.min(i.sensorY + i.manhattan, boundTop); y++){
        let radius = i.manhattan - Math.abs((i.sensorY-y))
        const left = Math.max(i.sensorX - radius  -1, 0)
        const right = Math.min(i.sensorX + radius +1, boundTop)

        if(!inputs.find((input: any) =>{
            return manhattan(input.sensorX, input.sensorY, left, y) <= input.manhattan
        })){
            result = {x: left, y}
        }
        if(!inputs.find((input: any) =>{
           return manhattan(input.sensorX, input.sensorY, right, y) <= input.manhattan
        })){
            result = {x:right, y}
        }
    }
})

console.log((result.x*boundTop)+ result.y)