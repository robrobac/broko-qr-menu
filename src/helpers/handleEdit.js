import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

//  Handles edit for item passed as an argument from ProductCard.jsx
export const handleEdit = async (itemObject, itemPath) => {
    try {
        //  Getting document ref from argument passed from ProductCard.jsx
        const docRef = doc(db, itemPath)
        //  Update the item and close the form
        await updateDoc(docRef, itemObject)

        //  Update lastedited timestamp to handle fetching from firestore or local storage.
        await updateDoc(doc(db, "/menu/additional"), { lastedited: Date.now() })

    } catch (error) {
        console.error(error);
    }
}