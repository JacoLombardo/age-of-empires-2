import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import NavBar from '../.././components/NavBar/NavBar';
import Loader from '../.././components/Loader/Loader';
import { AuthContext } from '../.././context/AuthContext';
import Chat from '../.././components/Chat/Chat';

function DetailedTech() {

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [detailedTechnology, setDetailedTechnology] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchTechnology = () => {
        const url = `https://age-of-empires-2-api.vercel.app/api/technologies/byid?id=${id}`;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
              setDetailedTechnology(result);
              setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
  }
  
  useEffect(() => {
    fetchTechnology();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="backgroundDiv">
        <br /><br />

        {!loading ? (
              <div className="detailedDiv">
          <h1 className="detailedTitle">{detailedTechnology.name}</h1>
        <div className="detailedInfo">
          <div>
            <div className="detailedInfo">
              <p className="classInfo">Expansion:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedTechnology.expansion}</p>
            </div>
            <div className="detailedInfo">
              <p className="classInfo">Type:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedTechnology.type}</p>
            </div>
            <div className="detailedInfo">
              <p className="classInfo">Age:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedTechnology.age}</p>
            </div>
                {detailedTechnology.researched_at && <div className="detailedInfo">
                  <p className="classInfo">Researched At:&nbsp;&nbsp;&nbsp; </p>
                  <Link to={`/structures/s-${detailedTechnology.researched_at[0].id}`} className="textInfo">{detailedTechnology.researched_at[0].name}</Link>
                </div>}
            </div>
            <img className="detailedImgCiv" src={detailedTechnology.image} alt={detailedTechnology.name}></img>
          </div>
          <div className="detailedInfo">
              <p className="classInfo">Research Time:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedTechnology.research_time}</p>
            </div>
            <div className="detailedInfo">
                <p className="classInfo">Effect:&nbsp;&nbsp; </p>
                <div>
                  {detailedTechnology.effect?.map((effect, index) => {
                  return <ul key={index} className="textInfo">{effect}</ul>})}
                </div>
            </div>
            
            {user ? <hr className="hr3"></hr> : null}
            { user && <Chat Technology={detailedTechnology} />}

        </div>
            ) : (
              <div className="loaderDiv">
                <Loader />
              </div>
          )}
        <br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </>
  )
}

export default DetailedTech