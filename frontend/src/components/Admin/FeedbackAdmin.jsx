import React from "react";
import DataTable from "react-data-table-component";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./FeedbackAdmin.css";

const FeedbackAdmin = () => {

	const feedbackData = [
		{
			name: "A",
			email: "asd@s.com",
			checkBox: ["presentation", "content"],
			message: "this is message",
			rating: "5",
			date: "1",
		},
		{
			name: "B",
			email: "mfrcd@4hj.com",
			checkBox: ["Linguistics", "content"],
			message: "this is message",
			rating: "3",
			date: "1",
		},
		{
			name: "C",
			email: "r3sd@jg.com",
			checkBox: ["presentation", "Accuracy", "content"],
			message:
				"this is message Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa quibusdam dolores similique cumque, corporis accusantium at recusandae officiis placeat eius, deleniti ipsa neque inventore enim optio libero, ipsum deserunt corrupti.",
			rating: "1",
			date: "1",
		},
		{
			name: "D",
			email: "vrtyu@ss.com",
			checkBox: ["none"],
			message: "this is message ",
			rating: "4",
			date: "1",
		},
	];

	const columns = [
		{
			name: "Name",
			selector: "name",
			sortable: true,
		},
		{
			name: "Email ID",
			selector: "email",
		},
		{
			name: "CheckBox",
			selector: "checkBox",
		},
		{
			name: "Rating",
			selector: "rating",
			sortable: true,
		},
		{
			name: "Date",
			selector: "date",
			sortable: true,
		}
	];

	const ExpandableContent = ({ data }) => (
		<div style={{backgroundColor: "#aaa"}} className="data__message">{data.message}</div>
	);

	const sortIcon = <ArrowDropDownIcon />;

	return (

		<div>
			<DataTable
				title="FEEDBACK TABLE"
				columns={columns}
				data={feedbackData}
				sortIcon={sortIcon}
				highlightOnHover
				expandableRows
				pagination
				paginationPerPage={10}
				expandableRowDisabled={(row) => row.disabled}
				expandableRowsComponent={<ExpandableContent />}
			/>
		</div>

	);
};

export default FeedbackAdmin;
