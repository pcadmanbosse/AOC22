const fs = require("fs")
const signal = fs.readFileSync("input.txt", "utf-8")

// q1 
for (let i = 0; i<signal.length -3; i++){
    if(new Set([signal[i], signal[i+1], signal[i+2], signal[i+3]]).size === 4){
        console.log(i+4);
        break;
    }
}

// q2 
for (let i = 0; i<signal.length - 13; i++){
    set = new Set()
    for(let b = 0; b<14; b++){
        set.add(signal[i+b])
    }
    if(set.size === 14){
        console.log(i+14);
        break;
    }
}