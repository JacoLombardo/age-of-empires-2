import Technology from '../../components/content/Technologies/Technology';
import React, { useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Loader from "../../components/Loader/Loader";
import { db } from "../../config";
import { AuthContext } from "../../context/AuthContext";

function FavTechnologies() {

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [favouriteTechnologies, setFavouriteTechnologies] = useState([]);

  const getFavourite = async () => {
    const q = query(collection(db, "Favourites", `${user.email}`, "Technologies"), orderBy("id"));
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
        const url = `https://age-of-empires-2-api.vercel.app/api/technologies/byid?id=${fav}`;

        const reponses = await fetch(url);
        const results = await reponses.json();
        return results;
      })
    );
    setFavouriteTechnologies(favouritesArray)
    setLoading(false);
  };

  useEffect(() => {
    getFavourite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1 className="favouriteTitle">Favourite Technologies</h1>
      {!loading ? (
              <div className='flex-container'>
              {favouriteTechnologies &&
                  favouriteTechnologies.map((technology) => {
                      return <Technology key={technology.id} data={technology} />;
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

export default FavTechnologies