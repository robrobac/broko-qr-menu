import React from 'react'
import { AdminButtons } from './styledComponents/StyledCard'
import { UpDownButton } from './styledComponents/StyledButtons'
import { ReactComponent as UpIcon } from "../icons/upicon.svg";
import { ReactComponent as DownIcon } from "../icons/downicon.svg";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getMiddleValue } from '../helpers/getMiddleValue';

function ReorderProduct({item, itemIndex, category}) {
    const itemsLength = category?.items?.length - 1;

    //  Handling manual item ordering with buttons UP and DOWN
    const handleReorderProduct = async (item, direction) => {
        

        //  Getting moving item index and firebase ref
        const itemIndex = category?.items.findIndex(doc => doc.id === item.id )
        const docRef = doc(db, category?.items[itemIndex].fullPath)

        //  If one item in array, do nothing.
        if (category?.items.length <= 1) {
            return
        }

        //  Handling move UP
        if (direction === "up") {

            //  If moving item is first, don't move UP
            if (itemIndex === 0) {
                return
            }

            //  If moving item is second in array
            if (itemIndex === 1) {
                const prevOrder1 = category?.items[1 - 1].orderTimestamp
                const middleValue = getMiddleValue(0, prevOrder1)
                //  Saving current scroll position to handle "scroll lock"
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }

            //  If moving item is neither first nor second in array
            if (itemIndex >= 2) {
                const prevOrder1 = category?.items[itemIndex - 1].orderTimestamp
                const prevOrder2 = category?.items[itemIndex - 2].orderTimestamp
                const middleValue = getMiddleValue(prevOrder1, prevOrder2)
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }

        //  Handling move DOWN
        } else if (direction === "down") {

            //  If moving item is last in the array
            if (itemIndex === itemsLength) {
                return
            }

            //  If moving item is second to last in the array
            if (itemIndex === itemsLength - 1) {
                const prevOrder1 = category?.items[itemsLength].orderTimestamp
                const middleValue = prevOrder1 + 10
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }

            //  If moving item is neither last nor second to last in the array
            else {
                const prevOrder1 = category?.items[itemIndex + 1].orderTimestamp
                const prevOrder2 = category?.items[itemIndex + 2].orderTimestamp
                const middleValue = getMiddleValue(prevOrder1, prevOrder2)
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <AdminButtons>
            <UpDownButton $isActive={itemIndex === 0}>
                <UpIcon height="100%" onClick={() => handleReorderProduct(item, "up")}/>
                </UpDownButton>
            <UpDownButton $isActive={itemIndex === itemsLength}>
                <DownIcon height="100%" onClick={() => handleReorderProduct(item, "down")}/>
            </UpDownButton>
        </AdminButtons>
    )
}

export default ReorderProduct
