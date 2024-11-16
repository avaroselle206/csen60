async function getTodos(){
    const response = await fetch("https://localhost:3000/api/todos")
    const data = await response.json()
    console.log(data, "\n")
    // console.log("getData finished")

    const ul = document.querySelector("ul")
    data.forEach(todo => {
        const li = document.createElement("li")
        li.textContent = todo.description
        ul.appendChild(li)
    })
}

getTodos()