import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import DataTable from "react-data-table-component";
import { Input, Button } from 'reactstrap';
import FooterDown from './FooterDown';
import NavbarTop from './NavbarTop';

const SingleBLog = (props) => {
    const [blogId, setBlogId] = useState(window.location.href.substr(window.location.href.lastIndexOf('/')+1));
    const [blogTitle, setBlogTitle] = useState("");
    const [blogBody, setBlogBody] = useState("");
    const [blogComments, setBlogComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {

        fetch("http://localhost:5000/api/get-blog/" + blogId, {
            method: "GET"
        }).then(data => {
            return data.json();
        }).then(data => {
            setBlogTitle(data[0].title);
            setBlogBody(data[0].body);
            setBlogComments(data[0].comments.map(current => {
                return {
                    value: current
                }
            }));
            setBlogId(blogId);
        });

    }, [blogId]);

    const refreshComments = () => {

        fetch("http://localhost:5000/api/get-blog/" + blogId, {
            method: "GET"
        }).then(data => {
            return data.json();
        }).then(data => {
            setBlogTitle(data[0].title);
            setBlogBody(data[0].body);
            setBlogComments(data[0].comments.map(current => {
                return {
                    value: current
                }
            }));
            setBlogId(blogId);
        });

    }

    const columns = [
        {
            name: "Comments",
            selector: "value",
        }
    ]

    const addCommentHandler = () => {
        const body = {
            id: blogId,
            comment: comment,
        }

        fetch("http://localhost:5000/api/add-comment", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data => {
            if(data.status === "200") {
                alert("Your comment was posted!");
                setComment("");
                return refreshComments();
            } else {
                alert("Something went wrong! Please try again!");
            }
        });
    }

    return (
        <div>
            <NavbarTop />
            <h1>{blogTitle}</h1>
            {ReactHtmlParser(blogBody)}
            <div>
                <Input placeholder="Add comment" value={comment} onChange={e => setComment(e.target.value)} />
                <Button onClick={addCommentHandler}>Add comment</Button>
            </div>
            <div>
                <DataTable
                    columns={columns}
                    data={blogComments}
                    highlightOnHover
                    pointerOnHover
                    pagination
                    paginationPerPage={10}
                />
            </div>
            <FooterDown />
        </div>
    )
}

export default SingleBLog
