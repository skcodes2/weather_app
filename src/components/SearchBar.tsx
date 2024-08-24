import React, { useEffect, useState } from 'react'
import SearchItem from './SearchItem';
import { changeBackgroundColor } from '../Helpers/StylingHelpers';
import { useCurrentCity } from '../Helpers/CurrentCityContext';
import "../styles/components/SearchBar.css"
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
    
    const [searchResult, setSearchResult] = useState<Location[] | undefined>([])
    const {currentCity, searchInput, setSearchInput} = useCurrentCity()
    

    const maxNumberOfSearchResults = 10;
    if(searchInput!==""){
        changeBackgroundColor("black")
    }

    useEffect(()=>{
        search("")
    }, [currentCity])
    

    function search(searchValue: string) {
        
        if (searchValue === "") {
            setSearchResult([])
            changeBackgroundColor("transparent")
            setSearchInput("")
            return
        }
        
        setSearchInput(searchValue)
        let result: Location[] = cities.filter((city: Location) => city.name.toLowerCase().startsWith(searchValue.toLowerCase()))

        if (result.length > 7) {
            setSearchResult(result.slice(0, maxNumberOfSearchResults))
        }
        else {
            setSearchResult(result)
        }
    }

    return (
        <div>
        <div className='searchBar-container' >
                
                <i className="fas fa-search" style={{
                    position: 'absolute',
                    left: '10px',
                    fontSize: '2rem',
                    top: '51%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    zIndex: '100'

                }}>

                </i>
                
                <input type='text'
                    value={searchInput}
                    placeholder='Search For A City'
                    className='input'
                    maxLength={25}
                    onChange={(e) => search(e.target.value)}
                    
                />

        </div>
        <div className='searchItems'>
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

