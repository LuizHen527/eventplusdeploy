import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import "./EventosPage.css";
import MainContent from '../../components/MainContent/MainContent';
import Container from '../../components/Container/Container';
import Title from '../../components/Titulo/Titulo';
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator';
import api, { eventsResource, eventsTypeResource } from "../../Services/Services";
import Notification from "../../components/Notification/Notification";

import eventoImage from '../../assets/images/evento.svg';
import { Button, Input, Select } from '../../components/FormComponents/FormComponents';
import TableTp from '../TipoEventosPage/TableTp/TableTp';
import TableEv from './TableEv/TableEv';

const EventosPage = () => {

    const [frmEdit, setFrmEdit] = useState(false);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [eventos, setEventos] = useState([]);
    const [notifyUser, setNotifyUser] = useState();
    const [showSpinner, setShowSpinner] = useState(false);
    const [tipoEventos, setTipoEventos] = useState([]);
    const [frmData, setFrmData] = useState({
        "dataEvento": "",
        "nomeEvento": "",
        "descricao": "",
        "idTipoEvento": "",
        "idInstituicao": "22a2dfe6-ba24-4229-9489-d3c7a8cba57a"
    });
    const [idEvento, setIdEvento] = useState(null); 
    const [frmEditData, setFrmEditData] = useState([])

    async function loadEvents() {
        try {

            const retorno = await api.get(eventsResource);
            setEventos(retorno.data);
            console.log(retorno.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {


        async function loadTypeEvents() {
            try {
                const retorno = await api.get(eventsTypeResource);

                const dados = await (retorno.data.map(tipoEvento => {
                    return { value: tipoEvento.idTipoEvento, text: tipoEvento.titulo }
                }));

                setTipoEventos(dados)
                
                //console.log(retorno.data);
            } catch (error) {
                console.log(error);
            }
        }

        loadEvents();
        loadTypeEvents();
    }, [])

    


    async function handleUpdate(e) {
        e.preventDefault();

        try {
            const promise = await api.put(`${eventsResource}/${frmEditData.idEvento}`, 
            {
                nomeEvento: frmEditData.nomeEvento,
                dataEvento: frmEditData.dataEvento,
                descricao: frmEditData.descricao,
                idInstituicao: frmEditData.idInstituicao,
                idTipoEvento: frmEditData.idTipoEvento,

            });

            if(promise.status === 204){
                const buscaEventos = await api.get(eventsResource);
                setEventos(buscaEventos.data);
            }
        } catch (error) {
            
        }

        setFrmEditData({});
        setFrmEdit(false);
        return;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(frmData);

        try {
            const promise = await api.post(eventsResource, frmData);

            loadEvents();
        } catch (error) {
            
        }
    }

    async function showUpdateForm(evento) {
        setFrmEditData(evento);
        setFrmEdit(true);
    }

    async function handleDelete(idElement) {
        if (! window.confirm('Confirma exclusao?')) {
            return;
        }

        setShowSpinner(true);

        try {
            const promise = await api.delete(`${eventsResource}/${idElement}`);

            if (promise.status === 204) {
      
                setNotifyUser({
                  titleNote: "Título não informado",
                  textNote: "Mensagem não informada",
                  imgIcon: "default",
                  imgAlt: "Icone da ilustração",
                  showMessage: true
                
                });

            }

            const buscaEventos = await api.get(eventsResource);
            setEventos(buscaEventos.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainContent>
            <section className='cadastro-evento-section'>
                <Container>
                    <div className='cadastro-evento__box'>

                        {/* Titulo */}
                        <Title titleText={'Cadastro de evento'} />

                        {/* Imagem da pagina */}
                        <ImageIllustrator imageRender={eventoImage}/> 

                        {/* Formulario */}
                        <form 
                            className='ftipo-evento'
                            onSubmit={frmEdit ? handleUpdate : handleSubmit}
                        >
                            {/* Cadastra ou edita */}
                            {!frmEdit ? (
                                //Cadastrar
                                <>
                                    <Input 
                                    id="Nome"
                                    placeholder="Nome"
                                    name={"nome"}
                                    type={"text"}
                                    required={"required"}
                                    value={frmData.nomeEvento}
                                    manipulationFunction={(n) => {
                                        setFrmData({
                                            ...frmData,
                                            nomeEvento: n.target.value
                                        });
                                    }}
                                    />

                                    <Input 
                                    id="descricao"
                                    placeholder="Descrição"
                                    name={"descricao"}
                                    type={"text"}
                                    required={"required"}
                                    value={frmData.descricao}
                                    manipulationFunction={(d) => {
                                        setFrmData({
                                            ...frmData,
                                            descricao: d.target.value
                                        });
                                    }}
                                    />

                                    <Select 
                                    id="tipoEvento"
                                    placeholder="Tipo Evento"
                                    name={"tipoEvento"}
                                    type={"text"}
                                    required={"required"}
                                    options={tipoEventos}
                                    defaultValue={frmData.idTipoEvento}
                                    manipulationFunction={(e) => {
                                        setFrmData({
                                            ...frmData,
                                            idTipoEvento: e.target.value,
                                        })
                                    }}
                                    /> 

                                    <Input 
                                    id="data"
                                    placeholder="dd/mm/aaaa"
                                    name={"data"}
                                    type={"date"}
                                    required={"required"}
                                    value={frmData.dataEvento}
                                    manipulationFunction={(e) => {
                                        setFrmData({
                                            ...frmData,
                                            dataEvento: e.target.value,
                                        })
                                    }}
                                    />

                                    <Button 
                                    textButton="Cadastrar"
                                    id={"cadastrar"}
                                    name={"cadastrar"}
                                    type="submit"

                                    />
                                </>
                            ) : (
                                //Editar
                                <>
                                    <Input 
                                    id="Nome"
                                    placeholder="Nome"
                                    name={"nome"}
                                    type={"text"}
                                    required={"required"}
                                    value={frmEditData.nomeEvento}
                                    manipulationFunction={(n) => {
                                        setFrmEditData({
                                            ...frmEditData,
                                            nomeEvento: n.target.value
                                        });
                                    }}
                                    />

                                    <Input 
                                    id="descricao"
                                    placeholder="Descrição"
                                    name={"descricao"}
                                    type={"text"}
                                    required={"required"}
                                    value={frmEditData.descricao}
                                    manipulationFunction={(d) => {
                                        setFrmEditData({
                                            ...frmEditData,
                                            descricao: d.target.value
                                        });
                                    }}
                                    />

                                    <Select 
                                    id="tipoEvento"
                                    placeholder="Tipo Evento"
                                    name={"tipoEvento"}
                                    type={"text"}
                                    required={"required"}
                                    options={tipoEventos}
                                    defaultValue={frmEditData.idTipoEvento}
                                    manipulationFunction={(e) => {
                                        setFrmEditData({
                                            ...frmEditData,
                                            idTipoEvento: e.target.value,
                                        })
                                    }}
                                    /> 

                                    <Input 
                                    id="data"
                                    placeholder="dd/mm/aaaa"
                                    name={"data"}
                                    type={"date"}
                                    required={"required"}
                                    value={new Date(frmEditData.dataEvento).toLocaleDateString("sv-SE")}
                                    manipulationFunction={(e) => {
                                        setFrmEditData({
                                            ...frmEditData,
                                            dataEvento: e.target.value,
                                        })
                                    }}
                                    />

                                    <Button 
                                    textButton="Atualizar"
                                    id={"cadastrar"}
                                    name={"cadastrar"}
                                    type="submit"



                                    />

                                    <Button
                                    textButton="Cancelar"
                                    id={"cancelar"}
                                    name={"cancelar"}
                                    type="button"
                                    addicionalClass="button-component--middle"
                                    manipulationFunction={() => {
                                      setFrmEdit(false);
                                    }}
                                    />
                                </>
                            )}
                        </form>
                    </div>
                </Container>
            </section>

            {/* Listagem de eventos */}

            <section className='lista-eventos-section'>
                <Container>
                    <Title titleText={"Lista de eventos"} color="white"/>

                    <TableEv 
                    dados={eventos}
                    fnUpdate={showUpdateForm}
                    fnDelete={handleDelete}
                    />
                </Container>
            </section>
        </MainContent>
    );
};

export default EventosPage;