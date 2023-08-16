import React, { useRef, useState } from 'react';
import { db, storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, query, setDoc, updateDoc } from 'firebase/firestore';
import Compressor from 'compressorjs';
import NewCategoryModalForm from './NewCategoryModalForm';
import noimage from "../../../noimage.png"
import { Divider, Form, FormInput, FormLabel, FormSection, FormSelect, FormTextarea, FormUpload, PriceConversion, UploadedImage } from '../../styledComponents/StyledForm';
import { AddCategoryButton, SubmitButton } from '../../styledComponents/StyledButtons';
import { useTranslation } from 'react-i18next';

function NewItemModalForm({ isDrink, setIsUploading }) {
    const [title, setTitle] = useState("");
    const [titleEng, setTitleEng] = useState("");
    const [priceEUR, setPriceEUR] = useState("");
    const [priceKN, setPriceKN] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionEng, setDescriptionEng] = useState("");
    const [compressedFile, setCompressedFile] = useState(null);
    const [addingCategory, setAddingCategory] = useState(false);

    const { t, i18n } = useTranslation()

    const fileInputRef = useRef(null);

    //  Paths to reach firebase database documents
    const categoriesPath = isDrink ? "menu/drink/categories" : "menu/food/categories";
    const itemsPath = isDrink ? "menu/drink" : "menu/food";

    //  Live show categories in new item form, handling showing new category right after creating it.
    const categoriesQuery = query(collection(db, categoriesPath));
    const [categories] = useCollectionData(categoriesQuery);

    //  Compressing the image before uploading to Firebase
    const handleCompressedImage = (e) => {
        setIsUploading(true)
        const image = e.target.files[0];
        if (image) {
            new Compressor(image, {
                quality: 0.6,
                maxWidth: 425,
                success: (compressedResult) => {
                    setCompressedFile(compressedResult);
                    setIsUploading(false)
                }
            });
        } else {
            setIsUploading(false)
            setCompressedFile(null)
        }
    };

    const handleClearImage = (e) => {
        e.preventDefault()
        setCompressedFile(null)
        fileInputRef.current.value = null;
    }

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
                titleEng: titleEng,
                priceEUR: parseFloat(priceEUR),
                priceKN: priceKN,
                mainCategory: isDrink ? "drink" : "food",
                category: category,
                description: description,
                descriptionEng: descriptionEng,
                fileUrl: url,
                filePath: filePath,
                id: newId,
                fullPath: `${itemsPath}/categories/${category}/items/${newId}`,
                dateCreated: Date.now(),
                dateEdited: Date.now(),
                orderTimestamp: Date.now()
            });

            //  Reset form states
            setTitle("");
            setTitleEng("");
            setPriceEUR("");
            setPriceKN("");
            setCategory("");
            setDescription("");
            setDescriptionEng("");
            setCompressedFile(null)
            fileInputRef.current.value = null;
            // handleClose();

            //  Update lastedited timestamp to handle fetching from firestore or local storage.
            await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})

        } catch (error) {
            console.error(error);
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
                            {t("Title")}
                        </FormLabel>
                        <FormInput
                        required
                        type="text"
                        id="inputTitle"
                        placeholder={t("Title")}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                        <FormInput
                        type="text"
                        id="inputTitleEng"
                        placeholder={t("English Title")}
                        value={titleEng}
                        onChange={(e) => setTitleEng(e.target.value)}/>
                    </FormSection>
                    <Divider></Divider>
                    <FormSection>
                        <FormLabel htmlFor="inputPrice">
                        {t("Price")}
                        </FormLabel>
                        <FormInput
                        required
                        type="number"
                        id="inputPrice"
                        placeholder={t("Price")}
                        value={priceEUR}
                        onChange={(e) => eurToKn(e.target.value)}/>
                        <PriceConversion>{priceEUR} € x 7.53450 = <span style={{ fontWeight: 'bold' }}>{priceKN} kn</span></PriceConversion>
                    </FormSection>
                    <Divider></Divider>
                    <FormSection>
                        <FormLabel htmlFor="selectCategory">
                                {t("Category")}
                            <AddCategoryButton type='button' onClick={handleAddingCategory}>
                                {isDrink ? t("Add New Drink Category") : t("Add New Food Category")}
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
                        {t("Description")}
                        </FormLabel>
                        <FormTextarea
                        id="inputDescription"
                        form='newItemForm'
                        placeholder={t("Description")}
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                        <FormTextarea
                        id="inputDescriptionEng"
                        form='newItemForm'
                        placeholder={t("English Description")}
                        rows={3}
                        value={descriptionEng}
                        onChange={(e) => setDescriptionEng(e.target.value)}/>
                    </FormSection>
                    <Divider></Divider>
                    <FormSection>
                        <FormLabel htmlFor="inputFile">
                            {t("Upload Image")}
                            {compressedFile ? <AddCategoryButton type='button' onClick={(e) => handleClearImage(e)}>{t("Clear Image")}</AddCategoryButton>  : ""}
                        </FormLabel>
                        <FormUpload
                        type="file"
                        accept='image/*'
                        id="inputFile"
                        ref={fileInputRef}
                        onChange={handleCompressedImage}/>
                    </FormSection>
                    {compressedFile ? <UploadedImage src={URL.createObjectURL(compressedFile)} alt='uploadedImage'/> : <UploadedImage src={noimage} alt="uploadedImage"></UploadedImage>}
                    <Divider></Divider>
                    <SubmitButton type="submit">
                        {t("Publish")}
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
