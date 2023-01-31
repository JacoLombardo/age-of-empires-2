import React, { useContext, useEffect, useState } from 'react';
import './Units.css';
import { Link } from 'react-router-dom';
import FavouriteIcon from '../../../Images/Icons/favourite1.png';
import FavouritedIcon from '../../../Images/Icons/favourited1.png';
import Info from '../../../Images/Icons/info1.png';
import { db } from '../../../config';
import { AuthContext } from '../../../context/AuthContext';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';

function Unit({ data }) {

  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);
  const [changeImg, setChangeImg] = useState(false);

  const addFavourite = async () => {
    try {
      await setDoc(doc(db, "Favourites", `${user.email}`, "Units", `${data.id}`), {
        name: data.name,
        id: data.id,
      });
      console.log(data.name + " added to favourites!")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setChangeImg(true);
  };

  const removeFavourite = async () => {
    try {
      await deleteDoc(doc(db, "Favourites", `${user.email}`, "Units", `${data.id}`));
      console.log(data.name + " removed from favourites!")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setChangeImg(false);
  };

  const getFavourite = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Favourites", `${user.email}`, "Units"));
      const myFav = [];
      querySnapshot.forEach((doc) => {
        myFav.push(doc.data().id);
      });
        setFavourites(myFav);
    } catch (error) {
      console.log("error", error);
    };
  };

  useEffect(() => {
    if (user) {
        getFavourite();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cardUnit">
        <img className="cardImgUnit" src={data.image} alt={data.name}></img>
        <div className="cardBodyUnit">
          <h1 className="titleUnit">{data.name}</h1>
          {user &&
            (favourites.length !== 0 ? favourites.map(() => {
              return (favourites.includes(data.id) ?
                <Link onClick={removeFavourite} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}><img src={FavouritedIcon} alt="favourited" title="In your favourites" className="favouriteIconCiv"></img></Link>
                :
                (
                  !changeImg ? <Link onClick={addFavourite} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}><img src={FavouriteIcon} alt="favourite" title="Add to favourites!" className="favouriteIconCiv"></img></Link>
                    :
                    <Link onClick={removeFavourite} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}><img src={FavouritedIcon} alt="favourited" title="In your favourites" className="favouriteIconCiv"></img></Link>
                ))
            }) : <Link onClick={addFavourite} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}><img src={FavouriteIcon} alt="favourite" title="Add to favourites!" className="favouriteIconCiv"></img></Link>)}
        </div>
        <Link to={`unit-${data.id}`}><img src={Info} alt="info" title="More info" className="infoUnits"></img></Link>
      </div>
    </>
  )
}

export default Unit