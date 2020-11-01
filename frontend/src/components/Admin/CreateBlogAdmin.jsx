import React from 'react'
import { Button } from 'reactstrap'

const CreateBlogAdmin = (props) => {
    return (
        <div>
            <div>
                <Button onClick={() => props.gotoBack()}>Go Back</Button>
            </div>
        </div>
    )
}

export default CreateBlogAdmin
