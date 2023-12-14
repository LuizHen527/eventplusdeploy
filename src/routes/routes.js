import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

//Import dos componentes - PAGINAS

import EventosPage from "../pages/EventosPages/EventosPage";
import HomePage from "../pages/HomePage/HomePage";
import TipoEventosPage from '../pages/TipoEventosPage/TipoEventosPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import TestePage from '../pages/TestePage/TestePage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'
import { PrivateRoute } from './PrivateRoute';
import EventosAlunoPage from '../pages/EventosAlunoPage/EventosAlunoPage';
import DetalhesEventoPage from '../pages/DetalhesEventoPage/DetalhesEventoPage';

const Rotas = () => {
    return (
        <BrowserRouter>
        <Header />
            <Routes>
                <Route element={ <HomePage />} path={"/"} exact />
                <Route 
                element={ 
                    <PrivateRoute>
                        <EventosPage />
                    </PrivateRoute>
                    
                } 
                path={"/eventos"} exact />
                <Route 
                path={"/tiposeventos"} exact
                element={ 
                    <PrivateRoute>
                        <TipoEventosPage />
                    </PrivateRoute>
                } 
                 />

                <Route 
                path={"/eventos-aluno"}
                element={ 
                    <PrivateRoute>
                        <EventosAlunoPage />
                    </PrivateRoute>
                } 
                 />


                <Route element={ <LoginPage />} path={"/login"} exact />
                <Route element={ <TestePage />} path={"/testes/:idEvento"} exact />
                <Route element={ <DetalhesEventoPage />} path={"/detalhes-evento/:idEvento"} exact />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
};

export default Rotas;