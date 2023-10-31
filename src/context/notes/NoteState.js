import { createContext } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  const [curUserName, setCurUserName] = useState('Jay Khapre');
  const [load, setLoad] = useState(false);

  // Get all notes
  const getNotes = async () => {
      // setLoad(true);
      // har function ke pehle call karna h aur badme call karna h
    const response = await fetch(`https://enb1.onrender.com/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          `${localStorage.getItem('auth')}`,
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
//     setLoad(false);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
      // setLoad(true);
      // TODO: API Call
      // API Call 
      const response = await fetch(`https://enb1.onrender.com/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": `${localStorage.getItem('auth')}`
        },
        body: JSON.stringify({title, description, tag})
      });
  
      const note = await response.json();
      console.log(note);
      setNotes(notes.concat(note));
      // setLoad(false);
    };

  // Delete a Note
  const deleteNote = async (id) => {
      // setLoad(true);
    const response = await fetch(`https://enb1.onrender.com/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          `${localStorage.getItem('auth')}`,
      },
    });

    const json = await response.json();
    console.log(json);

    // fuckyoubitch api call krna baki h
    console.log("Deleting note with id ", id);
    const newNotes = notes.filter((note) => {
      return note._id != id;
    });
    setNotes(newNotes);
//     setLoad(false);
  };

  // Update a Note
  const editNote = async (id, title, description, tag) => {
      // setLoad(true);
    const response = await fetch(`https://enb1.onrender.com/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          `${localStorage.getItem('auth')}`,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    for(let ind = 0; ind < newNotes.length; ind++) {
      const element = newNotes[ind];
      if(element._id == id) {
            newNotes[ind].title = title;
            newNotes[ind].description = description;
            newNotes[ind].tag = tag;
            break;
      }
    }

    setNotes(newNotes);
//     setLoad(false);

  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, load, setLoad, curUserName, setCurUserName }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
