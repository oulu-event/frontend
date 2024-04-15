process.stdout.write("Enter the height of the triangle: ")
process.stdin.on("data", data=>{
    for(let i=1; i<=Number(data);i++){
        let star = ""
        for(let c=0;c<i;c++){
            star = star + "*"
        }
        console.log(`${star}`)
    }

    process.exit()
})