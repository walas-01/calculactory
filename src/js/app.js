const form = document.querySelector("#form")

// ----------- [start] -

start()

// ----------------------------------------------------------------------------------- [event]

form.addEventListener("submit",async (event)=>{
    event.preventDefault()
    try{

        document.querySelector(".itemCard-container").innerHTML = ""
        
        getItemChain(form.querySelector("#inItem").value,form.querySelector("#inAmount").value)

    }catch(err){
        console.log(err)
    }
})

// ---------------------------------------------------------------------------------- [ "database"]

async function getItem(itemName,amount){
    const data = await fetch("/src/data/items.json")
    const itemList = await data.json()
    
    const item = itemList.find(itm => itm.name === itemName)

    const ui = new Interface()
    ui.createItemCard(item,amount)
}

async function getItemChain(itemName,amountToProduce){ 

    const data = await fetch("/src/data/items.json")
    const itemList = await data.json()
    
    const item = itemList.find(itm => itm.name === itemName)

    const interface = new Interface
        
    if(checkIfIsRawMaterial(item.name)){ // [!] recursion
        interface.createItemCard(item,amountToProduce)

        console.log("[!] Checkpoint!")
        item.inPerMin.forEach((element) => { //? /////////////////////////////////////////////////////// [label]
            // getItemChain(element.name, amount)
        });
        
    }
}

// --------------------------- [others]

async function start(){
    const data = await fetch("/src/data/items.json")
    const itemList = await data.json()

    itemList.forEach((item) => {
        if(checkIfIsRawMaterial(item.name)){
            const ui = new Interface()
    
            ui.addInputOption(item.name,item.showName)

        }
    });
}

function checkIfIsRawMaterial(name){
    if(name !== "iron_ore" && name !== "copper_ore" && name !== "limestone" && name !== "coal" && name !== "caterium_ore" && name !== "crude_oil" && name !== "water" && name !== "uranium" && name !== "sulfur" && name !== "raw_crystal"  && name !== "biomass_from_leaves" && name !== "biomass_from_wood"){ 
        return true
    }else{
        return false
    }
}

async function getMachineIcon(machineName){
    const data = await fetch("/src/data/machines.json")
    const machineList = await data.json()

    const machine = machineList.find(mch => mch.name === machineName)

    return machine.img
}

// --------------------------- [classes]

class Interface {

    async addInputOption(name,showName){
        const option = document.createElement("option")
        option.value = name
        option.innerText = showName

        form.querySelector("#inItem").appendChild(option)
    }

    async createItemCard(item,output){
        const productRate = Number((output/item.outPerMin[0].amountPerMin).toFixed(1))

        const itemCard_bellow = document.createElement('div')
        itemCard_bellow.classList = "itemCard-bellow"

        const machineImg = await getMachineIcon(item.machine)

        item.inPerMin.forEach(async (element,i)=>{

            const data = await fetch("/src/data/items.json")
            const itemList = await data.json()
            const inItem = itemList.find(itm => itm.name === element.name)

            


            const div = document.createElement('div')
            const innerHTML = `
            <div class="input-item">
                <div class="flex-row item-flow">
                    <img src="/src/imgs/icons/icon_in.png" alt="input_img">
                    <h3>${Number((element.amountPerMin*productRate).toFixed(0))}</h3>
                    <p class="red">/min</p>
                </div>
                <img src="${inItem.img}" alt="img_item">
                <p>${inItem.showName}</p>
            </div>`

            div.innerHTML = innerHTML
            itemCard_bellow.appendChild(div)
        })

        const html = `<div class="itemCard">

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
        </div>
    </div>`

        const div = document.createElement("div")
        div.innerHTML = html

        const container = document.querySelector(".itemCard-container")
        
        container.appendChild(div)
        
        document.querySelector(".itemCard").appendChild(itemCard_bellow)
    }

    drawItemCard(itemObject){
        const body = document.querySelector(".itemCard-container")
    
        const div = document.createElement("div")

        const img = document.createElement("img")
        img.src = itemObject.img

        const h6 = document.createElement("h6")
        h6.innerText = itemObject.showName
    
        div.appendChild(img)
        div.appendChild(h6)

        body.appendChild(div)
    }

    drawOreCard(oreObject){ //diferent becouse it has no inputPerMinute
        return 
    }
}

class Item {
    constructor(name,showName,img,machine,inPerMinute,outPerMinute){
        this.name = name
        this.showName = showName
        this.img = img
        this.machine = machine
        this.inPerMinute = inPerMinute
        this.outPerMinute = outPerMinute
    }
}
