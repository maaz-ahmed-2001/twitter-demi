import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
// import "./signup.css"
import logo from "../../resources/Twitter-1.jpg"
import { auth, createUserWithEmailAndPassword, db, setDoc, doc } from "../../configs/firebase";
import { GlobalContext } from "../../context/context";


export default function SignUp() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { state, dispatch } = useContext(GlobalContext)

    return (
        <>
            <div id="twitter">
                <img src={logo} alt="Twitter" id="T-logo" />
            </div>
            <div id="form-container">
                <div id="signup">
                    <h1 className="signup-h">Join <b id="twitter-h">Twitter</b> Now.</h1>
                    <h2 className="signup-h">Create your account</h2>
                    <input type="text" value={userName} onChange={(event) => { setUserName(event.target.value) }} placeholder="Username" className="signup-inp" /><br />
                    <span className="signup-err"></span>
                    <input type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} placeholder="Email Address" className="signup-inp" /><br />
                    <span className="signup-err"></span>
                    <input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} placeholder="Password" className="signup-inp" /><br />
                    <span className="signup-err"></span>
                    <p className="acc-text">Already have an account ? <b className="account" onClick={() => { history.push("") }}>Sign in</b></p>
                    <button id="sign-btn" onClick={() => { createAcc() }}>Sign up</button>
                </div>
            </div>

        </>
    )
    async function createAcc() {
        try {
            let { user } = await createUserWithEmailAndPassword(auth, email, password)
            let dataRef = doc(db, 'users', user.uid)
            await setDoc(dataRef, {
                email: user.email,
                uid: user.uid,
                userName: userName,
            });
            history.push("/welcome")
            alert("Successfully created")
            
        } catch (e) {
            alert("Can't create an account")
        }
    }
}
