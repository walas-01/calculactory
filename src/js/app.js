import {addInputOption,createItemCard,createChildCard} from "./interface.js"
import {fetchItem,checkIfIsRawMaterial} from "./fetcher.js"

const form = document.querySelector("#form")
const tree = document.querySelector(".tree")

// ----------- [start] -

start()

// ----------------------------------------------------------------------------------- [events]

form.addEventListener("submit",async (event)=>{
    event.preventDefault()
    try{
        document.querySelector(".itemCard-container").innerHTML = ""

        const inItem = form.querySelector("#inItem").value
        const inAmount = Number(form.querySelector("#inAmount").value)
        
        const item = await fetchItem(inItem)

        await createItemCard(item,inAmount)
    }catch(err){
        console.log(err)
    }
})

tree.addEventListener("click",async (event)=>{
    if(event.target.classList.contains("button")){
        const button = event.target 

        /// 1- get item info of father item
        const itemName = button.parentElement.getAttribute("name")
        const item = await fetchItem(itemName)
        const rate = Number(button.getAttribute("rate"))

        /// 2- create space por children
        const ul = document.createElement("ul")
        button.parentElement.parentElement.appendChild(ul)

        /// 4- make card for each shild item AND add to the space
        item.inPerMin.forEach(async (element,i) => {
            const inputItem = await fetchItem(element.name)

            const childCard = await createChildCard(inputItem,item.inPerMin[i].amountPerMin * rate)
            ul.appendChild(childCard)
        })

        /// 5- remove button
        button.parentElement.removeChild(button)
    }
})

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