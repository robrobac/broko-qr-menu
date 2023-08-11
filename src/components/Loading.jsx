import React from 'react'
import { LoaderBG } from './styledComponents/StyledLoader'

function Loading({loading}) {
    return (
        <LoaderBG $loading={loading ? 1 : 0}>
            <span className="loader"></span>
        </LoaderBG>
    )
}

export default Loading
