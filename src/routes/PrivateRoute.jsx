import { Navigate } from "react-router-dom";

export const PrivateRoute = ( { children, redirectTo="/" }) => {
//Verifica se ta autemticado
const isAuthenticated = localStorage.getItem("token") !== null;
//Retorna o componente ou volta pra home
return isAuthenticated ? children : <Navigate to={redirectTo} /> 
};