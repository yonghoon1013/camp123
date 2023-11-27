import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../Context';
import '../App.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


function Home() {
  const { locationApi, data } = useContext(MyContext);

  const [geolocation, setGeolocation] = useState({
    lat: null,
    long: null,
  });

  const getGeolocation = () => {
    if (navigator.geolocation) {
      // 위치 권한을 허용하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setGeolocation({
            lat,
            long,
          });
          locationApi('location', [long, lat]);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert('위치 설정을 허용해주세요!');
    }
  }

  useEffect(() => {
    getGeolocation();
  }, []);


  {/* <button onClick={getGeolocation}>d</button> */}
  return (
    <section className='homeBox'>
      <Header/>
      <div className='eventImgBox'>
      <Swiper className="slideBox2">
            <SwiperSlide className='tt'><img className='at' src='/img/img1.png'/></SwiperSlide>
            <SwiperSlide className='tt'><img className='at' src='/img/img2.png'/></SwiperSlide>
            <SwiperSlide className='tt'><img className='at' src='/img/img3.png'/></SwiperSlide>
            <SwiperSlide className='tt'><img className='at' src='/img/img4.png'/></SwiperSlide>
            <SwiperSlide className='tt'><img className='at' src='/img/img5.png'/></SwiperSlide>
        </Swiper>
      </div>
      
      <div className='nearbyLocation'>
        <p>내 근처 캠핑장</p>
        {/* <p>내 근처 캠핑장<span>(강남구)</span></p> */}
        <ul>
            {
              data.map((item) => (
                (item.firstImageUrl != '') ?
                  <li key={item.contentId}>
                    <Link to={`/detail/${item.contentId}`}>
                      <div className='left'>
                        <img src={item.firstImageUrl}></img>
                      </div>
                      <div className='right'>
                        <p className='title'>{item.facltNm}</p>
                        <p className='intro'>{item.intro}</p>
                      </div>
                    </Link>
                  </li>
                  : ''
              ))
            }
          </ul>
      </div>
    </section>
  );
}

export default Home;