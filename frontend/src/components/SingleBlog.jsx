import React, { useState, useEffect } from 'react'

const SingleBLog = (props) => {
    const [blogId, setBlogId] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [blogBody, setBlogBody] = useState("");
    const [blogComments, setBlogComments] = useState([]);

    useEffect(() => {
    
    }, []);

    return (
        <div>
            <h1>This is single blog component</h1>
        </div>
    )
}

export default SingleBLog
