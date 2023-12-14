import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../components/Titulo/Titulo';
import api, { CommentsEventsResource, eventsResource } from '../../Services/Services';
import { dateFormatDbToView } from '../../Utils/stringFunctions';

const DetalhesEventoPage = () => {

    const { idEvento } = useParams();
    const [eventData, setEventData] = useState({});

    useEffect(() => {
        async function getEventData() {
            try {
                const promise = await api.get(`${eventsResource}/${idEvento}`);

                setEventData(promise);

                

            } catch (error) {
                console.log(error);
            }
        }



        getEventData();
    }, []) 
 
    return (
        <div>
            <Title titleText={"Detalhes do Evento"} className="custom-title"/>

            <h2>{eventData.data.nomeEvento}</h2>
            <h2>Descricao: {eventData.data.descricao}</h2>
            <h2>Aconteceu em: {dateFormatDbToView(eventData.data.dataEvento)}</h2>


        </div>
    );
};

export default DetalhesEventoPage;