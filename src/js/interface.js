import {checkIfIsRawMaterial} from "./fetcher.js"


export async function addInputOption(name, showName) { // --------------------------- addInputOption
    const option = document.createElement("option")
    option.value = name
    option.innerText = showName
    form.querySelector("#inItem").appendChild(option)
}


 // ----------------------------------------------------------------------------------------------- [createItemCard]

export async function createItemCard(item, output) {
    const productRate = Number((output / item.outPerMin[0].amountPerMin).toFixed(1))

    console.log("---------------------------------------")
    console.log(`[desired output of ${item.showName}]: ${output}`)
    console.log(`[With producRate of 1 of ${item.showName} is]: ${item.outPerMin[0].amountPerMin}`)
    console.log(`[producRate of ${item.showName}]: ${productRate}`)

    const liCard = document.createElement("li")

    let mayBeButton = ``

    if(checkIfIsRawMaterial(item.name)){
        mayBeButton = `<button class="button" rate="${productRate}">[ + ]</button>`
    }

    // to get before creating
    const machineIcon = await getMachineIcon(item.machine)
    //-----

    const html = `
        <div class="card" name="${item.name}">
            <div class="card-img">
                <h5>${item.showName}</h5>
                <img  class="card-img-icon" src="${item.img}" alt="${item.name}">
            </div>
            <div class="card-output">
                <img src="/src/imgs/icons/icon_out.png" alt="outputIcon">
                <h5>${output.toFixed(1)}</h5>
                <p>/min</p>
            </div>
            <div class="card-machine">
                <img src="${machineIcon}" alt="${item.machine}">
                <p>${productRate}</p>
            </div>
            ${mayBeButton}
        </div>
    `
    liCard.innerHTML = html

    const tree = document.querySelector(".itemCard-container")

    tree.appendChild(liCard)
}

 // ----------------------------------------------------------------------------------------------- [createChildCard]


export async function createChildCard(item, output) {
    const productRate = Number((output / item.outPerMin[0].amountPerMin).toFixed(1))

    console.log("---------------------------------------")
    console.log(`[desired output of ${item.showName}]: ${output}`)
    console.log(`[With producRate of 1 of ${item.showName} is]: ${item.outPerMin[0].amountPerMin}`)
    console.log(`[producRate of ${item.showName}]: ${productRate}`)

    const liCard = document.createElement("li")

    let mayBeButton = ``


    if(checkIfIsRawMaterial(item.name)){
        mayBeButton = `<button class="button" rate="${productRate}">[ + ]</button>`
    }

    // to get before creating
    const machineIcon = await getMachineIcon(item.machine)
    //-----


    const html = `
        <div class="card" name="${item.name}">
            <div class="card-img">
                <h5>${item.showName}</h5>
                <img  class="card-img-icon" src="${item.img}" alt="${item.name}">
            </div>
            <div class="card-output">
                <img src="/src/imgs/icons/icon_out.png" alt="outputIcon">
                <h5>${(output).toFixed(1)}</h5>
                <p>/min</p>
            </div>
            <div class="card-machine">
                <img src="${machineIcon}" alt="${item.machine}">
                <p>${productRate.toFixed(1)}</p>
            </div>
            ${mayBeButton}
        </div>
    `
    liCard.innerHTML = html

    /// return liCard
    return liCard
}



async function getMachineIcon(machineName){ // ---------------------- getMachineIcon
    const data = await fetch("/src/data/machines.json")
    const machineList = await data.json()
    const machine = machineList.find(mch => mch.name === machineName)
    return machine.img
}