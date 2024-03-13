export async function fetchItem(itemName){
    const data = await fetch("/src/data/items.json")
    const itemList = await data.json()
    const item = itemList.find(itm => itm.name === itemName)

    return item
}


export function checkIfIsRawMaterial(name){
    if(name !== "iron_ore" && name !== "copper_ore" && name !== "limestone" && name !== "coal" && name !== "caterium_ore" && name !== "crude_oil" && name !== "water" && name !== "uranium" && name !== "sulfur" && name !== "raw_quartz"  && name !== "biomass_from_leaves" && name !== "biomass_from_wood"){ 
        return true
    }else{
        return false
    }
}