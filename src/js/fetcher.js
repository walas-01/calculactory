export async function fetchItem(itemName){
    const data = await fetch("/src/data/items.json")
    const itemList = await data.json()
    const item = itemList.find(itm => itm.name === itemName)

    return item
}