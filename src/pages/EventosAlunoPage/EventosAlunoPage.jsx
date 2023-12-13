import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Titulo/Titulo";
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, { CommentsEventsResource, eventsResource, myEventsResource, presencesEventsResource } from "../../Services/Services";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([
    // {idEvento: "1234", nomeEvento: "Evento de Java", dataEvento: "28/12/2023"},
    // {idEvento: "1238", nomeEvento: "Evento de Java", dataEvento: "28/12/2023"},
    // {idEvento: "1239", nomeEvento: "Evento de Java", dataEvento: "28/12/2023"}
  ]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [comentario, setComentario] = useState("");
  const [frmData, setFrmData] = useState({});
  const [novoComentario, setNovoComentario] = useState("");
  const [idComentario, setIdComentario] = useState("");

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    setShowSpinner(true);



    loadEventsType();
  }, [tipoEvento, userData.userId]);

  async function loadEventsType(){
    setShowSpinner(true);
    setEventos([]);

    if(tipoEvento === "1"){
      try {
        const retornoEventos = await api.get(eventsResource);

        const meusEventos = await api.get(`${myEventsResource}/${userData.userId}`);

        const eventosMarcados = verificaPresenca(retornoEventos.data, meusEventos.data);
        setEventos(retornoEventos.data);

        console.clear();
        console.log('Eventos marcados');
        console.log(eventosMarcados.data);
        console.log('Meus eventos');
        console.log(meusEventos.data);
        console.log('Todos eventos');
        console.log(retornoEventos.data);

      } catch (error) {
        console.log("Erro na API");
        console.log(error);
      }
      
    }
    else if (tipoEvento === "2"){
      try {
        const retornoEventos = await api.get(`${myEventsResource}/${userData.userId}`);
        console.log(retornoEventos.data);

        const arrEventos = [];

        retornoEventos.data.forEach( (e) => {
          arrEventos.push({...e.evento, situacao: e.situacao, idPresencaEvento: e.idPresencaEvento});
        })

        setEventos(arrEventos);

        console.log(arrEventos);
      } catch (error) {
        console.log("Erro na API");
        console.log(error);
      }
    } else {
      setEventos([]);
    }
    setShowSpinner(false);



  }

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      for (let i = 0; i < eventsUser.length; i++) {
        if(arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) {
          arrAllEvents[x].situacao = true;
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break;
        }
      }
    }

    return arrAllEvents;
  };

  const loadMyCommentary = async () => {
    try {
      const promise = await api.get(`${CommentsEventsResource}/BuscarPorIdUsuario?idUsuario=${userData.userId}&idEvento=${userData.idEvento}`);

      console.log('Comentario:');
      setComentario(promise.data.descricao);
      setIdComentario(promise.data.idComentarioEvento);
    } catch (error) {
      console.log(error);
    }
  };

  async function postMyCommentary () {
    
    try {
      const promise = await api.post(CommentsEventsResource, {
        descricao: novoComentario.descricao,
        exibe: true,
        idUsuario: userData.userId,
        idEvento: userData.idEvento
      });

      setNovoComentario("");
      console.log('Dados cadastrados');
      console.log(promise.status);
    } catch (error) {
      console.log(error);
    }
  };

  const showHideModal = (idEvent) => {
    setShowModal(showModal ? false : true);
    setUserData({...userData, idEvento: idEvent});
    console.log(idEvent);
  };

  async function commentaryRemove () {
    console.log("Remover o comentário");

    try {
      const promise = await api.delete(`${CommentsEventsResource}/${idComentario}`)

      console.log(promise.status);
      console.log("deletado com sucesso");

      loadMyCommentary();
    } catch (error) {
      console.log(error);
    }
  };

  async function handleConnect(eventId, whatIsTheFunction, presencaId = null) {
    if(whatIsTheFunction === "connect") {
      try {
        const promise = await api.post(presencesEventsResource, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId
        });

        if(promise.status === 201) {
          loadEventsType();
          alert("Presenca confirmada, parabens")
        }
      } catch (error) {
        console.log(error);
      }
      alert("CONECTAR AO EVENTO:" + eventId);
      return;
    }

    console.clear();
    console.log(`
    DESCONECTAR
    ${whatIsTheFunction}
    ${presencaId}
    `);

    try {
      //unconnect
      const unconnect = await api.delete(
        `${presencesEventsResource}/${presencaId}`
      );

      if (unconnect.status === 204) {
        loadEventsType();
        alert('Desconectado do evento');
      }
    } catch (error) {
      console.log('Erro ao desconectar o usuario do evento');
      console.log(error);
    }

    alert("DESCONECTAR AO EVENTO:" + eventId);

    //unconnect
  };

  
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            addicionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={showHideModal}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyCommentary}
          fnPost={postMyCommentary}
          fnDelete={commentaryRemove}
          comentaryText={comentario}
          novoComentario={novoComentario}
          setNovoComentario={setNovoComentario}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
