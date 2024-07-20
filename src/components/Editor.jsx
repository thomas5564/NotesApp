import React, { useState, useEffect, useRef } from "react";
import plus from "../assets/Plus_symbol.svg";

export default function Editor(props) {
  const [note, setNote] = useState({ text: "", pic: "" });
  const textRef = useRef(null);

  useEffect(() => {
    if (props.note && props.note.text !== undefined && props.note.pic !== undefined) {
      setNote({ text: props.note.text, pic: props.note.pic });
    } else {
      // Reset to default values when props.note is undefined or contains undefined properties
      setNote({ text: "", pic: "" });
    }
  }, [props.note]);

  function handleChange(event) {
    const { value, name } = event.target;
    if (name === "text") {
      setNote((prevNote) => ({ ...prevNote, text: value }));
    } else if (name === "pic") {
      if (event.target.files && event.target.files[0]) {
        const picURL = URL.createObjectURL(event.target.files[0]);
        const reader=new FileReader()
        reader.addEventListener("load",()=>{
          setNote((prevNote) => ({ ...prevNote, pic: picURL }));

        })
        reader.readAsDataURL(event.target.files[0])
        //setNote((prevNote) => ({ ...prevNote, pic: picURL }));
      }
    }
  }

  function handleClick() {
    if (note.text.trim() !== "" || note.pic !== "") {
      props.save(note);
      setNote({ text: "", pic: "" });
      textRef.current.value = ""; // Clear textarea
    }
  }

  function firstLine() {
    if (!note.text) return ""; // Return an empty string if text is null or empty
    return note.text.split("\n")[0];
  }

  return (
    <div className="editorcontainer">
      <form className="form" action="">
        {note.text && <div><h3>{firstLine()}</h3></div>}
        <textarea
          id="textarea"
          ref={textRef}
          onChange={handleChange}
          name="text"
          cols="30"
          rows="10"
          placeholder="Enter text here"
          value={note.text}
        ></textarea>
        <button type="button" onClick={handleClick}>SAVE</button>
      </form>
    </div>
  );
}
