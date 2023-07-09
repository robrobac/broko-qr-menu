import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NewItemForm() {
    return (
        <Form id="newItemForm">

            <Form.Group className="mb-3" id="titleForm">
                <Form.Label htmlFor="inputTitle">Title</Form.Label>
                <Form.Control type="text" id="inputTitle" placeholder="Title" />
            </Form.Group>

            <Form.Group className="mb-3" id="categoryForm">
                <Form.Label htmlFor="inputCategory">Category</Form.Label>
                <Form.Select id='inputCategory'>
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" id="descriptionForm">
                <Form.Label htmlFor="inputDescription">Description</Form.Label>
                <Form.Control as="textarea" id="inputDescription" placeholder="Description" rows={3}/>
            </Form.Group>

            <Form.Group className="mb-3" id="fileForm">
                <Form.Label>Choose an image</Form.Label>
                <Form.Control type="file" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
    )
}

export default NewItemForm
