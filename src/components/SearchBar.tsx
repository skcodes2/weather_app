import React, { useState } from 'react'
import SearchItem from './SearchItem';
const cities = require("../assests/cities.json")


type Location = {
    name: string;
    lat: string;
    lng: string;
    country: string;
    admin1: string;
    admin2: string;
    state: string;
};

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("")
    const [searchResult, setSearchResult] = useState<Location[] | undefined>([])

    function search(searchValue: string, event: any) {
        if (searchValue === "") {
            setSearchResult([])
            setSearchInput("")
            return
        }

        setSearchInput(searchValue)
        let result: Location[] = cities.filter((city: Location) => city.name.toLowerCase().startsWith(searchValue.toLowerCase()))

        if (result.length > 7) {
            setSearchResult(result.slice(0, 10))
        }
        else {
            setSearchResult(result)
        }
    }

    return (
        <div className='searchBar-container' >

            <div style={{ position: 'relative', display: 'inline-block' }}>
                <i className="fas fa-search" style={{
                    position: 'absolute',
                    left: '10px',
                    top: '51%',
                    transform: 'translateY(-50%)',
                    color: 'black',

                }}>
                </i>
                <input type='text'
                    value={searchInput}
                    placeholder='Search For A City'
                    className='searchBar-input'
                    maxLength={25}
                    onChange={(e) => search(e.target.value, e)}
                    style={{ paddingLeft: '30px', borderRadius: "10px", backgroundColor: "#1E2532", opacity: 0.5, color: "white", border: "2px solid #1E2532" }}
                />


            </div>

            <div>
                {searchResult && searchResult.map((city: Location) => (
                    <SearchItem

                        city={city.name}
                        country={city.country}
                        state={city.state}
                    />
                ))}
            </div>

        </div>
    )
}

