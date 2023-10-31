import React, { useContext, useEffect, useState } from "react";
import Alert from "./Alert";
import noteContext from "../context/notes/noteContext";

export default function About() {

      const { curUserName, setCurUserName } = useContext(noteContext);
      const [note, setNote] = useState({title: "", description: "", tag: ""});
      // const fetchUesr = async () => {
      //       const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      //             method: "GET",
      //             headers: {
      //                   "Content-Type": "application/json",
      //                   "auth-token": `${localStorage.getItem('auth')}`,
      //             },
      //       });
      //       const json = await response.json();
      // } 
      // useEffect( () => {
      //       fetchUser();
      // }, []);

  return (
      <>
      <h1>{`Welcome, ${localStorage.getItem('userName')}`}</h1>
      </>
  );


}
