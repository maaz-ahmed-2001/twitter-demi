import React, { useEffect, useContext, useState } from "react";
import { getDoc, getDocs, db, collection, doc } from "../configs/firebase";

export default function AllTweets() {
    const [tweets, setTweets] = useState([])
    useEffect(async () => {

        let postRef = collection(db, "Posts")
        let allPosts = await getDocs(postRef)
        console.log("hello", allPosts)
        let allTweetsClone = tweets.slice(0)
        allPosts.forEach((doc) => {
            allTweetsClone.push(doc.data())

        })
        setTweets(allTweetsClone)

        console.log(tweets)

    }, [])
    return (
        <div>
            {   
                tweets.map(({ tweet , hashTag , time }, index) => {
                    {console.log(tweets)}
                    <div key={index}>
                        <h3>{tweet}</h3>
                        <b>{hashTag}</b>
                        <br />
                        <i>{time}</i>
                    </div>

                })
            }
        </div>
    )
}