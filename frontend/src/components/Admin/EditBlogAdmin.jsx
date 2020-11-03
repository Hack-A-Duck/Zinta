import React, { useState } from 'react'
import { Button, Input } from 'reactstrap';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DoneSharpIcon from "@material-ui/icons/DoneSharp";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditBlogAdmin = (props) => {
    
    const [blogTitle, setBlogTitle] = useState(props.blogInfo.title);
    const [blogBody, setBlogBody] = useState(props.blogInfo.body);

    const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
    ];
    
    const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, false] }],
			[{ font: [] }],
			[{ align: [] }],
			["bold", "italic", "underline", "strike", "blockquote", "code-block"],
			[{ script: "sub" }, { script: "super" }],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link", "image"],
			["clean"],
		],
    };
    
    const updateBlogHandler = () => {
        if (blogTitle.trim().length === 0) {
			return window.alert("Title cannot be empty!!");
		} else {
			const updatedBlogData = {
				title: blogTitle,
                body: blogBody,
                id: props.blogInfo._id,
            };
            
            // console.log(updatedBlogData);

			fetch("http://localhost:5000/api/update-blog", {
				method: "PATCH",
				headers: {
					"Accept": "application/json",
					"Content-type": "application/json",
				},
				body: JSON.stringify(updatedBlogData),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
                    console.log(data);
					if (data.status === "400") {
						return window.alert("Some error occured!" + data.error);
					} else {
						window.alert("Blog updated successfully!!");
						return props.gotoBack();
					}
				});
		}
    }

    return (
        <div>
            <div>
				<Button
					color="danger"
					onClick={() => props.gotoBack()}
					style={{ marginLeft: "10px", marginBottom: "20px" }}
				>
					<ArrowBackIosIcon /> Back
				</Button>
			</div>

			<div
				className="quill__writetitle"
				style={{
					display: "flex",
					justifyContent: "left",
					alignItems: "left",
					flexDirection: "column",
					padding: "10px",
				}}
			>
				<h4>TITLE</h4>
				<Input
					placeholder="TItle of blog"
					value={blogTitle}
					onChange={(e) => setBlogTitle(e.target.value)}
					style={{ width: "40vw" }}
				/>
			</div>

			<hr />

			<div
				className="quill__writecontent"
				style={{
					display: "flex",
					flexDirection: "column",
					padding: "10px",
				}}
			>
				<h4 style={{ justifyContent: "left", alignItems: "left" }}>BODY</h4>

				<ReactQuill
					theme="snow"
					modules={modules}
                    formats={formats}
                    defaultValue={blogBody}
					onChange={(e) => setBlogBody(e)}
					style={{
						width: "95%",
						textAlign: "left",
						justifyContent: "center",
						alignItems: "center",
					}}
				/>

				<div style={{ display: "flex", justifyContent: "center" }}>
					<Button
						type="success"
						color="primary"
						style={{ margin: "15px" }}
						onClick={updateBlogHandler}
					>
						<DoneSharpIcon /> Save Changes
                    </Button>
				</div>
			</div>
        </div>
    )
}

export default EditBlogAdmin
