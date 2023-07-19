import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { db } from '../../../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { Divider, Form, FormInput, FormLabel, FormSection } from '../../../../components/StyledForm';
import { EditButton, SubmitButton } from '../../../../components/StyledButtons';

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
                categoryPath: `${path}/${newId}`,
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
    <Form onSubmit={handleCategorySubmit}>
        <FormSection>
            <FormLabel htmlFor="inputCategory">New {isDrink ? "Drink" : "Food"} Category</FormLabel>
            <FormInput
            autoFocus
            required
            id='inputCategory'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
        </FormSection>
        <Divider></Divider>
        <SubmitButton type="submit">
            Submit New {isDrink ? "Drink" : "Food"} Category
        </SubmitButton>
        <EditButton onClick={handleAddingCategory}>
            Back
        </EditButton>
    </Form>
  );
}

export default NewCategoryModalForm;
