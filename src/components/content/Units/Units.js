import React, { useState, useEffect } from 'react';
import Unit from './Unit';
import Loader from '../../Loader/Loader';
import Pagination from '../../Pagination/Pagination';
import SearchBar from '../../SearchBar/SearchBar';
import NavBar from '../../NavBar/NavBar';
import '../../SearchBar/SearchBar.css';

function Units() {

  const [searchInput, setSearchInput] = useState("");
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  
  let filteredUnits = units;
  
  if (searchInput !== undefined && searchInput.length > 0) {
    filteredUnits = units.filter((unit) => {
      return unit.name.toLowerCase().includes(searchInput.toLowerCase());
    });
  };

  const fetchUnits = () => {
    const url = "https://age-of-empires-2-api.vercel.app/api/units/all";
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setUnits(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  return (
    <>
      <NavBar />
        <div className="backgroundDiv">
          <br/>
          <div className="searchBar" id="search-bar-units">
            <h1 className="discoverFont">Discover the Units</h1>
            <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
          </div>
          <br/>
          {!loading ? (
              <Pagination
            data={filteredUnits}
            RenderComponent={Unit}
            pageLimit={7}
            dataLimit={15}
          />
            ) : (
              <div className="loaderDiv">
                <Loader />
              </div>
        )}
      </div>
    </>
  )
}

export default Units