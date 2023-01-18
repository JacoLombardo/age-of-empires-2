import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useContext } from 'react'
import { db } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import './Chat.css'
import Delete from '../../Images/Icons/delete.png'
import { Link } from 'react-router-dom';

function Comment({unit, civilization, structure, technology, comment}) {

    const { user } = useContext(AuthContext);
    
    const commentDate = (date) => {
        return new Date(date * 1000).toLocaleString();
    };

    const removeComment = async () => {
        if (unit) {
            const querySnapshot = await getDocs(collection(db, "Comments", "Units", `Unit id-${unit.id}`));
            let myComment
            querySnapshot.forEach((doc) => {
            if (doc.data().date.seconds === comment.date.seconds) {
                myComment = doc.id
            }
        });
        await deleteDoc(doc(db, "Comments", "Units", `Unit id-${unit.id}`, `${myComment}`));

        } if (civilization) {
            const querySnapshot = await getDocs(collection(db, "Comments", "Civilizations", `Civilization id-${civilization.id}`));
            let myComment
            querySnapshot.forEach(async (doc) => {
                if (doc.data().date.seconds === comment.date.seconds) {
                    myComment = doc.id
                }
            });
            await deleteDoc(doc(db, "Comments", "Civilizations", `Civilization id-${civilization.id}`, `${myComment}` ));

        } if (technology) {
            const querySnapshot = await getDocs(collection(db, "Comments", "Technologies", `Technology id-${technology.id}`));
            let myComment
            querySnapshot.forEach((doc) => {
                if (doc.data().date.seconds === comment.date.seconds) {
                    myComment = doc.id
                }
            });
            await deleteDoc(doc(db, "Comments", "Technologies", `Technology id-${technology.id}`, `${myComment}`));
            
        } if (structure) {
            const querySnapshot = await getDocs(collection(db, "Comments", "Structures", `Structure id-${structure.id}`));
            let myComment
            querySnapshot.forEach((doc) => {
                if (doc.data().date.seconds === comment.date.seconds) {
                    myComment = doc.id
                }
            });
            await deleteDoc(doc(db, "Comments", "Structures", `Structure id-${structure.id}`, `${myComment}`));
        }
        console.log("Comment deleted: " + comment.text)
  };

  return (
      <>
          {comment.author === user.email ? (
              <div className="ownComments">
                  <Link><img onClick={removeComment} className="deleteIcon" src={Delete} alt="Delete" title="Delete your comment"></img></Link>
                  <p className="author">{comment.author}</p>
                  <p className="text">{comment.text}</p>
                  <p className="date">{commentDate(comment.date.seconds)}</p>
              </div>
          ) : (
                  <div className="comments">
                      <p className="author">{comment.author}</p>
                      <p className="text">{comment.text}</p>
                      <p className="date">{commentDate(comment.date.seconds)}</p>
                  </div>
              )}
      </>
  )
}

export default Comment