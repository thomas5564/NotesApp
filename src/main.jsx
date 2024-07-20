import React from "react";
import ReactDOM from "react-dom";
import SideBar from "./components/SideBar";
import Editor from "./components/Editor";
import Menu from "./assets/menu.svg"
import "./styles.css"

function Page() {
    const arr=[]
    // React.useState(
    //     localStorage.setItem("notes",JSON.stringify([]))
    // )
  const [isSideBarShowing,setIsSidebarShowing]=React.useState(false)
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || [])
    const [currentNoteId, setCurrentNoteId] = React.useState(null);
  function handleMenuButton(){
    setIsSidebarShowing(!isSideBarShowing)
  }
  function clear(){
    const confirmed = window.confirm("Are you sure you want to clear?");
    if(confirmed){
        setNotes([])
        localStorage.clear()
    }
  }
  function remove(){
    console.log("try")
    //const confirmed=window.confirm("Are you sure you want to delete this?")
    //if(confirmed){
      setNotes(
        function(prevnotes){
            const updatednotes=prevnotes.filter((note,index)=>index!==currentNoteId);
            return updatednotes
        }
    )
    localStorage.setItem("notes",JSON.stringify(notes))
    setCurrentNoteId(null)
    //}
  }
  function selectNote(id) {
    // If the clicked note is already selected, deselect it
    if (id === currentNoteId) {
      setCurrentNoteId(null);
    } else {
      // Otherwise, select the clicked note
      setCurrentNoteId(id);
    }
  }
  function renderSideBar() {
    if(notes && notes.length>0){
        let text=""
        return notes.map((note, index) => {
            try{
              text= note.text

            }catch{
              text=""
            }
            const firstLine = text.split("\n")[0];
            return (
              <div className={`note ${index===currentNoteId?"selected":""}`} onClick={()=>selectNote(index)} key={index}>
                <h1>{firstLine}</h1>
              </div>
            );
          });
    }
  }
  
  
  function Save(text){
    if(currentNoteId==null){
        setNotes((prevnotes)=>([...prevnotes,text]))
        localStorage.setItem("notes",notes)
    }else{
        setNotes(
            function(prevnotes){
                var updatednotes=[...prevnotes]
                updatednotes[currentNoteId]=text
                return updatednotes
            }
        )
        localStorage.setItem("notes",notes)

    }
    console.log(notes[0])
    setCurrentNoteId(null)

  }

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  React.useEffect(() => {
    // Check if notes array is not empty before setting current note id
    if (notes.length > 0) {
      try{
        setCurrentNoteId(notes[0].id); // Set to the first note id
      }catch{
        setCurrentNoteId(0)
      }
    }
  }, [notes]);

  return (
    <div className="page">
        <nav className="NavBar">
            <img src={Menu} onClick={handleMenuButton} height="40px"/>
            <h1>Notes App</h1>
        </nav>
        <div className={`SideBar ${isSideBarShowing?"active":""}`}>
            <SideBar className="SideBar" render={renderSideBar} clear={clear} delete={remove} currentNoteId={currentNoteId} notes={notes}/>
        </div>
        <Editor className="editor" note={notes[currentNoteId]} save={Save}/>
    </div>
  );
}

ReactDOM.render(<Page />, document.getElementById("root"));