import React from "react";
import { Link, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "./PreviousEvent.css";


const PreviousEvent = ({ title, description, eventDate, idEvent }) => {
    
  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>
      
      <p  className='event-card__description'
          data-tooltip-id={idEvent}
          data-tooltip-content={description}
          data-tooltip-place="top"
      >
        
      <Tooltip id={idEvent} className="tooltip"/>
      {description.substr(0, 15)}...</p>
      
      <p className="event-card__description">{eventDate}</p>

      <Link to={`/detalhes-evento/${idEvent}`} className="event-card__connect-link">Ver detalhes</Link>
    </article>
  );
};

export default PreviousEvent;
