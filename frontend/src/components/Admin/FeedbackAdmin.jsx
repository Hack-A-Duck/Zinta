import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import DataTable from "react-data-table-component";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import "./FeedbackAdmin.css";

const FeedbackAdmin = () => {
	const [feedbackData, setFeedbackData] = useState([]);
	const [deleteFeedbackId, setDeleteFeedbackId] = useState("");

	useEffect(() => {
		fetch("http://localhost:5000/api/get-feedbacks", {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				// console.log(data);
				setFeedbackData(data);
			});
	}, [deleteFeedbackId]);

	useEffect(() => {
		if (deleteFeedbackId.length === 0) {
			return;
		}

		const data = {
			_id: deleteFeedbackId,
		};

		setDeleteFeedbackId("");

		fetch("http://localhost:5000/api/delete-feedback", {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log("delete successful");

				fetch("http://localhost:5000/api/get-feedbacks", {
					method: "GET",
				})
					.then((res) => {
						return res.json();
					})
					.then((newData) => {
						console.log("fetching info again");
						setFeedbackData(newData);
					});
			});
	}, [deleteFeedbackId]);

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
		<>
			<div
				style={{ backgroundColor: "rgb(212, 212, 212)" }}
				className="data__message"
			>
				{data.message}
			</div>
			<div>
				<Button
					style={{ margin: "20px 50px" }}
					color="danger"
					onClick={() => setDeleteFeedbackId(data._id)}
				>
					<DeleteIcon style={{ marginRight: "10px" }} />
					Delete Feedback
				</Button>
			</div>
		</>
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
