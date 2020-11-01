import React, { useState } from "react";
import { Button, Input } from "reactstrap";
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

  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");

  const createBlogHandler = () => {
	  if(blogTitle.trim().length === 0) {
		  return window.alert("Title cannot be empty!!")
	  } else {

		  const newBlogData = {
			  title: blogTitle,
			  body: blogBody,
		  };

		  console.log(newBlogData);

		  fetch("http://localhost:5000/api/create-blog", {
			  method: "POST",
			  headers: {
				Accept: "application/json",
				"Content-type": "application/json",
			  },
			  body: JSON.stringify(newBlogData)
		  }).then((res) => {
			  return res.json();
		  }).then((data) => {
			  if(data.status === "400") {
				  return window.alert("Some error occured!" + data.error);
			  } else {
				  window.alert("Blog created successfully!!");
				  return props.gotoBack();
			  }
		  })
	  }
  }

  return (
    <div>
      <div>
        <Button
          color="danger"
          onClick={() => props.gotoBack()}
          // style={{ position: "absolute", top: "80px", marginLeft: "30px" }}
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

        {/* <ReactQuill theme="snow" modules={modules} formats={formats} />
				save button that would grab these properties and save to
				database(mongoDB) on a post request. 
				<Button type="submit" color="primary" style={{ margin: "15px" }}>
					Submit
					<DoneSharpIcon />
				</Button> */}
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
		      onChange={e => setBlogBody(e)}
		//   value={blogBody}
		//   onChange={e => setBlogBody(e.target.value)}
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
			      style={{ margin: "15px", display: "flex", width: "9vw" }}
			      onClick={createBlogHandler}
          >
            Create Blog
            <DoneSharpIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogAdmin;

//title body
