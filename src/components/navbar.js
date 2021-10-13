import React , {useState,useContext,useEffect} from "react";
import { GlobalContext } from "../context/context";
import "../screens/authentication/signup.css"
import dp from "../resources/dp.jpg"
import "../screens/authentication/signup.css"
import { auth, onAuthStateChanged, db, doc, getDoc } from '../configs/firebase';





export default function Navbar(){
    const {state , dispatch} = useContext(GlobalContext)
    const [style , setStyle] = useState("sidebar")
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
    return(
        <header>
            <nav>
            <ul id ="nav">
                <li className="ul-li" onClick={()=>{
                    
                        setStyle("sidebar-rev")
                        dispatch({type : "STYLE", payload : style})

                        }} ><img src={dp} id="nav-dp"/></li>
                <li className="ul-li"><img src="https://img.icons8.com/color/48/000000/twitter.png"/></li>
                <li className="ul-li">Profile</li>
            </ul>
            </nav>
        </header>
    )
}