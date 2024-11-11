//this code runs synchronously
function showData() {
    console.log("showData function finished")
}

//this code runs asynchronously
async function getRandomFact(){
const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
const data = await response.json()
console.log(data.text, "\n")
console.log("getData finished")
}

async function getTodaysFact(){
    const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/today")
    const data = await response.json()
    console.log(data.text, "\n")
    //console.log("getData finished")
}

getRandomFact()
getTodaysFact()

//getData()
//showData()