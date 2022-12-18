const fs = require("fs")

const buildValves = () =>{
    return fs.readFileSync("input.txt", "utf-8").split("\n").reduce((map, v) => {
        const [_, valveName, flowRate, accessible] = v.match(/Valve (.*) has flow rate=(.*); tunnel[s]* lead[s]* to valve[s]* (.*)/);
        return {...map,
            [valveName]:{
            valveName,
            flowRate: parseInt(flowRate),
            accessible: accessible.split(", "),
        }
        }}, {});
}

//Q1
valves = buildValves()
let openableVales = Object.values(valves).filter(v => v.flowRate > 0).map(v => v.valveName)

let next =
    [
    {...valves["AA"], timer: 0, willOutput: 0, open: []}
    ]
let maxTotal = 0;
let maxRoute = [];
let counter = 0;
while(next.length > 0){
    counter++;
    if(counter %10000 ===0){
        console.log({counter, maxTotal, maxRoute, left: next.length})
    }
    let nextValve = next.pop()
    if(nextValve.timer > 30){
        continue;
    }

    let timer = nextValve.timer
    const remainingToOpen = openableVales.filter(vale => !nextValve.open.find(v=> v===vale)).map(v => valves[v].flowRate).sort((a, b)=> b-a);
    // best possible scenario

    let potentialMax = remainingToOpen.reduce((total, i, index) =>{
        return total + i*Math.max((30-timer-2*(index+1)),0)
    }, nextValve.willOutput)
    if(maxTotal > potentialMax){
        continue;
    }
    if(nextValve.willOutput > maxTotal){
        maxTotal = nextValve.willOutput
        maxRoute = nextValve.open
    }
    next = [ ...next,...nextValve.accessible.flatMap((v) => {
            let nextValves = [];
            let childVale = {...valves[v], open: nextValve.open, timer: nextValve.timer, willOutput: nextValve.willOutput}
            if(!childVale.open.find(v => v===childVale.valveName)){
                nextValves.push(

                    {...childVale, open: [...childVale.open, childVale.valveName], timer: timer+2, willOutput: nextValve.willOutput + childVale.flowRate*(30-timer-2)}
                )
            }
                nextValves.push(
                    {...childVale, timer: timer+1}
                )

            return nextValves
        }
    )]
}

console.log(maxTotal)
console.log(maxRoute)
