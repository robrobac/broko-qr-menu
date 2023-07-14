import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db, storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, query } from 'firebase/firestore';
import Compressor from 'compressorjs';

function EditItemForm({ item, handlePassEditedItem }) {
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
        const eur = e.target.value;
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

        //  Prepare editedItem and path and send it as an argument to ItemCard component so it can send it up to Items component to handle edit.
        const editedItem = {
            title: title,
            priceEUR: priceEUR,
            priceKN: priceKN,
            // category: category, Got to find out how to change categories of already created item, how to move the document from one collection to another
            description: description,
            fileUrl: url,
            filePath: filePath,
            dateEdited: Date.now(),
        }
        handlePassEditedItem(editedItem, item.fullPath)
    };

    return (
		<div>
            <Form id="newItemForm" onSubmit={handleEditedItem}>
                <Form.Group className="mb-3" id="titleForm">
                    <Form.Label htmlFor="inputTitle">Title</Form.Label>
                    <Form.Control
                    autoFocus
                    type="text"
                    id="inputTitle"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" id="priceForm">
                    <Form.Label htmlFor="inputPrice">Price</Form.Label>
                    <Form.Control
                    type="number"
                    id="inputPrice"
                    placeholder="€"
                    value={priceEUR}
                    onChange={(e) => eurToKn(e)}
                    />
                    <p className='small text-secondary'>{priceEUR}€ * 7.53450 = <span style={{ fontWeight: 'bold' }}>{priceKN}kn</span></p>
                </Form.Group>

                <Form.Group className="mb-3" id="categoryForm">
                    <Form.Label htmlFor="inputCategory">Category</Form.Label>
                    <Form.Select
                    disabled
                    id='inputCategory'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                        <option key="0"></option>
                        {categories?.map((category) => (
                            <option value={category.id} key={category.id}>{category.category}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" id="descriptionForm">
                    <Form.Label htmlFor="inputDescription">Description</Form.Label>
                    <Form.Control
                    as="textarea"
                    id="inputDescription"
                    placeholder="Description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <img src={item?.fileUrl} className="img-thumbnail mx-auto d-block" alt="..."></img>

                <Form.Group className="mb-3" id="fileForm">
                    <Form.Label>Choose new image</Form.Label>
                    <Form.Control
                    accept='image/*'
                    type="file"
                    ref={fileInputRef}
                    onChange={handleCompressedImage}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
    	</div>
    );
}

export default EditItemForm;
