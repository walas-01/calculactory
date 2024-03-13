import {fetchItem} from "./fetcher.js"

export async function addInputOption(name, showName) { // --------------------------- addInputOption
    const option = document.createElement("option")
    option.value = name
    option.innerText = showName

    form.querySelector("#inItem").appendChild(option)
}



export async function createItemCard(item, output) { // ------------------------------------------------ createItemCard
    const productRate = Number((output / item.outPerMin[0].amountPerMin).toFixed(1))

    const div = document.createElement("div")

    // to get before creating
    const machineIcon = await getMachineIcon(item.machine)
    //-----

    const html = `
    <div class="card">
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
    </div>
    `
    div.innerHTML = html

    const tree = document.querySelector(".itemCard-container")

    tree.appendChild(div)

    return productRate
}


async function getMachineIcon(machineName){ // ---------------------- getMachineIcon
    const data = await fetch("/src/data/machines.json")
    const machineList = await data.json()

    const machine = machineList.find(mch => mch.name === machineName)

    return machine.img
}