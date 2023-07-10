import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

function NewDrinkCategoryModalForm({ handleAddingCategory }) {
    const [category, setCategory] = useState("")




    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        if (!category) return

        try {
            const path = `menu/drink/categories`

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
                <Form.Label htmlFor="inputCategory">New Drink Category</Form.Label>
                <Form.Control
                autoFocus
                id='inputCategory'
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit New Drink Category
            </Button>
            <Button variant="secondary" onClick={handleAddingCategory}>
                Back
            </Button>
        </Form>
    )
}

export default NewDrinkCategoryModalForm
