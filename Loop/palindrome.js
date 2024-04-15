process.stdout.write("Please enter a word: ")
process.stdin.on("data", data=>{
    let word = data.toString().trim().replace(/\s+/g, '').toLowerCase()
    let reverseword = ""; 
    for(let i=word.length-1;i>=0;i--){
        reverseword = reverseword + word.charAt(i)
    }

    if(word == reverseword){
        console.log('yes it is palindarome')
    }else{
        console.log("no it is not palindrome")
    }

    process.exit()
})
