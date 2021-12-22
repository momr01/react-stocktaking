import { useState, createContext } from 'react'
import { useHistory } from 'react-router-dom';
import routes from '../helpers/routes';

export const AuthContext = createContext();

export default function AuthProvider( {children} ) {

    const history = useHistory()
    const [user, setUser] = useState(null)

    //cuando user deje de ser null, me habilitara las rutas privadas
    //la idea es comprobar si el user se ha logueado y tiene un rol en primer lugar
    //para no andar enviandolo a todos lados
    
    const login = (userCredentials, fromLocation, data) => {
        const { email, password, role } = data
        
        setUser({ email: email, password: password, role: role })
        //setUser({ id: 56255, name: "name", email: "email", role: "user" })

        if(fromLocation) {
            history.push(fromLocation)
        } else {
            history.push(routes.home)
        }
    }
    
    const logout = () => {
        setUser(null)
    }

    //funcion para actualizar datos de user
    /*const updateUser = (data) => {
        setUser({
            ...user,
            ...data
        })
    }*/

    const isLogged = () => !!user;

    const hasRole = (role) => user?.role === role;
    
    //enviamos variables a contextValue para poder consumirlas
    const contextValue = {
        user,
        isLogged,
        hasRole,
        login,
        logout
        //updateUser
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )

}