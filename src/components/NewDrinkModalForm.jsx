import React, { useRef, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { collection, doc, query, setDoc } from 'firebase/firestore';
import Compressor from 'compressorjs';
import NewDrinkCategoryModalForm from './NewDrinkCategoryModalForm';


function NewDrinkModalForm({ handleClose }) {
    const [title, setTitle] = useState("")
    const [priceEUR, setPriceEUR] = useState("")
    const [priceKN, setPriceKN] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [compressedFile, setCompressedFile] = useState(null)
    const [addingCategory, setAddingCategory] = useState(false)


    const fileInputRef = useRef(null);

    const categoriesQuery = query(collection(db, "menu/drink/categories"))
    const [categories, loading, error] = useCollectionData(categoriesQuery)

    const handleCompressedImage = (e) => {
        const image = e.target.files[0]

        new Compressor(image, {
            quality: 0.6,
            maxWidth: 425,
            success: (compressedResult) => {
                setCompressedFile(compressedResult)
            }
        })
    }


    const eurToKn = (e) => {
        const tecaj = 7.53450
        const eur = e.target.value
        const kn = (eur * tecaj).toFixed(2)

        setPriceEUR(eur);
        setPriceKN(kn);
    }

    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (compressedFile == null) return;

        const fileRef = ref(storage, `images/${compressedFile.name + Date.now()}`);

        try {
            const snapshot = await uploadBytes(fileRef, compressedFile);
            const url = await getDownloadURL(snapshot.ref)
            const path = `menu/drink/categories/${category}/items`

            const id = title
            const formattedId = id.replace(/\s/g, "").toLowerCase();
            const newId = formattedId.slice(0, 10) + Date.now();

            await setDoc(doc(db, path, newId), {
                title: title,
                priceEUR: priceEUR,
                priceKN: priceKN,
                category: category,
                description: description,
                fileUrl: url,
                id: newId,
            })
            
            setTitle("")
            setPriceEUR("")
            setPriceKN("")
            setCategory("")
            setDescription("")
            fileInputRef.current.value = '';
            // handleClose();

        } catch (error) {
            console.error("error creating a new item", error)
        }
    }

    const handleAddingCategory = () => {
        setAddingCategory(!addingCategory)
    }

    return (
        <div>
            {!addingCategory ? 
                <Form id="newItemForm" onSubmit={handleFileSubmit}>
                    <Form.Group className="mb-3" id="titleForm">
                        <Form.Label htmlFor="inputTitle">Drink Title</Form.Label>
                        <Form.Control
                        autoFocus
                        type="text"
                        id="inputTitle" placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" id="priceForm">
                        <Form.Label htmlFor="inputPrice">Price</Form.Label>
                        <Form.Control
                        autoFocus
                        type="number"
                        id="inputPrice" placeholder="€"
                        value={priceEUR}
                        onChange={(e) => eurToKn(e)}/>
                        <p className='small text-secondary'>{priceEUR}€ * 7.53450 = <span style={{ fontWeight: 'bold' }}>{priceKN}kn</span></p>
                    </Form.Group>

                    <Form.Group className="mb-3" id="categoryForm">
                        <Form.Label htmlFor="inputCategory">Drink Category</Form.Label>
                        <Button variant="link" size="sm" onClick={handleAddingCategory}>
                        Add New Drink Category
                    </Button>
                        <Form.Select
                        id='inputCategory'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                            <option key="0"></option>
                            {categories?.map((category) => (
                                <option value={category.id} key={category.id}>{category.category}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" id="descriptionForm">
                        <Form.Label htmlFor="inputDescription">Drink Description</Form.Label>
                        <Form.Control
                        as="textarea"
                        id="inputDescription"
                        placeholder="Description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" id="fileForm">
                        <Form.Label>Choose an image</Form.Label>
                        <Form.Control
                        accept='image/*'
                        type="file"
                        ref={fileInputRef}
                        onChange={handleCompressedImage}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit New Drink
                    </Button>
                    
                </Form>
                :
                <NewDrinkCategoryModalForm handleAddingCategory={handleAddingCategory}/>
            }  
        </div>
    )
}

export default NewDrinkModalForm
