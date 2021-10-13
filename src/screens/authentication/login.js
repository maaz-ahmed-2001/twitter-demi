import react, { useState,useContext } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory, Link } from "react-router-dom";
// import "./signup.css"
import logo from "../../resources/Twitter-1.jpg"
import { auth,signInWithEmailAndPassword } from "../../configs/firebase";
import { GlobalContext } from "../../context/context";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const {state,dispatch} = useContext(GlobalContext)


    return (
        <>
            <div id="twitter">
                <img src={logo} alt="Twitter" id="T-logo" />
            </div>
            <div id="form-container">
                <div id="signup">
                    <h1 className="signup-h">Sign in to <b id="twitter-h">Twitter</b></h1>
                    <input type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} placeholder="Email Address" className="signup-inp" /><br />
                    <span className="signup-err"></span>
                    <input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} placeholder="Password" className="signup-inp" /><br />
                    <span className="signup-err"></span>
                    <p className="acc-text">Don't have an account ? <b className="account" onClick={()=>{history.push("/signup")}}>Create one</b></p>
                    <button id="sign-btn" onClick={loginUser}>Sign in</button>
                </div>
            </div>
        </>

    )
    async function loginUser(){
        try{
            let { user } = await signInWithEmailAndPassword(auth,email,password);
            dispatch({type : "LOGIN",payload : user})
            alert("Logged in successfully")
            history.push("/welcome")
        }
        catch(e){
            alert("An error occured during login", )
        }
    }
}
