import React, { useState } from 'react';
import './Header.css';
import Container from "../Container/Container";
import Nav from '../Nav/Nav';
import PerfilUsuario from '../PerfilUsuario/PerfilUsuario';

import menubar from '../../assets/images/menubar.png';

import { Link } from "react-router-dom";

const Header = () => {

    const [exibeNavbar, setExibeNavbar] = useState(false);
    return (
        <header className='headerpage'>
            <Container>
                <div className='header-flex'>
                    <img src={menubar} alt="Serve para exibir e esconder o menu no smartphone" onClick={() => {setExibeNavbar(true)}} className="headerpage__menubar"/>
                    

                    <Nav exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} />
                    <PerfilUsuario />
                </div>
            </Container>
        </header>
    );
};

export default Header;