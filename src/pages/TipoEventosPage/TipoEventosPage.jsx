import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainContent from "../../components/MainContent/MainContent";
import Conteiner from "../../components/Container/Container";
import Title from "../../components/Titulo/Titulo";
import "./TipoEventosPage.css";
import ImageIllustratror from "../../components/ImageIllustrator/ImageIllustrator";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Services";
import TableTp from "./TableTp/TableTp";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner"

import tipoEventoImage from "../../assets/images/tipo-evento.svg";
import Container from "../../components/Container/Container";

const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [idEvento, setIdEvento] = useState(null)
  const [tipoEventos, setTipoEventos] = useState([
  ]);
  const [notifyUser, setNotifyUser] = useState();
  const [showSpinner, setshowSpinner] = useState(false);

  useEffect(() => {
    //Define a chamada da nossa api
    async function loadEventsType() {
        setshowSpinner(true);

        setTimeout(() => {
          
        }, 2000);
        try {
            const retorno = await api.get(eventsTypeResource);
            setTipoEventos(retorno.data)
            console.log(retorno.data);

            setNotifyUser({
              titleNote: "Sucesso",
              textNote: "Operacao realizada com sucesso",
              imgIcon: "success",
              imgAlt: "Icone da ilustração",
              showMessage: true
            });
        } catch (error) {
            setNotifyUser({
              titleNote: "Erro na api",
              textNote: "Problemas com a api, tente novamente mais tarde",
              imgIcon: "danger",
              imgAlt: "Icone da ilustração",
              showMessage: true
            });
        }
        setshowSpinner(false);
    };

    loadEventsType();
  }, [])

  function aMagica() {
    
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setshowSpinner(true);

    if (titulo.trim().length < 3) {
      alert("Deve ter pelo menos tres");

      setNotifyUser({
        titleNote: "Aviso",
        textNote: "O titulo deve ter pelo menos 3 caracteres",
        imgIcon: "warning",
        imgAlt: "Icone da ilustração",
        showMessage: true
      });
    }

    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo: titulo,
      });
      setTitulo("");

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Cadastrado com sucesso",
        imgIcon: "default",
        imgAlt: "Icone da ilustração",
        showMessage: true
      });

      const buscaEventos = await api.get(eventsTypeResource);
        setTipoEventos(buscaEventos.data);
      
    } catch (error) {
      // alert('Deu ruim na api')
      console.log(error);
    }

    setshowSpinner(false);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    alert("atualizando");
    // setTitulo("");
    // setIdEvento(null);
    setshowSpinner(true);

    try {
      const retorno = await api.put(eventsTypeResource + "/" + idEvento, {
        titulo : titulo 
      });

      if(retorno.status === 204)
      {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: "Atualizado com sucesso",
          imgIcon: "success",
          imgAlt: "Icone da ilustração",
          showMessage: true
        });

        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);

        editActionAbort();
      }


    } catch (error) {
      console.log(error);
    }

    setshowSpinner(false);
  }

  //Cancela a tela de edicao e volta pro form de cadastro
  function editActionAbort () {
    setFrmEdit(false);
    setIdEvento(null);
  }

  //Mostra o fromulario de edicao
  async function showUpdateForm (idElement) {
    setFrmEdit(true);
    setIdEvento(idElement);

    setshowSpinner(true);

    try {
      const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
      setTitulo(retorno.data.titulo);

    } catch (error) {
      console.log(error);
    }

    setshowSpinner(false);
  }

  //apaga o tipo de evento da api
  async function handleDelete (idElement) {
    if (! window.confirm('Confirma exclusao?')) {
      return;
    }

    setshowSpinner(true);

    try {
      
      const promise = await api.delete(`${eventsTypeResource}/${idElement}`);

      if (promise.status === 204) {
      
        setNotifyUser({
          titleNote: "Título não informado",
          textNote: "Mensagem não informada",
          imgIcon: "default",
          imgAlt: "Icone da ilustração",
          showMessage: true
        });
  
        const buscaEventos = await api.get(eventsTypeResource);
        setTipoEventos(buscaEventos.data);
      }
  

    } catch (error) {
      console.log(error);
    }

    setshowSpinner(false);

  }

  return (
    <>
    {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

    {showSpinner ? <Spinner /> : null}
      <MainContent>
        <section className="cadastro-evento-section">
          <Conteiner>
            <div className="cadastro-evento__box">
              {/**titulo */}
              <Title titleText={"Cadastro tipo de Evento"} />
              {/**Imagem ilustracao */}
              <ImageIllustratror imageRender={tipoEventoImage} />
              {/**Componente formulario*/}
              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/* cadastrar ou editar */}
                {!frmEdit ? (
                  //Cadastrar
                  <>
                    <Input
                      id="titulo"
                      placeholder="Titulo"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />

                    <Button
                      textButton="Cadastrar"
                      id={"cadastrar"}
                      name={"cadastrar"}
                      type="submit"
                    ></Button>
                    <Button
                      textButton="Magica"
                      id={"cadastrar"}
                      name={"cadastrar"}
                      type="submit"
                      manipulationFunction={aMagica}
                    ></Button>
                    
                  </>
                ) : (
                  <>
                    <Input
                      id="titulo"
                      placeholder="Novo titulo"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />
                    
                    <div className="buttons-editbox">
                    <Button
                      textButton="Editar"
                      id={"editar"}
                      name={"editar"}
                      type="submit"
                      addicionalClass="button-component--middle"
                      
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
                    </div>
                    
                  </>
                )}
              </form>
            </div>
          </Conteiner>
        </section>
        {/* Listagem de tipos de eventos */}
        <section className="lista-eventos-section">
            <Container>
                <Title titleText={"Lista tipos de eventos"} color="white"/>

                <TableTp
                dados={tipoEventos}
                fnUpdate={showUpdateForm}
                fnDelete={handleDelete}
                />
            </Container>

        </section>
      </MainContent>
    </>
  );
};

export default TipoEventosPage;
