import React, { useState } from 'react';
import { db } from '../../../firebase/config';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { Divider, Form, FormInput, FormLabel, FormSection } from '../../styledComponents/StyledForm';
import { BackButton, SubmitButton } from '../../styledComponents/StyledButtons';
import { useTranslation } from 'react-i18next';

function NewCategoryModalForm({ handleAddingCategory, isDrink }) {
    const [category, setCategory] = useState("");
    const [categoryEng, setCategoryEng] = useState("");
    
    const { t, i18n } = useTranslation()

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
                categoryEng: categoryEng,
                categoryPath: `${path}/${newId}`,
                id: newId,
                dateCreated: Date.now(),
                dateEdited: Date.now(),
                orderTimestamp: Date.now()
            });

            //  Reset form states
            setCategory("");
            setCategoryEng("");
            handleAddingCategory();

            //  Update lastedited timestamp to handle fetching from firestore or local storage.
            await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})

        } catch (error) {
            console.error(error);
        }
    };

  return (
    <Form onSubmit={handleCategorySubmit}>
        <FormSection>
            <FormLabel htmlFor="inputCategory">
                {t("New Category Title")}
            </FormLabel>
            <FormInput
            autoFocus
            required
            placeholder={t("Title")}
            id='inputCategory'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
            <FormInput
            placeholder={t("English Title")}
            id='inputCategory'
            value={categoryEng}
            onChange={(e) => setCategoryEng(e.target.value)}
            />
        </FormSection>
        <Divider></Divider>
        <SubmitButton type="submit">
            {t("Save New Category")}
        </SubmitButton>
        <BackButton onClick={handleAddingCategory}>
            {t("Back")}
        </BackButton>
    </Form>
  );
}

export default NewCategoryModalForm;
