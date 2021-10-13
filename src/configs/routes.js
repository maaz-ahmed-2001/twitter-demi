import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "../screens/authentication/signup";
import Login from "../screens/authentication/login";
import Welcome from "../screens/welcome";
import Navbar from "../components/navbar";
import { auth, onAuthStateChanged, db, doc, getDoc } from './firebase';


export default function Routes() {
    const { state, dispatch } = useContext(GlobalContext);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserInfo(user.uid);
                console.log(user.uid)
            }
            else {
                console.log('user not found');
            }
        })
    }, []);

    const fetchUserInfo = async (uid) => {
        let userRef = doc(db, 'users', uid);
        let userInfo = await getDoc(userRef);
        userInfo = userInfo.data();
        console.log(userInfo)
        dispatch({ type: "AUTH_USER", payload: userInfo });
    }
    return (
        <Router>
            <Switch>
                <Route path="/welcome">
                    <Welcome />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route exact path="">
                    <Login />
                </Route>
            </Switch>
        </Router>
    )


}