import React, { useEffect, useState } from 'react'
import Structure from './Structure';
import Loader from '../../Loader/Loader';
import './Structures.css';
import SearchBar from '../../SearchBar/SearchBar';
import NavBar from '../../NavBar/NavBar';
import '../../SearchBar/SearchBar.css';
import Pagination from '../../Pagination/Pagination';

function Structures() {

  const [searchInput, setSearchInput] = useState("");
  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  let filteredStructures = structures
    
    if (searchInput.length > 0) {filteredStructures = 
        structures.filter((structure) => {
            return structure.name.toLowerCase().includes(searchInput.toLowerCase());
        });
    }

    const fetchStructures = () => {
        const url = "http://age-of-empires-2-api.vercel.app/api/buildings/all";
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setStructures(result);
                setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    useEffect(() => {
        fetchStructures();
    }, []);

  return (
    <>
      <NavBar />
        <div className="backgroundDiv">
          <br/>
          <div className="searchBar" id="search-bar-civ">
            <h1 className="discoverFont">Discover</h1>
            <h1 className="discoverFont">the Structures</h1>
            <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
          </div>
          <br/>
      {!loading ? (
              <Pagination
            data={filteredStructures}
            RenderComponent={Structure}
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
  )
}

export default Structures