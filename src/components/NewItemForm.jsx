import React, { useRef, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { collection, doc, query, setDoc } from 'firebase/firestore';
import NewCategoryForm from './NewCategoryForm';
import Compressor from 'compressorjs';

function NewItemForm({ handleClose }) {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)
    const [compressedFile, setCompressedFile] = useState(null)
    const [addingCategory, setAddingCategory] = useState(false)

    const fileInputRef = useRef(null);

    const categoriesQuery = query(collection(db, "menu/food/categories"))
    const [docs, loading, error] = useCollectionData(categoriesQuery)

    const handleCompressedImage = (e) => {
        const image = e.target.files[0]

        new Compressor(image, {
            quality: 0.8,
            maxWidth: 425,
            success: (compressedResult) => {
                setCompressedFile(compressedResult)
            }
        })
    }


    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (compressedFile == null) return;

        const fileRef = ref(storage, `images/${compressedFile.name + Date.now()}`);

        try {
            const snapshot = await uploadBytes(fileRef, compressedFile);
            const url = await getDownloadURL(snapshot.ref)
            const path = `menu/food/categories/${category}/items`

            const id = title
            const formattedId = id.replace(/\s/g, "").toLowerCase();
            const newId = formattedId.slice(0, 10) + Date.now();

            await setDoc(doc(db, path, newId), {
                title: title,
                category: category,
                description: description,
                fileUrl: url,
                id: newId,
            })
            
            setTitle("")
            setCategory("")
            setDescription("")
            setFile(null)
            fileInputRef.current.value = '';
            handleClose();

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
                        <Form.Label htmlFor="inputTitle">Title</Form.Label>
                        <Form.Control
                        autoFocus
                        type="text"
                        id="inputTitle" placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" id="categoryForm">
                        <Form.Label htmlFor="inputCategory">Category</Form.Label>
                        <Button variant="link" size="sm" onClick={handleAddingCategory}>
                        Add Category
                    </Button>
                        <Form.Select
                        id='inputCategory'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                            <option key="0"></option>
                            {docs?.map((doc, index) => (
                                <option value={doc.category} key={index}>{doc.category}</option>
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
                        Submit
                    </Button>
                    
                </Form>
                :
                <NewCategoryForm handleAddingCategory={handleAddingCategory}/>
            }  
        </div>
    )
}

export default NewItemForm
