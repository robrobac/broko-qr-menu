import { collection, query } from 'firebase/firestore';
import React, { useContext, useRef, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, storage } from '../../../firebase/config';
import Compressor from 'compressorjs';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Divider, Form, FormInput, FormLabel, FormSection, FormSelect, FormTextarea, FormUpload, PriceConversion, UploadedImage } from '../../styledComponents/StyledForm';
import { AddCategoryButton, SubmitButton } from '../../styledComponents/StyledButtons';
import { EditContext } from '../../AdminItems';
import { useTranslation } from 'react-i18next';

function EditItemModalForm({item, setIsEditing, setIsUploading}) {
    const {handleEdit} = useContext(EditContext)    //  Edit item function passed from AdminItems.jsx via context.
    const [title, setTitle] = useState(item.title); //  Current Item Title
    const [titleEng, setTitleEng] = useState(item.titleEng);
    const [priceEUR, setPriceEUR] = useState(parseFloat(item.priceEUR));    //  Current Item Price in EUR
    const [priceKN, setPriceKN] = useState(item.priceKN);   //  Current Item Price in KN
    const [category, setCategory] = useState(item.category);    //  Current Item Category, not changeable yet
    const [description, setDescription] = useState(item.description);   //  Current Item Description
    const [descriptionEng, setDescriptionEng] = useState(item.description);
    const [compressedFile, setCompressedFile] = useState(null); //  State that holds data of image compressed with handleCompressedImage function
    const fileInputRef = useRef(null);  //  Ref to a file input element

    const { t } = useTranslation()

     // Firebase React Hook useCollectionData used to display categories in select input.
     const categoriesPath = `menu/${item.mainCategory}/categories`;
     const categoriesQuery = query(collection(db, categoriesPath));
     const [categories] = useCollectionData(categoriesQuery);

     //  Compressing and resizing the image before uploading to Firebase
    const handleCompressedImage = (e) => {
        const image = e.target.files[0];
        setIsUploading(true)
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

    //  Handle edited item
    const handleEditedItem = async (e) => {
        e.preventDefault();
        //  If no new image is selected, keep the old url and path.
        let url = item.fileUrl
        let filePath = item.filePath
        
        //  if new image is selected and compressed.
        if (compressedFile) {
            //  Get new firebase storage path
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

            //  Delete old image from the storage
            if (item.filePath !== "") {
                const oldFileRef = ref(storage, item.filePath)

                deleteObject(oldFileRef).then(() => {
 
                }).catch((error) => {
                    console.log(error)
                });
            }
        }

        //  Prepare editedItem and path and send it as an argument to AdminItems.jsx to handle editing.
        const editedItem = {
            title: title,
            titleEng: titleEng,
            priceEUR: parseFloat(priceEUR),
            priceKN: priceKN,
            // category: category, Got to find out how to change categories of already created item, how to move the document from one collection to another
            description: description,
            descriptionEng: descriptionEng,
            fileUrl: url,
            filePath: filePath,
            dateEdited: Date.now(),
        }
        handleEdit(editedItem, item.fullPath)
        //  Close the edit modal
        setIsEditing(false)
    };

    return (
        <div>
            <Form id="newItemForm" onSubmit={handleEditedItem}>
                <FormSection>
                    <FormLabel htmlFor="inputTitleEdit">
                        {t("Title")}
                    </FormLabel>
                    <FormInput
                    required
                    type="text"
                    id="inputTitleEdit"
                    placeholder={t("Title")}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                    <FormInput
                    type="text"
                    id="inputTitleEditEng"
                    placeholder={t("English Title")}
                    value={titleEng}
                    onChange={(e) => setTitleEng(e.target.value)}/>
                </FormSection>
                <Divider></Divider>
                <FormSection>
                    <FormLabel htmlFor="inputPriceEdit">
                        {t("Price")}
                    </FormLabel>
                    <FormInput
                    required
                    step="any"
                    type="number"
                    id="inputPriceEdit"
                    placeholder={t("Price")}
                    value={priceEUR}
                    onChange={(e) => eurToKn(e.target.value)}/>
                    <PriceConversion>{priceEUR} € x 7.53450 = <span style={{ fontWeight: 'bold' }}>{priceKN} kn</span></PriceConversion>
                </FormSection>
                <Divider></Divider>
                <FormSection>
                    <FormLabel htmlFor="selectCategoryEdit">
                        {t("Category")} 
                    </FormLabel>
                    <FormSelect
                    id='selectCategoryEdit'
                    value={category}
                    disabled={true}
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
                    <FormLabel htmlFor="inputDescriptionEdit">
                        {t("Description")}
                    </FormLabel>
                    <FormTextarea
                    id="inputDescriptionEdit"
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
                    <FormLabel htmlFor="inputFileEdit">
                        {t("Upload Image")}
                        {compressedFile ? <AddCategoryButton type='button' onClick={(e) => handleClearImage(e)}>
                            {t("Restart to original Image")}
                        </AddCategoryButton>  : ""}
                    </FormLabel>
                    <FormUpload
                    type="file"
                    accept='image/*'
                    id="inputFileEdit"
                    ref={fileInputRef}
                    onChange={handleCompressedImage}/>
                </FormSection>
                {compressedFile ? <UploadedImage src={URL.createObjectURL(compressedFile)} alt='uploadedImage'/> : <UploadedImage src={item?.fileUrl} alt="uploadedImage"></UploadedImage>}
                <Divider></Divider>
                <SubmitButton type="submit">
                    {t("Save Changes")}
                </SubmitButton>
            </Form>
    	</div>
    )
}

export default EditItemModalForm
