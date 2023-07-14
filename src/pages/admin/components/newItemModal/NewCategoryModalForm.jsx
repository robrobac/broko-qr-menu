import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db } from '../../../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

function NewCategoryModalForm({ handleAddingCategory, isDrink }) {
    const [category, setCategory] = useState("");

    //  Create new category
    const handleCategorySubmit = async (e) => {
        e.preventDefault();

        //  stop if there's no category name upon submit
        if (!category) return;

        try {  
            //  Create firestore path
            const path = isDrink ? "menu/drink/categories" : "menu/food/categories";

            //  Create custom category ID
            const id = category;
            const formattedId = id.replace(/\s/g, "").toLowerCase();
            const newId = formattedId.slice(0, 10) + Date.now();

            //  Store the category in the firestore
            await setDoc(doc(db, path, newId), {
                category: category,
                id: newId,
                dateCreated: Date.now(),
                dateEdited: Date.now(),
            });

            //  Reset form states
            setCategory("");
            handleAddingCategory();
        } catch (error) {
            console.error("error creating a new item", error);
        }
    };

  return (
    <Form id="newItemForm" onSubmit={handleCategorySubmit}>
        <Form.Group className="mb-3" id="categoryForm">
            <Form.Label htmlFor="inputCategory">New {isDrink ? "Drink" : "Food"} Category</Form.Label>
            <Form.Control
            autoFocus
            id='inputCategory'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit New {isDrink ? "Drink" : "Food"} Category
        </Button>
        <Button variant="secondary" onClick={handleAddingCategory}>
            Back
        </Button>
    </Form>
  );
}

export default NewCategoryModalForm;
