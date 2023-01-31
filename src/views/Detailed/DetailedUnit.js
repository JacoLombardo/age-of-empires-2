import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../.././components/NavBar/NavBar";
import Loader from "../.././components/Loader/Loader";
import { AuthContext } from "../.././context/AuthContext";
import Chat from "../.././components/Chat/Chat";
import { Link } from "react-router-dom";

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
        <br />
        <br />
        {!loading ? (
          <div className="detailedDiv">
            <h1 className="detailedTitle">{detailedUnit.name}</h1>
            <div className="detailedInfo">
              <div className="div1">
                <div className="detailedInfo">
                  <p className="classInfo">Description:&nbsp;&nbsp;&nbsp; </p>
                  <p className="textInfo">{detailedUnit.description}</p>
                </div>
                <div className="detailedInfo">
                  <p className="classInfo">Expansion:&nbsp;&nbsp;&nbsp; </p>
                  <p className="textInfo">{detailedUnit.expansion}</p>
                </div>
                <div className="detailedInfo">
                  <p className="classInfo">Age:&nbsp;&nbsp;&nbsp; </p>
                  <p className="textInfo">{detailedUnit.age}</p>
                </div>
                {detailedUnit.attack_bonus && (
                  <div className="detailedInfo">
                    <p className="classInfo">Attack Bonus:&nbsp;&nbsp; </p>
                    <div>
                      {detailedUnit?.attack_bonus.map((bonus, index) => {
                        return (
                          <ul key={index} className="textInfo">
                            {bonus}
                          </ul>
                        );
                      })}
                    </div>
                  </div>
                )}
                {detailedUnit.trained_at && (
                  <div className="detailedInfo">
                    <p className="classInfo">Trained At:&nbsp;&nbsp;&nbsp; </p>
                    {detailedUnit.trained_at.length > 1 ? (
                      detailedUnit.trained_at.map((struc, index) => {
                        return (
                          <ul key={index}>
                            <Link
                              to={`/structures/s-${struc.id}`}
                              className="textInfo"
                            >
                              {struc.name}
                            </Link>
                          </ul>
                        );
                      })
                    ) : (
                      <Link
                        to={`/structures/s-${detailedUnit.trained_at[0].id}`}
                        className="textInfo"
                      >
                        {detailedUnit.trained_at[0].name}
                      </Link>
                    )}
                  </div>
                )}
                {detailedUnit.training_time && (
                  <div className="detailedInfoList">
                    <p className="classInfo">
                      Training Time:&nbsp;&nbsp;&nbsp;{" "}
                    </p>
                    <p className="textInfo">{detailedUnit.training_time}</p>
                  </div>
                )}
              </div>
              <img
                className="detailedImgCiv"
                src={detailedUnit.image}
                alt={detailedUnit.name}
              ></img>
            </div>
            <div className="detailedInfoList">
              <div>
                {detailedUnit.ability && (
                  <div className="detailedInfoList">
                    <p className="classInfo">Ability:&nbsp;&nbsp;&nbsp; </p>
                    {detailedUnit.ability.map((ability, index) => {
                      return (
                        <p className="textInfo" key={index}>
                          - {ability}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {user && <hr className="hr3"></hr>}
            {user && <Chat unit={detailedUnit} />}
          </div>
        ) : (
          <div className="loaderDiv">
            <Loader />
          </div>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default DetailedUnit;
