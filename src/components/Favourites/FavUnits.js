import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Unit from "../../components/content/Units/Unit";
import Loader from "../../components/Loader/Loader";
import { db } from "../../config";
import { AuthContext } from "../../context/AuthContext";

function FavUnits() {

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [favouriteUnits, setFavouriteUnits] = useState([]);

  const getFavourite = async () => {
    const q = query(collection(db, "Favourites", `${user.email}`, "Units"), orderBy("id"));
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
        const url = `http://age-of-empires-2-api.vercel.app/api/units/byid?id=${fav}`;

        const reponses = await fetch(url);
        const results = await reponses.json();
        return results;
      })
    );
    setFavouriteUnits(favouritesArray)
    setLoading(false);
  };

  useEffect(() => {
    getFavourite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="favouriteTitle">Favourite Units</h1>
      {!loading ? (
              <div className='flex-container'>
              {favouriteUnits &&
                  favouriteUnits.map((unit) => {
                      return <Unit key={unit.id} data={unit} />;
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

export default FavUnits