import axios from 'axios';

/**
 * Rota para o recurso do evento
 */

export const eventsResource = '/Evento';

/**
 * Rota para presencas evento
 */

export const presencesEventsResource = '/PresencasEvento';

/**
 * Rota para Comentarios do evento
 */

export const CommentsEventsResource = '/ComentariosEvento';

/**
 * Rota para fazer login
 */

export const loginResource = '/Login'

/**
 * Rota para fazer login
 */

export const myEventsResource = '/PresencasEvento/ListarMinhas'



/**
 * Rota para o recurso Proximos Eventos
 */

export const nextEventResource = '/EventoListarProximos';

/**
 * Rota para o recurso Tipos Eventos
 */

export const eventsTypeResource = '/TiposEvento';

const apiPort = '7118';
const localApiUri = `https://localhost:${apiPort}/api`;
const externalApiUri = `https://eventwebapi-luiz.azurewebsites.net/api`;

const api = axios.create({
    baseURL: externalApiUri
});

export default api;