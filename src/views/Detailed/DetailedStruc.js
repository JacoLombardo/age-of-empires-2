import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import NavBar from '../.././components/NavBar/NavBar';
import Loader from '../.././components/Loader/Loader';
import { AuthContext } from '../.././context/AuthContext';
import Chat from '../.././components/Chat/Chat';

function DetailedStruc() {

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [detailedStructure, setDetailedStructure] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchStructure = () => {
        const url = `http://age-of-empires-2-api.vercel.app/api/buildings/byid?id=${id}`;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
              setDetailedStructure(result);
              setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
  }
  
  useEffect(() => {
    fetchStructure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="backgroundDiv">
        <br /><br />

        {!loading ? (
              <div className="detailedDiv">
          <h1 className="detailedTitle">{detailedStructure.name}</h1>
        <div className="detailedInfo">
          <div>
            <div className="detailedInfo">
              <p className="classInfo">Expansion:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedStructure.expansion}</p>
            </div>
            <div className="detailedInfo">
              <p className="classInfo">Type:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedStructure.type}</p>
            </div>
            <div className="detailedInfo">
              <p className="classInfo">Age:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedStructure.age}</p>
            </div>
            </div>
            <img className="detailedImgCiv" src={detailedStructure.image} alt={detailedStructure.name}></img>
          </div>
          <div className="detailedInfo">
              <p className="classInfo">Build Time:&nbsp;&nbsp;&nbsp; </p><p className="textInfo">{detailedStructure.build_time}</p>
            </div>
            <div className="detailedInfo">
                <p className="classInfo">Use:&nbsp;&nbsp; </p>
                <div>
                  {detailedStructure.use?.map((use, index) => {
                  return <ul key={index} className="textInfo">{use}</ul>})}
                </div>
            </div>
            
            {user ? <hr className="hr3"></hr> : null}
            { user && <Chat Structure={detailedStructure} />}

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

export default DetailedStruc