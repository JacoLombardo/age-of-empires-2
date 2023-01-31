import React from "react";
import { useState, useEffect } from "react";
import Civilization from "./Civilization";
import Loader from "../.././Loader/Loader";
import Pagination from "../.././Pagination/Pagination";
import SearchBar from "../.././SearchBar/SearchBar";
import "../../SearchBar/SearchBar.css";
import NavBar from "../.././NavBar/NavBar";

function Civilizations() {
  const [searchInput, setSearchInput] = useState("");
  const [civilizations, setCivilizations] = useState([]);
  const [loading, setLoading] = useState(true);

  let filteredCivilizations = civilizations;

  if (searchInput.length > 0) {
    filteredCivilizations = civilizations.filter((civilization) => {
      return civilization.name
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
  }

  const fetchCivilizations = () => {
    const url = "https://age-of-empires-2-api.vercel.app/api/civilizations/all";
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCivilizations(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchCivilizations();
  }, []);

  return (
    <>
      <NavBar />
      <div className="backgroundDiv">
        <br />
        <div className="searchBar" id="search-bar-civ">
          <h1 className="discoverFont">Discover the Civilizations</h1>
          <SearchBar
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
        </div>
        <br />
        {!loading ? (
          <Pagination
            data={filteredCivilizations}
            RenderComponent={Civilization}
            pageLimit={3}
            dataLimit={15}
          />
        ) : (
          <div className="loaderDiv">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}

export default Civilizations;
