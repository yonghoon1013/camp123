import axios from 'axios';
import { children, createContext, useEffect, useReducer } from 'react'
import React, { useState } from 'react';
import jsonDataIm from "./json/aa.json";

export const MyContext = createContext();


const insert = (state, action) => {
  switch (action.type) {
    default : return action.d;
  }
}

export default function Context({ children }) {
  const [data, dispatch] = useReducer(insert, []);
  const [selectedLocation, setSelectedLocation] = useState('강남구');
  const [selectedCity, setSelectedCity] = useState('서울시');
  const [keywordData,setKeywordData] = useState('');

  const instance = axios.create({
    baseURL: "https://apis.data.go.kr/B551011/GoCamping",
    params: {
      pageNo:"1",
      MobileOS:"WIN",
      MobileApp:"test",
      _type:"json"
    }
  })  


  const locationApi = async (type, instanceData) => {
    let res;
    switch (type) {
      // case "allData" :
      //   res = await instance.get(
      //     "/basedList?serviceKey=bXYJiC%2FIZu%2BuPKkZG0zN%2FDMCBKHjQb3VkKu%2FSWry5Cognwipp%2F33A80vX072IU9e1R%2FWFmWIO8B5Z1gFyyjUOw%3D%3D",
      //     {
      //       params:{
      //         numOfRows:"9999"
      //       }
      //     })
      //     res = res.data.response.body.items.item;
      // break;

      case "locationSearch" :
        res = await instance.get(
          "/basedList?serviceKey=bXYJiC%2FIZu%2BuPKkZG0zN%2FDMCBKHjQb3VkKu%2FSWry5Cognwipp%2F33A80vX072IU9e1R%2FWFmWIO8B5Z1gFyyjUOw%3D%3D",
          {
            params:{
              numOfRows:"9999"
            }
          })
        res = res.data.response.body.items.item.filter(item => item.doNm == selectedCity && item.sigunguNm == selectedLocation)
      break;

      case "search" :
        res = await instance.get(
          "/searchList?serviceKey=bXYJiC%2FIZu%2BuPKkZG0zN%2FDMCBKHjQb3VkKu%2FSWry5Cognwipp%2F33A80vX072IU9e1R%2FWFmWIO8B5Z1gFyyjUOw%3D%3D",
          {params:{
            keyword: instanceData,
            numOfRows: "9999"
          }}
          )
        res = res.data.response.body.items.item;

        if (!res || res.length === 0) {
          alert("일치하는 결과가 없습니다.");
          return;
        }

      break;

      case "location" :
        res = await instance.get(
          "/locationBasedList?serviceKey=bXYJiC%2FIZu%2BuPKkZG0zN%2FDMCBKHjQb3VkKu%2FSWry5Cognwipp%2F33A80vX072IU9e1R%2FWFmWIO8B5Z1gFyyjUOw%3D%3D",
          {
            params: {
              mapX: instanceData[0],
              mapY: instanceData[1],
              radius: "10000"
            }
          }        
          )
        res = res.data.response.body.items.item;
      break;
  }
    dispatch({type, d: res})

  }


  return (
    <MyContext.Provider value={{data, locationApi, selectedLocation, setSelectedLocation, selectedCity, setSelectedCity, keywordData, setKeywordData}}>
      {children}
    </MyContext.Provider>
  )
}
