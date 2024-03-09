

async function addInputOption(name, showName) { // --------------------------- addInputOption
    const option = document.createElement("option")
    option.value = name
    option.innerText = showName

    form.querySelector("#inItem").appendChild(option)
}



async function createItemCard(item, output) { // ------------------------------------------------ createItemCard
    const productRate = Number((output / item.outPerMin[0].amountPerMin).toFixed(1))

    const itemCard_bellow = document.createElement('div') 
    itemCard_bellow.classList = "itemCard-bellow"

    item.inPerMin.forEach(async (element) => {
        
        const inItem = await fetchItem(element.name)
        
        const DIVinputItem = document.createElement('div')
        DIVinputItem.classList = "input-item"

        const innerHTML = `
        <div class="flex-row item-flow">
        <img src="/src/imgs/icons/icon_in.png" alt="input_img">
        <h3>${Number((element.amountPerMin * productRate).toFixed(0))}</h3>
        <p class="red">/min</p>
        </div>
        <img src="${inItem.img}" alt="img_item">
        <p>${inItem.showName}</p>`
        
        DIVinputItem.innerHTML = innerHTML
        itemCard_bellow.appendChild(DIVinputItem)
    })
    
    const machineImg = await getMachineIcon(item.machine)

    const html = `
        <div class="itemCard-above flex-row">
            <div class="above-item">
                <p>${item.showName}</p>
                <img src="${item.img}" alt="${item.name}">
            </div>
            
            <div class="above-amount">
                <div class="flex-row item-flow">
                    <img src="/src/imgs/icons/icon_out.png" alt="input_img">
                    <h1>${output}</h1>
                    <p class="red">/min</p>
                </div>
                <div class="flex-row">
                    <img src="${machineImg}" alt="machine_icon">
                    <h1>${productRate}</h1>
                </div>
            </div>
        </div>`

    const itemCard = document.createElement("div")
    itemCard.classList = "itemCard"
    itemCard.innerHTML = html

    const itemCardContainer = document.querySelector(".itemCard-container")

    itemCardContainer.appendChild(itemCard)

    itemCard.appendChild(itemCard_bellow)

    return productRate
}