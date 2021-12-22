import { Redirect, Route, useLocation } from 'react-router-dom'
import useAuth from '../auth/useAuth'
import routes from '../helpers/routes';

export default function PrivateRoute({hasRole: role, ...props}) {

    const location = useLocation();
    //console.log(location)

    //FORMA Nº 2 - en vez de preguntar por el usuario pregunto si tiene role 
    //y si esta logueado

    const { hasRole, isLogged } = useAuth();

    if(role && !hasRole(role)) return <Redirect to={routes.login} />

    if(!isLogged()) return <Redirect to={{ pathname: routes.login, state: { from: location }}} />
    // el objetivo de lo anterior es registrar la ruta a la que quise acceder
   
    return (
        <Route {...props} />
    )
}