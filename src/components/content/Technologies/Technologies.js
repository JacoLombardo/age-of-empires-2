import React, { useEffect, useState } from 'react';
import Technology from './Technology';
import './Technologies.css';
import Loader from '../../Loader/Loader';
import SearchBar from '../../SearchBar/SearchBar';
import NavBar from '../../NavBar/NavBar';
import '../../SearchBar/SearchBar.css';
import Pagination from '../../Pagination/Pagination';

function Technologies() {

  const [searchInput, setSearchInput] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  let filteredTechnologies = technologies

    if (searchInput.length > 0) {filteredTechnologies = 
        technologies.filter((technology) => {
          return technology.name.toLowerCase().includes(searchInput.toLowerCase())
            ||
            technology.description.toLowerCase().includes(searchInput.toLowerCase());
        });
    }

    const fetchTechnologies = () => {
        const url = "http://age-of-empires-2-api.vercel.app/api/technologies/all";
        fetch(url)
            .then((response) => response.json())
          .then((result) => {
              console.log(result)
                setTechnologies(result);
                setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
  }

  useEffect(() => {
    fetchTechnologies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
        <div className="backgroundDiv">
          <br/>
          <div className="searchBar" id="search-bar-civ">
            <h1 className="discoverFont">Discover the Technologies</h1>
            <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
          </div>
          <br/>
      {!loading ? (
              <Pagination
            data={filteredTechnologies}
            RenderComponent={Technology}
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

export default Technologies