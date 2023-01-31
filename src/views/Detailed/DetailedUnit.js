import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../.././components/NavBar/NavBar'
import Loader from '../.././components/Loader/Loader';
import { AuthContext } from '../.././context/AuthContext';
import Chat from '../.././components/Chat/Chat';
import { Link } from 'react-router-dom';

function DetailedUnit() {

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [detailedUnit, setDetailedUnit] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchUnit = () => {
    const url = `https://age-of-empires-2-api.vercel.app/api/units/byid?id=${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setDetailedUnit(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchUnit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="backgroundDiv">
        <br /><br />

        {!loading ? (
              <div className="detailedDiv">
          <h1 className="detailedTitle">{detailedUnit.name}</h1>
        <div className="detailedInfo">
            <div className="div1">
              <div className="detailedInfo">
              <p className="classInfo">Description:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.description}</p>
            </div>
            <div className="detailedInfo">
              <p className="classInfo">Expansion:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.expansion}</p>
            </div>
            <div className="detailedInfo">
              <p className="classInfo">Age:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.age}</p>
            </div>
            {detailedUnit.attack_bonus && <div className="detailedInfo">
                <p className="classInfo">Attack Bonus:&nbsp;&nbsp; </p>
                   <div>
                    {detailedUnit?.attack_bonus.map((bonus, index) => {
                      return <ul key={index} className="textInfo">{bonus}</ul>
                    })}
                  </div>
              </div>}
              {detailedUnit.trained_at && <div className="detailedInfo">
                  <p className="classInfo">Trained At:&nbsp;&nbsp;&nbsp; </p>
                  <Link to={`structures/s-${detailedUnit.trained_at[0].id}`} className="textInfo">{detailedUnit.trained_at[0].name}</Link>
                </div>}
            </div>
              <img className="detailedImgCiv" src={detailedUnit.image} alt={detailedUnit.name}></img>
          </div>
          <div className="detailedInfoList">
            <div>
                {detailedUnit.build_time && <div className="detailedInfoList">
                  <p className="classInfo">Build Time:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.build_time}</p>
                </div>}
                {detailedUnit.reload_time && <div className="detailedInfoList">
                  <p className="classInfo">Reload Time:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.reload_time}</p>
                </div>}
                {detailedUnit.attack_delay && <div className="detailedInfoList">
                  <p className="classInfo">Attack Delay:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.attack_delay}</p>
                </div>}
          <div className="detailedInfoList">
              <p className="classInfo">Movement Rate:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.movement_rate}</p>
          </div>
            </div>
            <div>
              <div className="detailedInfoList">
              <p className="classInfo">Line of Sight:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.line_of_sight}</p>
          </div>
          <div className="detailedInfoList">
              <p className="classInfo">Hit Points:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.hit_points}</p>
          </div>
                {detailedUnit.range && <div className="detailedInfoList">
                  <p className="classInfo">Range:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.range}</p>
                </div>}
                {/* {detailedUnit.attack && <div className="detailedInfoList">
                  <p className="classInfo">Attack:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.attack}</p>
                </div>} */}
              </div>
              <div>
                {/* {detailedUnit.armor && <div className="detailedInfoList">
                  <p className="classInfo">Armor:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.armor}</p>
                </div>} */}
          {detailedUnit.accuracy && <div className="detailedInfoList">
              <p className="classInfo">Accuracy:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedUnit.accuracy}</p>
          </div>}
            </div>
            </div>
          { user && <hr className="hr3"></hr>}
          { user && <Chat unit={detailedUnit} />}
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

export default DetailedUnit