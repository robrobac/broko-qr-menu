import React, { useRef, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { collection, doc, query, setDoc } from 'firebase/firestore';

function NewCategoryForm({ handleClose, handleAddingCategory }) {
    const [category, setCategory] = useState("")

    const categoriesQuery = query(collection(db, "menu/food/categories"))
    const [docs, loading, error] = useCollectionData(categoriesQuery)


    const handleCategorySubmit = async (e) => {
        e.preventDefault();

        try {
            const path = `menu/food/categories`

            const id = category
            const formattedId = id.replace(/\s/g, "").toLowerCase();
            const newId = formattedId.slice(0, 10) + Date.now();

            await setDoc(doc(db, path, newId), {
                category: category,
                id: newId,
            })
            
            setCategory("")
            handleAddingCategory()

        } catch (error) {
            console.error("error creating a new item", error)
        }
    }

    return (
        <Form id="newItemForm" onSubmit={handleCategorySubmit}>

            <Form.Group className="mb-3" id="categoryForm">
                <Form.Label htmlFor="inputCategory">Category</Form.Label>
                <Form.Control
                autoFocus
                id='inputCategory'
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Button variant="secondary" onClick={handleAddingCategory}>
                Back
            </Button>
        </Form>
    )
}

export default NewCategoryForm
