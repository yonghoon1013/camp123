import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Footer() {
  return (
    <section className='footerBox'>
        <div>
        <ul>
            <li><Link to='/'><img src='./img/home.svg'></img></Link></li>
            <li><Link to='/'><img src='./img/favorite.svg'></img></Link></li>
            <li><Link to='/'><img src='./img/my.svg'></img></Link></li>
            <li><Link to='/'><img src='./img/set.svg'></img></Link></li>
        </ul>
        </div>
    </section>
  )
}

export default Footer