process.stdout.write("Enter the String: ")
process.stdin.on('data', data=>{
    let st = data.toString().trim()
    let newSt = ''
    for(let i=0; i<st.length; i++){
        if(st.charCodeAt(i) % 2 === 0){
            newSt += st[i].toLowerCase()
        }else{
            newSt += st[i].toUpperCase()
        }
    }
    
    console.log(newSt)

    process.exit()
})