import React from "react";

export default function SideBar(props) {
  // console.log("Current Note ID:", props.currentNoteId);

  const handleDeleteClick = () => {
    console.log("Delete button clicked");
    props.delete(); // Ensure props.delete is correctly invoked
  };

  return (
    <div>
      {/* Render notes if there are any */}
      {props.notes && props.notes.length > 0 && props.render()}

      {/* Render the clear button */}
      <div className="buttonsContainer">
        <button id="clearbutton" onClick={props.clear}>
          CLEAR
        </button>

        {/* Render the delete button if a note is selected */}
        {props.currentNoteId != null && (
          <button onClick={handleDeleteClick}>DELETE</button>
        )}
      </div>
      
    </div>
  );
}
