
const form = document.querySelector("#form")


// ----------------------------------------------------------------------------------- [event]


form.addEventListener("submit",async (event)=>{
    event.preventDefault()
    try{
        console.log("[Click!]")
        
        await getItemChain("screw")

    }catch(err){
        console.log(err)
    }

})


// ---------------------------------------------------------------------------------- [ "database"]



async function getItem(itemName){
    const data = await fetch("/src/data/items.json")
    const itemList = await data.json()
    
    console.log("[Searching item. . .]")
    const item = itemList.find(itm => itm.name === itemName)

    const interface = new Interface
    interface.drawItemCard(item)

    return item
}



async function getItemChain(itemName){

    const data = await fetch("/src/data/items.json")
    const itemList = await data.json()
    
    const item = itemList.find(itm => itm.name === itemName)

    const interface = new Interface
        
    if(item.name !== "iron_ore"){ // [!] recursion
        interface.drawItemCard(item)
        getItemChain(item.inPerMin[0].name)
    }else{
        interface.drawItemCard(item)
    }
    
}



// --------------------------- [classes]

class Interface {
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

    async getCost(amountToProduce){
        return
    }

}

/*
    {
        "name": "Iron Ingot",
        "showName": "iron-ingot",
        "img":"src/imgs/Iron_Ingot.png",
        "machine": "smelter",
        "inPerMin": [
            {"name":"iron-ore","amountPerMin":30}
        ],
        "outPerMin": [
            {"name":"iron-ingot","amountPerMin":30}
        ]
    }
*/