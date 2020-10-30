import React from "react";
import "../components/Card.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function Card(props) {
	return (
		<div>
			<div className="blog__body">
				<div className="blog__left">
					<div className="blog__image">
						<img
							src="https://i.pinimg.com/originals/8a/53/52/8a5352b7d0688d238d8a5028912dfba5.jpg"
							alt=""
						/>
					</div>
				</div>
				<div className="blog__right">
					<div className="blog__title">
						<h4>TITLE</h4>
					</div>
					<div className="blog__content">
						<p>props.info.title</p>
						<p>props.info.body</p>
					</div>
				</div>
			</div>
			<ArrowForwardIosIcon className="expand__arrow" />
		</div>
	);
}

export default Card;
