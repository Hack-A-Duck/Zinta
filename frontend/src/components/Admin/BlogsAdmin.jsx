import { Button } from "reactstrap";
import React from "react";
import DataTable from "react-data-table-component";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

const BlogsAdmin = () => {
  const sortIcon = <ArrowDropDownIcon />;

  const blogsData = [
    {
      title: "Blog1",
      date: "1",
      id: "1234",
      isVisible: "true",
    },
    {
      title: "Blog2",
      date: "1",
      id: "12334",
      isVisible: "false",
    },
    {
      title: "Blog3",
      date: "1",
      id: "12343",
      isVisible: "true",
    },
    {
      title: "Blog4",
      date: "1",
      id: "123124",
      isVisible: "true",
    },
    {
      title: "Blog5",
      date: "1",
      id: "123434",
      isVisible: "false",
    },
  ];

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
