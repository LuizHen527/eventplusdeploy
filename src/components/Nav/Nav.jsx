import React, { useContext } from 'react';
import './Nav.css';

import logoMobile from '../../assets/images/logo-white.svg';
import logoDesktop from '../../assets/images/logo-pink.svg';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';

const Nav = ({exibeNavbar, setExibeNavbar}) => {
    const {userData} = useContext(UserContext)

    console.log(`EXIBE O MENU ${exibeNavbar}`);
    return (
        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
            <span onClick={() => {setExibeNavbar(false)}} className='navbar__close'>x</span>

            <Link to="/" className='eventlogo'>
                <img className='eventlogo__logo-image' src={window.innerWidth >= 992 ? logoDesktop : logoMobile} alt="Event plus logo"/>
            </Link>

            <a href="" className='eventlogo'>
                <img className='eventlogo__logo-image' src={logoMobile} alt="" />
            </a>
            
            <div className='navbar__items-box'>
                <Link className='navbar__item' to="/">Home</Link>
                {userData.nome && userData.role === "adm" ? (
                    <>
                        <Link className='navbar__item' to="/tiposeventos">Tipos Eventos</Link>
                        <Link className='navbar__item' to="/eventos">Eventos</Link>
                    </>
                ) : userData.nome && userData.role === "comum" ?
                (
                    <Link className='navbar__item' to="/eventos-aluno">Eventos Aluno</Link>
                ) : null}
                
                
                {/* <Link className='navbar__item' to="/login">Login</Link> */}
            </div>
        </nav>
    );
};

export default Nav;