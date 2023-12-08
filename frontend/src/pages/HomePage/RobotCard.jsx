import React from "react";
import { useNavigate } from "react-router-dom";

const RobotCard = ({ imageSrc, text, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the specified link when the card is clicked
    navigate(link);
  };
  return (
    <div className="card" onClick={handleClick}>
      <img src={imageSrc} className="card-image-top" alt="Banner" />
      <div className="card-body">
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default RobotCard;