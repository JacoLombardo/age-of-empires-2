import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import './Chat.css'
import Comment from './Comment';

function Chat({unit, civilization, structure, technology}) {
    
    const { user } = useContext(AuthContext);
    const [chatComments, setChatComments] = useState([]);
    const [comment, setComment] = useState("");

    const getComments = async () => {
        if (unit) {
            const q = query(collection(db, "Comments", "Units", `Unit id-${unit.id}`), orderBy("date"));
            onSnapshot(q, (querySnapshot) => {
            const myComments = [];
            querySnapshot.forEach((doc) => {
                myComments.push(doc.data());
            });
            setChatComments(myComments);
        });
        } if (civilization) {
            const q = query(collection(db, "Comments", "Civilizations", `Civilization id-${civilization.id}`), orderBy("date"));
            onSnapshot(q, (querySnapshot) => {
            const myComments = [];
            querySnapshot.forEach((doc) => {
                myComments.push(doc.data());
            });
            setChatComments(myComments);
        });
        } if (structure) {
            const q = query(collection(db, "Comments", "Structures", `Structure id-${structure.id}`), orderBy("date"));
            onSnapshot(q, (querySnapshot) => {
            const myComments = [];
            querySnapshot.forEach((doc) => {
                myComments.push(doc.data());
            });
            setChatComments(myComments);
        });
        } if (technology){
            const q = query(collection(db, "Comments", "Technologies", `Technology id-${technology.id}`), orderBy("date"));
            onSnapshot(q, (querySnapshot) => {
            const myComments = [];
            querySnapshot.forEach((doc) => {
                myComments.push(doc.data());
            });
            setChatComments(myComments);
        });
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    
    const handleSubmitComment = async () => {
        try {
            if (unit) {
                await setDoc(doc(db, "Comments", "Units", `Unit id-${unit.id}`, `Comment from ${new Date()}`), {
                text: comment,
                date: new Date(),
                author: user.email,
            });
            } if (civilization) {
                await setDoc(doc(db, "Comments", "Civilizations", `Civilization id-${civilization.id}`, `Comment from ${new Date()}`), {
                text: comment,
                date: new Date(),
                author: user.email,
            });
            } if (structure) {
                await setDoc(doc(db, "Comments", "Structures", `Structure id-${structure.id}`, `Comment from ${new Date()}`), {
                text: comment,
                date: new Date(),
                author: user.email,
            });
            } if (technology) {
                await setDoc(doc(db, "Comments", "Technologies", `Technology id-${technology.id}`, `Comment from ${new Date()}`), {
                text: comment,
                date: new Date(),
                author: user.email,
            });
            }
            console.log("Comment posted: " + comment)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setComment("");
    };
    
    useEffect(() => {
        getComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
  return (
      <>
          <div className="commentDiv">
              {chatComments && chatComments.map((comment, index) => {
                  if (unit) { return <Comment key={index} comment={comment} unit={unit} /> }
                  if (civilization) { return <Comment key={index} comment={comment} civilization={civilization} /> }
                  if (structure) { return <Comment key={index} comment={comment} structure={structure} /> }
                  if (technology) { return <Comment key={index} comment={comment} technology={technology} /> }
              })}
              
              <div className="submit">
                  <input type="text" value={comment} className="submitInput" name="chat" onChange={handleCommentChange} placeholder="Write your comment" />
                  <button  className="submitButton" onClick={handleSubmitComment}>Post</button>
              </div>
          </div>
      </>
  )
}

export default Chat