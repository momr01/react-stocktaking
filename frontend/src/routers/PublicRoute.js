import { Route } from 'react-router-dom'

export default function PublicRoute(props) {

    //const user = null;
    //const user = { id: 1, role: 'regular' }

    /* FORMA Nº 1 - pregunto por user directamente
    const { user } = useAuth()

    if(user) return <Redirect to='/projects' />
    //si existe el user, redirijiremos a projects

    */

    //FORMA Nº2 pregunto por si esta logueado

    //const { isLogged } = useAuth();
    //const { page } = props;

    //console.log(isLogged())

    //if(isLogged()) return <Redirect to={routes.admin} />

    //console.log(props)
    
    return (
        <Route {...props} />
    )
}