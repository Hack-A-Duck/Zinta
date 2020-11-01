import { Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

const BlogsAdmin = () => {
  const sortIcon = <ArrowDropDownIcon />;

  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/get-blogs", {
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
      selector: "isVisible",
      sortable: "true",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ display: "flex", justifyContent: "right", marginRight: "5vw" }}
      >
        <Button color="success">
          <ControlPointIcon /> Add New Blog
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
          onRowClicked={() => {}}
        />
      </div>
    </div>
  );
};

export default BlogsAdmin;
