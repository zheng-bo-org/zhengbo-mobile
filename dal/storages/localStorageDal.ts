/**
 * Abstraction for localStorage.
 * 
 */
interface LocalStorage<T extends {}, kType, vPossibleTypes> {

    //get all items.
    get: () => T
    //get the item of the key
    getItem: (key: kType) => vPossibleTypes
    
    //remove the item of the key
    remove: (key: kType) => void

    //update the item of the key and return previos value of the key.
    update: (key: kType, value: vPossibleTypes) => vPossibleTypes
}