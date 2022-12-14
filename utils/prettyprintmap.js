var fs = require('fs')

const prettyprintmap = (map) =>{
    for(let y = 0; y<map.length; y++){
        let row=''
        for(let x=0; x<map[0].length; x++){
            row+=map[y][x]
        }
        console.log(row)
    }
}

const prettyprintmaptofile = (map, file) =>{
    fs.writeFile(file, map.map(r => r.join("")).join("\n"), () =>{})
}

module.exports = {prettyprintmap, prettyprintmaptofile}