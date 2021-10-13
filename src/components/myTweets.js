import React, { useState, useContext, useEffect } from "react";
import { auth, doc, collection, getDoc, getDocs, db, query, where, onAuthStateChanged } from "../configs/firebase";
import { GlobalContext } from "../context/context";


export default function MyTweets() {
    let postId;
    const { state } = useContext(GlobalContext)
    const [myPost, setMyPost] = useState([])
    console.log(state.authUser.uid)
   
        onAuthStateChanged(auth, (user) => {
            if (user) {
                postId = user.uid;

                console.log(postId)
            }
            else {
                console.log('user not found');
            }
        })
    

    async function getMyTweets() {
        let postRef = collection(db, "Posts")
        console.log(state.authUser.uid)
        let posts = query(postRef, where("id", "==",postId))
        let myPosts = await getDocs(posts)
        console.log("hello", myPosts)
        let myPostClone = myPost.slice(0)
        myPosts.forEach((doc) => {
            myPostClone.push(doc.data())

        })
        setMyPost(myPostClone)



    }
    
    return (

        <div>
            {console.log(myPost)

            }
            {
                myPost.map(({ tweet, hashTag, time }, index) => (
                    <div key={index}>
                        <h3>{tweet}</h3>
                        <b>{hashTag}</b>
                        <br />
                        <i>{time}</i>
                    </div>
                )
                )
            }
        </div>
    )
}