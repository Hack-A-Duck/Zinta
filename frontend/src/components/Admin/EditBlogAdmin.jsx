import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DoneSharpIcon from "@material-ui/icons/DoneSharp";
import ReactQuill from "react-quill";
import DataTable from "react-data-table-component";
import "react-quill/dist/quill.snow.css";
import "./EditBlogAdmin.css";

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
    var fd = new FormData();
    fd.append("thumbnail", fileUploaded);
    fd.append("id", props.blogInfo._id);
    fetch("http://localhost:5000/api/update-thumbnail", {
      method: "POST",
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
            window.alert("Blog updated successfully!! You might have to manage the updated layout!");
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
      <div name="3 button row" style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <div style={{alignItems: "left"}}>
          <Button
            color="danger"
            onClick={() => props.gotoBack()}
            style={{ marginLeft: "10px", marginBottom: "20px" }}
          >
            <ArrowBackIosIcon /> Back
          </Button>
        </div>

        <div style={{alignItems: "right"}}>
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
            color="success"
            style={{ marginLeft: "10px", marginBottom: "20px" }}
            onClick={updateBlogHandler}
          >
            <i class="ri-save-fill" /> Save Changes
          </Button>
        </div>
        
      </div>

      <div style={{marginLeft: "1vw", display: "flex", flexDirection: "row", alignItems: "center"}}>
        <Button onClick={handleUploadClick} className="p-2" color="primary" style={{height: "fit-content", marginRight: "2vw"}}>
        <i class="ri-upload-cloud-line" /> Upload
        </Button>
        <div style={{height: "15vh", width: "15vw"}}>
          <img style={{height: "100%", width: "100%"}} src={`http://localhost:5000/api/get-thumbnail/${props.blogInfo._id}`} alt="image" />
        </div>
        <input
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={uploadImage}
          type="file"
        />
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

      <div style={{marginBottom: "4vh", display: "flex", flexDirection: "column", alignItems: "center"}}>

        <Button
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          color="danger"
          onClick={() => setCounter(counter + 1)}
          style={{width: "fit-content"}}
        >
          <i class="ri-delete-bin-fill" /> Delete Blog
        </Button>

        {tooltipOpen ? (
          <p>Click {5 - counter} more times to delete the blog</p>
        ) : null}

      </div>
    </div>
  );
};

export default EditBlogAdmin;
