import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import NavBar from '../.././components/NavBar/NavBar';
import Loader from '../.././components/Loader/Loader';
import { AuthContext } from '../.././context/AuthContext';
import Chat from '../.././components/Chat/Chat';

function DetailedCiv() {

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [detailedCivilization, setDetailedCivilization] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchCivilization = () => {
        const url = `http://age-of-empires-2-api.vercel.app/api/civilizations/byid?id=${id}`;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
              setDetailedCivilization(result);
              setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
  }
  
  useEffect(() => {
    fetchCivilization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="backgroundDiv">
        <br /><br />

        {!loading ? (
              <div className="detailedDiv">
          <h1 className="detailedTitle">{detailedCivilization.name}</h1>
        <div className="detailedInfo">
          <div>
            <div className="detailedInfo">
              <p className="classInfo">Expansion:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedCivilization.expansion}</p>
            </div>
            <div className="detailedInfo">
              <p className="classInfo">Army Type:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedCivilization.army_type}</p>
            </div>
                {detailedCivilization.unique_unit && <div className="detailedInfo">
                  <p className="classInfo">Unique Unit:&nbsp;&nbsp;&nbsp; </p>
                  <Link to={`/units/unit-${detailedCivilization.unique_unit[0].id}`} className="textInfo">{detailedCivilization.unique_unit[0].name}</Link>
                </div>}
                {detailedCivilization.unique_tech && <div className="detailedInfo">
                  <p className="classInfo">Unique Technology:&nbsp;&nbsp;&nbsp; </p>
                  <Link to={`/technologies/technology-${detailedCivilization.unique_tech[0].id}`} className="textInfo">{detailedCivilization.unique_tech[0].name}</Link>
                </div>}
            </div>
            <img className="detailedImgCiv" src={detailedCivilization.banner} alt={detailedCivilization.name}></img>
          </div>
          <div className="detailedInfo">
              <p className="classInfo">Team Bonus:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedCivilization.team_bonus}</p>
            </div>
            <div className="detailedInfo">
                <p className="classInfo">Civilization Bonus:&nbsp;&nbsp; </p>
                <div>
                  {detailedCivilization?.civilization_bonus?.map((bonus, index) => {
                  return <ul key={index} className="textInfo">{bonus}</ul>})}
                </div>
            </div>
            
            {user ? <hr className="hr3"></hr> : null}
            { user && <Chat civilization={detailedCivilization} />}

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

export default DetailedCiv