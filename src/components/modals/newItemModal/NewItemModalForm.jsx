import React, { useRef, useState } from 'react';
import { db, storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, query, setDoc, updateDoc } from 'firebase/firestore';
import Compressor from 'compressorjs';
import NewCategoryModalForm from './NewCategoryModalForm';
import noimage from "../../../noimage.png"
import { Divider, Form, FormInput, FormLabel, FormSection, FormSelect, FormTextarea, FormUpload, PriceConversion } from '../../styledComponents/StyledForm';
import { AddCategoryButton, SubmitButton } from '../../styledComponents/StyledButtons';

function NewItemModalForm({ isDrink }) {
    const [title, setTitle] = useState("");
    const [priceEUR, setPriceEUR] = useState("");
    const [priceKN, setPriceKN] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [compressedFile, setCompressedFile] = useState(null);
    const [addingCategory, setAddingCategory] = useState(false);

    const fileInputRef = useRef(null);

    const categoriesPath = isDrink ? "menu/drink/categories" : "menu/food/categories";
    const itemsPath = isDrink ? "menu/drink" : "menu/food";

    //  Live show categories in new item form, handling showing new category right after creating it.
    const categoriesQuery = query(collection(db, categoriesPath));
    const [categories] = useCollectionData(categoriesQuery);

    //  Compressing the image before upload to Firebase
    const handleCompressedImage = (e) => {
        const image = e.target.files[0];
        new Compressor(image, {
            quality: 0.6,
            maxWidth: 425,
            success: (compressedResult) => {
                setCompressedFile(compressedResult);
            }
        });
    };

    //  Eur to Kn converter
    const eurToKn = (e) => {
        const tecaj = 7.53450;
        const eur = e;
        const kn = (eur * tecaj).toFixed(2);

        setPriceEUR(eur);
        setPriceKN(kn);
    };

    //  Handle submitting item to Firestore
    const handleFileSubmit = async (e) => {
        e.preventDefault();
        //  If no image is selected, set the dummy image url.
        let url = noimage
        let filePath = ""
        
        //  if image is selected and compressed.
        if (compressedFile) {
            //  Get firebase storage path and filename
            const path = `images/${compressedFile.name + Date.now()}`
            filePath = path
            const fileRef = ref(storage, path);
            
            try {
                // upload it to Firebase and get its url.
                const snapshot = await uploadBytes(fileRef, compressedFile);
                url = await getDownloadURL(snapshot.ref);
            } catch (error) {
                console.log(error)
            }
        }

        try {
            //  Create firestore path
            const path = `${itemsPath}/categories/${category}/items`;

            //  Create custom item ID
            const id = title;
            const formattedId = id.replace(/\s/g, "").toLowerCase();
            const newId = formattedId.slice(0, 10) + Date.now();

            //  Store the item in the firestore
            await setDoc(doc(db, path, newId), {
                title: title,
                priceEUR: parseFloat(priceEUR),
                priceKN: priceKN,
                mainCategory: isDrink ? "drink" : "food",
                category: category,
                description: description,
                fileUrl: url,
                filePath: filePath,
                id: newId,
                fullPath: `${itemsPath}/categories/${category}/items/${newId}`,
                dateCreated: Date.now(),
                dateEdited: Date.now(),
            });

            //  Reset form states
            setTitle("");
            setPriceEUR("");
            setPriceKN("");
            setCategory("");
            setDescription("");
            setCompressedFile(null)
            fileInputRef.current.value = null;
            // handleClose();

            //  Update lastedited timestamp to handle fetching from firestore or local storage.
            await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})

        } catch (error) {
            console.error("error creating a new item", error);
        }
    };

    //  Handling addingCategory state, if it's true the new category modal will appear
    const handleAddingCategory = () => {
        setAddingCategory(!addingCategory);
    };
    
    return (
        <div>
            {!addingCategory ? 
                <Form id="newItemForm" onSubmit={handleFileSubmit}>
                    <FormSection>
                        <FormLabel htmlFor="inputTitle">
                            {isDrink ? "Drink" : "Food"} Title
                        </FormLabel>
                        <FormInput
                        required
                        type="text"
                        id="inputTitle"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    </FormSection>
                    <Divider></Divider>
                    <FormSection>
                        <FormLabel htmlFor="inputPrice">
                            {isDrink ? "Drink" : "Food"} Price
                        </FormLabel>
                        <FormInput
                        required
                        type="number"
                        id="inputPrice"
                        placeholder="Price"
                        value={priceEUR}
                        onChange={(e) => eurToKn(e.target.value)}/>
                        <PriceConversion>{priceEUR} € x 7.53450 = <span style={{ fontWeight: 'bold' }}>{priceKN} kn</span></PriceConversion>
                    </FormSection>
                    <Divider></Divider>
                    <FormSection>
                        <FormLabel htmlFor="selectCategory">
                            {isDrink ? "Drink" : "Food"} Category
                            <AddCategoryButton type='button' onClick={handleAddingCategory}>
                                Add New {isDrink ? "Drink" : "Food"} Category
                            </AddCategoryButton>    
                        </FormLabel>
                        <FormSelect
                        required
                        id='selectCategory'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        >
                            <option key="0"></option>
                            {categories?.map((option) => (
                                <option
                                active={category === option.category ? 1 : 0}
                                value={option.id}
                                name={option.id}
                                key={option.id}>
                                    {option.category}
                                </option>
                            ))}
                        </FormSelect>
                    </FormSection>
                    <Divider></Divider>
                    <FormSection>
                        <FormLabel htmlFor="inputDescription">
                            {isDrink ? "Drink" : "Food"} Description
                        </FormLabel>
                        <FormTextarea
                        id="inputDescription"
                        form='newItemForm'
                        placeholder="Description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                    </FormSection>
                    <Divider></Divider>
                    <FormSection>
                        <FormLabel htmlFor="inputFile">
                            Upload Image
                        </FormLabel>
                        <FormUpload
                        type="file"
                        accept='image/*'
                        id="inputFile"
                        ref={fileInputRef}
                        onChange={handleCompressedImage}/>
                    </FormSection>
                    <Divider></Divider>
                    <SubmitButton type="submit">
                        Submit New {isDrink ? "Drink" : "Food"}
                    </SubmitButton>
                </Form>
            :
            isDrink ? (
                <NewCategoryModalForm handleAddingCategory={handleAddingCategory} isDrink={true}/>
            ) : (
                <NewCategoryModalForm handleAddingCategory={handleAddingCategory} isDrink={false}/>
            )
            }
        </div>
    );
}

export default NewItemModalForm;