import React, { useContext,useState,useEffect } from "react";
import { GlobalContext } from "../context/context";
import { auth, signOut, db, getDocs, collection, query, where,onAuthStateChanged, doc, getDoc } from "../configs/firebase";

import dp from "../resources/dp.jpg"
import { useHistory } from "react-router";
import Navbar from "../components/navbar";
import Tweet from "../components/tweet";
import MyTweets from "../components/myTweets";



export default function Welcome() {
    const { state, dispatch } = useContext(GlobalContext)
    const [style,setStyle] = useState("sidebar")
    const history = useHistory()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserInfo(user.uid);
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
        }
    
    return (
        <div>
            <Navbar/>
            <div>
            <h1>Hello  </h1>
            <Tweet/>
            {/* <MyTweets/> */}
            </div>
            <div>

            </div>





            <div id="sidebar" className={state.style}>
                <span onClick={()=>{

                        setStyle("sidebar")
                        dispatch({type : "STYLE", payload : style})

                    }} id="collapse"><img src="https://img.icons8.com/color/48/000000/back--v1.png"/></span>
                <div id="img-div">
                    <img src={dp}/>
                    <div id="info">
                        <h2>Maaz Ahmed</h2>
                        <h5>maaz57512@gmail.com</h5>
                        <p id="follow"><span>0</span> Followers <span>0</span> Following</p>
                        </div>
                </div>
                <div id="main-div">
                    <ul>
                        <li className="sidebar-li"><img src="https://img.icons8.com/windows/32/000000/person-male.png"/> <span>Profile</span></li>
                        <li className="sidebar-li"><img src="https://img.icons8.com/windows/32/000000/shield.png"/> <span>Privacy</span></li>
                        <li className="sidebar-li"><img src="https://img.icons8.com/windows/32/000000/settings--v1.png"/><span>Settings</span></li>
                        <li className="sidebar-li" onClick={ async()=>{
                                await signOut(auth);
                                history.push("")
                        }}><img src="https://img.icons8.com/windows/32/000000/logout-rounded-down.png"/><span>Log out</span></li>

                    </ul>
                </div>
                <div id="footer">
                    <p>Copyright © 2021 all rights reserved</p>
                </div>
            </div>

        </div>
    )
}