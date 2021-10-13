import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/context";
import { auth, db, getDocs, collection, query, where, doc, getDoc, setDoc, onAuthStateChanged,addDoc } from "../configs/firebase";
import AllTweets from "./allTweets";

export default function Tweet() {
    const [tweet, setTweet] = useState("")
    const [hashTag, setHashTag] = useState("")
    const date = new Date();
    const { State, dispatch } = useContext(GlobalContext)
    let uid;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid
            
        }
        else {
            console.log('user not found')
        }
    })
    return (
        <div>
            <textarea placeholder="Your thoughts..." value={tweet} onChange={(e) => { setTweet(e.target.value) }} />
            <input type="text" value={hashTag} onChange={(e) => { setHashTag(e.target.value) }} />
            <button onClick={() => {
                postTweet()
            }}>Tweet</button>
            <AllTweets/>
        </div>
    )
    async function postTweet() {
        let postRef = await addDoc(collection(db, "Posts"),
        {
            id: uid,
            tweet: tweet,
            hashTag: hashTag,
            time: date.toDateString()
        }) 
        
        alert("Tweeted!!!")
    }
}