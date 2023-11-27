import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context'
import { Link } from 'react-router-dom';
import Header from '../component/Header';

function List() {
  let { data, locationApi, selectedLocation, setSelectedLocation, selectedCity, setSelectedCity, keywordData, setKeywordData } = useContext(MyContext)
  let [num, setNum] = useState(10);

  useEffect(()=>{
    setNum(10);
  }, [data])


  return (
      <section className='listBox'>
        <Header/>
      <div className='listCon'>
          <p>{data.length}개의 검색 결과</p>
            <ul>
            {
            data.slice(0, num).map((v) => (
              (v.firstImageUrl !='') ? 
              <li key={v.contentId}>
                <Link to={`/detail/${v.contentId}`}>
                  <div className='imgBox'>
                    <img src={v.firstImageUrl}></img>
                  </div>
                  <div className='infoBox'>
                    <p className='title'>{v.facltNm}</p>
                    <p className='type'>{v.induty}</p>
                    <p className='adr'>{v.addr1}</p>
                  </div>
                </Link>
              </li>
              :''
            ))
          }
            </ul>

        </div>

        <div className='moreBox'>
          <button onClick={()=>{setNum(num + 10)}} className='moreBtn'>More</button>
        </div>
      </section>
  )
}

export default List