import React, {useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./FeedbackAdmin.css";

const FeedbackAdmin = () => {
	
	const [feedbackData, setFeedbackData] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/api/get-feedbacks", {
			method: 'GET'
		}).then(res => {
			return res.json();
		}).then((data) => {
			console.log(data);
			setFeedbackData(data);
		})
	}, []);

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
			selector: "checkbox",
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
		},
	];

	const ExpandableContent = ({ data }) => (
		<div style={{ backgroundColor: "#aaa" }} className="data__message">
			{data.message}
		</div>
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
