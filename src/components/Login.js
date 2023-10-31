import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import noteContext from "../context/notes/noteContext";

export default function Login(props) {

      const { load, setLoad, curUserName, setCurUserName } = useContext(noteContext);
      const [credentials, setCredentials] = useState({email: "", password: ""});
      let navigate = useNavigate();
      const onSubmit = async (e) => {
            setLoad(true);
            console.log(load);
            e.preventDefault();
            const response = await fetch(`https://enb1.onrender.com/api/auth/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            const json = await response.json();
            localStorage.setItem('auth', json.authToken);
            console.log(json);
   
            if(json.success == true) { 
                  const response = await fetch(`https://enb1.onrender.com/api/auth/getuser`, {
                        method: "GET",
                        headers: {
                              "Content-Type": "application/json",
                              "auth-token": `${localStorage.getItem('auth')}`,
                        },
                  });
                  const json = await response.json();
                  // console.log("something something", json);
                  // localStorage.setItem('auth', json.authToken);
                  // localStorage.setItem('userName', json.name);
                  setCurUserName(json.name);
                  localStorage.setItem('userName', json.name);
                  setLoad(false);
                  
                  navigate("/");
                  // swal("Hurray!", `Logged in Successfully`, "success");
                  props.showAlert("Logged in Successfully!", "success");
            } else {
                  setLoad(false);
                  swal("Error!", `${json.err}`, "error");
            }
      };

      const onchange = (e) => {
            setCredentials({...credentials, [e.target.name]: e.target.value});
            console.log(credentials.email, credentials.password);
      };

      if(!load)
  return (
    <div className="container">
<form >
  <div className="form-group my-2">
    <label htmlFor="exampleInputEmail1">Email address</label>
    {/* value dyachi garaj ahe ka kharach? */}
    <input type="email" className="form-control my-2" name="email" value={credentials.email} id="email" aria-describedby="emailHelp" 
    onChange={onchange}
    placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    {/* ikde value dyachi garaj ahe ka kharach? */}
    <input type="password" className="form-control my-2" id="password" value={credentials.password} name="password" onChange={onchange} placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary my-2" onClick={onSubmit}>Login</button>
</form>
    </div>
  );
}
