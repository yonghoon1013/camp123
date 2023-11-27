import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../Context';
import { useParams } from 'react-router-dom';
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from 'axios';

const { kakao } = window;

function Detail() {
  const { data, loading } = useContext(MyContext);
  const { contentId } = useParams();
  const [imgUrl, setImgUrl] = useState([]);
  const [detailData,setDetailData] = useState([])
  const [f,setF] = useState([]); 
  const [introOn,setIntroOn] = useState(false);
  const detailItem = data.find((item) => item.contentId === contentId);

 

  const test = () => {
    if(detailItem){
      localStorage.setItem('detailKey', JSON.stringify(detailItem));
      const detailLocal = JSON.parse(localStorage.getItem('detailKey'));
      setDetailData(detailLocal);
      setF(detailData.sbrsCl);
    } else{
      const detailLocal = JSON.parse(localStorage.getItem('detailKey'));
      setDetailData(detailLocal);
      setF(detailData.sbrsCl);
    }
  }


  const imgLoad = () => {
    axios.get(`https://apis.data.go.kr/B551011/GoCamping/imageList?numOfRows=50&pageNo=1&MobileOS=WIN&MobileApp=test&serviceKey=bXYJiC%2FIZu%2BuPKkZG0zN%2FDMCBKHjQb3VkKu%2FSWry5Cognwipp%2F33A80vX072IU9e1R%2FWFmWIO8B5Z1gFyyjUOw%3D%3D&_type=json&contentId=${contentId}`)
      .then(res => {
        const imgs = res.data.response.body.items.item.map(item => item.imageUrl);
        setImgUrl(imgs);
      })
  }


  const kakaoMap = () => {
    if (detailData && detailData.mapX && detailData.mapY) {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(detailData.mapY, detailData.mapX),
        level: 3
      };
      const map = new kakao.maps.Map(container, options);
  
      var markerPosition = new kakao.maps.LatLng(detailData.mapY, detailData.mapX);
  
      var marker = new kakao.maps.Marker({
        position: markerPosition
      });
  
      marker.setMap(map);
    }
  };


  useEffect(() => {
    test();
    imgLoad();
  }, [contentId]);
  
  useEffect(() => {
    if (detailData && detailData.sbrsCl) {
      setF(detailData.sbrsCl.split(','));
    }
    kakaoMap();
  }, [detailData]);

  // const dd = detailData.sbrsCl.split(',');

  const imageMappings = {
    '전기': '/img/ico_volt.png',
    '무선인터넷': '/img/ico_wifi.png',
    '온수': '/img/ico_hotwater.png',
    '놀이터': '/img/ico_playzone.png',
    '장작판매': '/img/ico_wood.png',
    '물놀이장': '/img/ico_pool.png',
    '운동시설': '/img/ico_sports.png',
    '트렘폴린': '/img/ico_tramp.png',
    '산책로': '/img/ico_walk.png',
    '운동장': '/img/ico_ground.png',
    '마트.편의점': '/img/ico_mart.png'
  };



  return (
      <section className='detailBox'>
        <Swiper className="slideBox">
          {imgUrl.map((imgUrl, index) => (
            <SwiperSlide key={index} className='tt'>
              <img src={imgUrl} />
            </SwiperSlide>
          ))}
        </Swiper>

          <div className='detailCon'>
          <div className='campInfo'>
          <div className='titleBox'>
            <span className='title'>{detailData.facltNm}</span>
          </div>
          <div className='adrBox'>
            <span>{detailData.addr1}</span>
          </div>
          <div className='telBox'>
            <span className='tel'>{detailData.tel}</span>
          </div>
          <div className='homepageBox'>
            <a href={detailData.homepage} target='_blank' className='homepage'>{detailData.homepage}</a>
          </div>
        </div>

        <div className='campIntro'>
          <h3>캠핑장소개</h3>
          <div className='qwe'>
            <p>
              {detailData.intro}
            </p>
            <button onClick={() => setIntroOn(true)}>더보기</button>
            <div className={`introFull ${introOn ? "on" : "off"}`}>
              <div onClick={()=> setIntroOn(false)} className='close'>X</div>
              <p>
              {detailData.intro}
              </p>
            </div>
          </div>
        </div>

        <div className='campBasic'>
          <h3>기본정보</h3>
          <ul>
            <li>캠핑장 유형 :  {detailData.induty}</li>
            <li>테마환경 : {detailData.themaEnvrnCl}</li>
            <li>애완동물 출입 : {detailData.animalCmgCl}</li>
          </ul>
        </div>

        <div className='campFacility'>
          <div>
            <h3>시설정보</h3>
          </div>
          <ul>
             {
              f && f.slice(0, 5).map((item, index) => (
                <li key={index}>
                  <img src={imageMappings[item]} />
                  <span>{item}</span>
                </li>
              ))
            } 
          </ul>
        </div>

        <div className='campMap'>
          <div id="map" style={{
            width: '400px',
            height: '200px'
          }}></div>
        </div>
          </div>
      </section>
  )
}

export default Detail