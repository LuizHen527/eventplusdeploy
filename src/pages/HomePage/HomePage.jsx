import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Titulo/Titulo";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import axios from "axios";
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import api from "../../Services/Services";
import Notification from "../../components/Notification/Notification";

const HomePage = () => {

  const [NextEvents, setNextEvents] = useState([]); 
  const [notifyUser, setNotifyUser] = useState();

  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await api.get(`/Evento/ListarProximos`);
        const dados = await promise.data;

        setNextEvents(dados);
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro na api",
          textNote: "Problemas com a api, tente novamente mais tarde",
          imgIcon: "danger",
          imgAlt: "Icone da ilustração",
          showMessage: true
        });
      }
    }

    getNextEvents();
  }, []);

  return (
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">

            {
              NextEvents.map((e) => {
                return (
                  <NextEvent 
                    key={e.idEvento}
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={dateFormatDbToView(e.dataEvento)}
                    idEvent={e.idEvento}
                  />
                );
              })
            }
            
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
