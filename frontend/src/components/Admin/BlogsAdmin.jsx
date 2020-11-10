import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

import DataTable from "react-data-table-component";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

const BlogsAdmin = (props) => {
  const sortIcon = <ArrowDropDownIcon />;

  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {

    fetch("/api/get-blogs", {
      method: "GET"
    })
    .then(res => res.json())
    .then(data => {
      setBlogsData(data);
    });

  },[]);

  const columns = [
    {
      name: "TITLE",
      selector: "title",
      sortable: "true",
    },
    {
      name: "Date Modified",
      selector: "date",
      sortable: "true",
    },
    {
      name: "Visibility",
      selector: "visibility",
      sortable: "true",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ display: "flex", justifyContent: "right", marginRight: "5vw" }}
      >
        <Button color="success" onClick={() => props.gotoCreate()}>
          {/* <Link style={{textDecoration: "none"}} to="/admin/create-new-blog" > */}
            <ControlPointIcon /> Add New Blog
          {/* </Link> */}
        </Button>
      </div>

      <div>
        <DataTable
          title="YOUR BLOGS"
          columns={columns}
          data={blogsData}
          sortIcon={sortIcon}
          highlightOnHover
          pointerOnHover
          pagination
          paginationPerPage={10}
          onRowClicked={(e) => {
            props.setEditBlogInfo(e);
            props.gotoEdit();
          } }
        />
      </div>
    </div>
  );
};

export default BlogsAdmin;
