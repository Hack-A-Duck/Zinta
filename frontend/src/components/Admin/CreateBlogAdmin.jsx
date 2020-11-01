import React from "react";
import { Button } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DoneSharpIcon from "@material-ui/icons/DoneSharp";
const CreateBlogAdmin = (props) => {
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
	return (
		<div>
			<div
				className="quill__writetitle"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					padding: "10px",
				}}
			>
				<h3>TITLE</h3>
				<ReactQuill theme="snow" modules={modules} formats={formats} />
				{/* save button that would grab these properties and save to
				database(mongoDB) on a post request. */}
				<Button type="submit" color="primary" style={{ margin: "15px" }}>
					Submit
					<DoneSharpIcon />
				</Button>
			</div>
			<hr />
			<div
				className="quill__writecontent"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					padding: "10px",
				}}
			>
				<h3>BODY</h3>
				<ReactQuill
					theme="snow"
					modules={modules}
					formats={formats}
					style={{ width: "90%", textAlign: "center" }}
				/>
				<Button
					type="submit"
					color="primary"
					style={{ margin: "15px", display: " flex" }}
				>
					Submit
					<DoneSharpIcon />
				</Button>
			</div>
			<Button
				color="danger"
				onClick={() => props.gotoBack()}
				style={{ position: "absolute", top: "80px", marginLeft: "30px" }}
			>
				<ArrowBackIosIcon /> Back
			</Button>
		</div>
	);
};

export default CreateBlogAdmin;

//title body
