import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <div
            style={{ 
                width: '100vw',
                height: "100vh",
                backgroundColor: "white",
                position: "absolute",
                zIndex: "1"}}
            className='d-flex justify-content-center align-items-center'
        >
            <Spinner
                animation="border"
                variant="primary"
            />
        </div>
    )
}

export default Loader
