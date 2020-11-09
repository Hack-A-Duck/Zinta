import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DoneSharpIcon from "@material-ui/icons/DoneSharp";
import ReactQuill from "react-quill";
import DataTable from "react-data-table-component";
import "react-quill/dist/quill.snow.css";

const fileToArrayBuffer = require('file-to-array-buffer')

const EditBlogAdmin = (props) => {
  const [blogTitle, setBlogTitle] = useState(props.blogInfo.title);
  const [blogBody, setBlogBody] = useState(props.blogInfo.body);
  const [visibility, setVisibility] = useState(props.blogInfo.visibility);
  const [blogComments, setBlogComments] = useState(
    props.blogInfo.comments.map((current) => {
      return {
        value: current,
      };
    })
  );
  const [counter, setCounter] = useState(0);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const handleUploadClick = (e) => hiddenFileInput.current.click();

  const uploadImage = (event) => {
    var fileUploaded = event.target.files[0];

    console.log(event.target.files);

    var fd = new FormData();
    fd.append("thumbnail", fileUploaded);
    for (var key of fd.entries()) {
      console.log("this " + key[0] + ', ' + key[1]);
  }
    // console.log("initial", fd);
    // fd["thumbnail"] = fileUploaded;
    // fd.append( 
    //   "thumbnail", 
    //   uploadImage, 
    //   uploadImage.name 
    // ); 
    // fd.append("something", "value");

    console.log("fd", fd);
    fetch("http://localhost:5000/api/update-thumbnail", {
      method: "POST",
      // headers:{
      //   "Content-Type" : "multipart/form-data"
      // },
      body: fd,
    }).then(res => res.json()).then(data => {
      console.log(data);
    });
  };

  useEffect(() => {
    if (counter >= 5) {
      fetch("http://localhost:5000/api/delete-blog", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: props.blogInfo._id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "200") {
            alert("Blog has been deleted!");
            setCounter(0);
            return props.gotoBack();
          }

          if (data.status === "400") {
            setCounter(0);
            return alert("Something went wrong! Please try again!");
          }

          return alert("Blog not found!");
        });
    }
  }, [counter]);

  const toggleVisibility = () => {
    if (visibility === "true") {
      setVisibility("false");
    } else {
      setVisibility("true");
    }
  };

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
        visibility: visibility,
      };

      // console.log(updatedBlogData);

      fetch("http://localhost:5000/api/update-blog", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
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
  };

  const columns = [
    {
      name: "Comments",
      selector: "value",
    },
  ];

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

        <Button
          style={{ marginLeft: "10px", marginBottom: "20px" }}
          color="primary"
          onClick={toggleVisibility}
        >
          {visibility === "true" ? (
            <span>
              <i className="ri-eye-line" /> Visible
            </span>
          ) : (
            <span>
              <i className="ri-eye-off-line" /> Not visible
            </span>
          )}
        </Button>

        <Button
          type="success"
          color="primary"
          style={{ marginLeft: "10px", marginBottom: "20px" }}
          onClick={updateBlogHandler}
        >
          <DoneSharpIcon /> Save Changes
        </Button>

        <div>
          <Button onClick={handleUploadClick} className="p-2" color="primary">
            Upload
          </Button>
          <input
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={uploadImage}
            type="file"
          />
        </div>
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

        <DataTable
          columns={columns}
          data={blogComments}
          highlightOnHover
          pointerOnHover
          pagination
          paginationPerPage={10}
        />
      </div>

      <Button
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        color="danger"
        onClick={() => setCounter(counter + 1)}
      >
        Delete Blog
      </Button>

      {tooltipOpen ? (
        <p>Click {5 - counter} more times to delete the blog</p>
      ) : null}
    </div>
  );
};

export default EditBlogAdmin;
