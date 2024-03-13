import {addInputOption,createItemCard,createChildCard} from "./interface.js"
import {fetchItem,checkIfIsRawMaterial} from "./fetcher.js"

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
    }catch(err){
        console.log(err)
    }
})

tree.addEventListener("click",async (event)=>{
    if(event.target.classList.contains("button")){
        const button = event.target 

        /// 1- get item 
        const itemName = button.parentElement.getAttribute("name")

        /// 2- create space por children
        const ul = document.createElement("ul")
        button.parentElement.parentElement.appendChild(ul)
        
        /// 3- remove button
        button.parentElement.removeChild(button)

        /// 4- get item info
        const item = await fetchItem(itemName)

        /// 5- make card for each inPerMin item AND add to the space
        item.inPerMin.forEach(async (element,i) => {
            const inputItem = await fetchItem(element.name)
            const childCard = await createChildCard(inputItem,item.inPerMin[i].amountPerMin)

            ul.appendChild(childCard)
        })
    }
})

// ---------------------------------------------------------------------------------- [ main"]


async function drawItemCard(itemName,amountToProduce){
    const item = await fetchItem(itemName)

    await createItemCard(item,amountToProduce)
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