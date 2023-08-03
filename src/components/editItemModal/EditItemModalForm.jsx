import { collection, query } from 'firebase/firestore';
import React, { useContext, useRef, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, storage } from '../../firebase/config';
import Compressor from 'compressorjs';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Divider, Form, FormInput, FormLabel, FormSection, FormSelect, FormTextarea, FormUpload, PriceConversion } from '../StyledForm';
import { SubmitButton } from '../StyledButtons';
import { EditContext2 } from '../AdminItems';

function EditItemModalForm({item, setIsEditing}) {
    const {handleEdit} = useContext(EditContext2)

    const [title, setTitle] = useState(item.title);
    const [priceEUR, setPriceEUR] = useState(item.priceEUR);
    const [priceKN, setPriceKN] = useState(item.priceKN);
    const [category, setCategory] = useState(item.category);
    const [description, setDescription] = useState(item.description);
    const [compressedFile, setCompressedFile] = useState(null);

    const fileInputRef = useRef(null);

     //  Live show categories in category select dropdown
     const categoriesPath = `menu/${item.mainCategory}/categories`;
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
        const eur = parseFloat(e);
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
                    
                });
            }
        }

        //  Prepare editedItem and path and send it as an argument to Items component to handle editing.
        const editedItem = {
            title: title,
            priceEUR: priceEUR.toFixed(2),
            priceKN: priceKN,
            // category: category, Got to find out how to change categories of already created item, how to move the document from one collection to another
            description: description,
            fileUrl: url,
            filePath: filePath,
            dateEdited: Date.now(),
        }
        handleEdit(editedItem, item.fullPath)
        setIsEditing(false)
    };

    return (
        <div>
            <Form id="newItemForm" onSubmit={handleEditedItem}>
                <FormSection>
                    <FormLabel htmlFor="inputTitle">
                        Title
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
                        Price
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
                        Category  
                    </FormLabel>
                    <FormSelect
                    required
                    id='selectCategory'
                    value={category}
                    disabled={true}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                        <option key="0"></option>
                        {categories?.map((option) => (
                            <option
                            active={category === option.category}
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
                        Description
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
                <img src={item?.fileUrl} className="img-thumbnail mx-auto d-block" alt="..."></img>
                <Divider></Divider>
                <FormSection>
                    <FormLabel htmlFor="inputFile">
                        Upload New Image
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
                    Save Changes
                </SubmitButton>
            </Form>
    	</div>
    )
}

export default EditItemModalForm
