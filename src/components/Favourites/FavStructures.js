import React, { useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Structure from '../../components/content/Structures/Structure';
import Loader from "../../components/Loader/Loader";
import { db } from "../../config";
import { AuthContext } from "../../context/AuthContext";

function FavStructures() {

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [favouriteStructures, setFavouriteStructures] = useState([]);

  const getFavourite = async () => {
    const q = query(collection(db, "Favourites", `${user.email}`, "Structures"), orderBy("id"));
            onSnapshot(q, (querySnapshot) => {
            const myFav = [];
            querySnapshot.forEach((doc) => {
                myFav.push(doc.data().id);
            });
              fetchFavourites(myFav);
            });
  };

  const fetchFavourites = async (myFav) => {
    const favouritesArray = await Promise.all(
      myFav.map(async (fav) => {
        const url = `https://age-of-empires-2-api.vercel.app/api/buildings/byid?id=${fav}`;

        const reponses = await fetch(url);
        const results = await reponses.json();
        return results;
      })
    );
    setFavouriteStructures(favouritesArray)
    setLoading(false);
  };

  useEffect(() => {
    getFavourite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="favouriteTitle">Favourite Structures</h1>
      {!loading ? (
        <div className="flex-container">
          {favouriteStructures &&
            favouriteStructures.map((structure) => {
              return (
                <Structure
                  key={structure.id}
                  data={structure}
                />
              );
            })}
        </div>
      ) : (
        <div className="loaderDiv">
          <Loader />
        </div>
      )}
    </>
  )
}

export default FavStructures