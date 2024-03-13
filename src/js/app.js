import {addInputOption,createItemCard} from "./interface.js"
import {fetchItem} from "./fetcher.js"

const form = document.querySelector("#form")
const tree = document.querySelector(".tree")

// ----------- [start] -

start()

// ----------------------------------------------------------------------------------- [event]

form.addEventListener("submit",async (event)=>{
    event.preventDefault()
    try{
        document.querySelector(".itemCard-container").innerHTML = ""

        const inItem = form.querySelector("#inItem").value
        const inAmount = Number(form.querySelector("#inAmount").value)
        
        drawItemCard(inItem,inAmount)
        //getItemChain(inItem,inAmount)

    }catch(err){
        console.log(err)
    }
})

tree.addEventListener("click",async (event)=>{
    console.log(event.target.parentElement)

    if(event.target.classList.contains("card") || event.target.parentElement.classList.contains("card")){
        const h1 = document.createElement("h1")
        h1.innerText = "SEXO"
    
        event.target.appendChild(h1)
    }
})

// ---------------------------------------------------------------------------------- [ main"]


async function drawItemCard(itemName,amountToProduce){
    const item = await fetchItem(itemName)

    await createItemCard(item,amountToProduce)
}




async function getItemChain(itemName,amountToProduce){ 

    const item = await fetchItem(itemName)
        
    if(checkIfIsRawMaterial(item.name)){ // [!] recursion
        const productRate = await createItemCard(item,amountToProduce)

        item.inPerMin.forEach((element) => { // forEach

            getItemChain(element.name, element.amountPerMin * productRate)
        });
        
    }
}


// --------------------------------------------------- [methods]

async function start(){
    const data = await fetch("/src/data/items.json")
    const itemList = await data.json()

    itemList.forEach((item) => {
        if(checkIfIsRawMaterial(item.name)){
    
           addInputOption(item.name,item.showName)

        }
    });
}

function checkIfIsRawMaterial(name){
    if(name !== "iron_ore" && name !== "copper_ore" && name !== "limestone" && name !== "coal" && name !== "caterium_ore" && name !== "crude_oil" && name !== "water" && name !== "uranium" && name !== "sulfur" && name !== "raw_quartz"  && name !== "biomass_from_leaves" && name !== "biomass_from_wood"){ 
        return true
    }else{
        return false
    }
}