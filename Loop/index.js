const util = require('util')

console.log("Enter a Number: ")
process.stdin.on('data', data=>{
    if(!isNaN(data)){
        let star = "*"
        console.log(star.padStart(42, "*"))
        for(let i=1;i<=10;i++){
            let abc = util.format("%d * %d = %d",i,data, Number(data)*i)
            abc.padStart(25, "-")
            // abc.padEnd(5, "-")
            console.log("*" + abc.padStart(20) + abc.padEnd(20) + "*")
        }
        console.log(star.padEnd(42, "*"))
    }else{
        console.log('Enter a valid Number.')
    }

    process.exit()
})