import React, { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from '../Context';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import jsonData from "../json/aa.json";



function Header() {
    const { data, locationApi, selectedLocation, setSelectedLocation, selectedCity, setSelectedCity, keywordData, setKeywordData} = useContext(MyContext);
    const [locationToggle, setLocationToggle] = useState(false);
    const elCity = useRef();
    const elLocation = useRef();
    const nav = useNavigate();
    const path = useLocation();

    useEffect(() => {
        setLocationToggle(false)
    }, [path.pathname])

    useEffect(() => {
        if (jsonData[selectedCity]) {
            setSelectedLocation(jsonData[selectedCity][0]?.지역 || '');
        } else {
            setSelectedLocation('');
        }
    }, [jsonData, selectedCity]);

    const keywordSubmit = (e) => { 
        e.preventDefault();

        if (!keywordData.trim()) {
            alert("검색어를 입력해주세요.")
            return;
        }


        locationApi('search', keywordData);
        nav("/list")
    }

    const locationSubmit = (e) => {
        e.preventDefault();
        if (selectedLocation) {
            locationApi('locationSearch', "");
        }
        setLocationToggle(false)
        nav('/list');
    };
    
    const dataZusamm = () => {
        setSelectedCity(elCity.current.value);
        setSelectedLocation(elLocation.current.value);
    }




    return (
        <div className='headBox'>
            <div className='as'>
            <Link to={'/'}>캠핑 여기 어떄?</Link>
            </div>
            <div className='search-box'>
                <form>
                    <input onChange={(e) => setKeywordData(e.target.value)} value={keywordData} type='text'  placeholder='검색어 입력하세요'></input>
                    <input onClick={ (e) => keywordSubmit(e) } id='keyword-btn' className='submit-btn' type='submit'></input>
                    <label htmlFor='keyword-btn'></label>
                </form>
                <div onClick={()=>{setLocationToggle(!locationToggle)}} className='location-menu'>
                    <img src='/img/location-white.png'></img>
                </div>

                <div className={`location-search-box ${locationToggle ? 'on' : ''}`}>
                    <p onClick={()=>{setLocationToggle(!locationToggle)}} className='close'>X</p>
                    <p className='title'>지역별 검색</p>

                    <div className='location-form'>
                        <form>
                            <select ref={elCity} onChange={()=>{dataZusamm()}} value={selectedCity}>
                                {Object.keys(jsonData).map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>

                            <select ref={elLocation} onChange={()=>{dataZusamm()}} value={selectedLocation}>
                                {jsonData[selectedCity]?.map((location, index) => (
                                    <option key={index} value={location.지역}>
                                        {location.지역}
                                    </option>
                                ))}
                            </select>

                            <button onClick={(e) => locationSubmit(e)}>검색</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header