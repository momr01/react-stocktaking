import React, {useState} from 'react'
import FormLogin from '../components/FormLogin'
import { Container } from 'react-bootstrap'
import FormRegister from '../components/FormRegister'

export default function LoginPage() {
    const [view, setView] = useState(true)


    return (
        <Container>
            {view ? (
                <FormLogin setView={setView} />
            ) : (
                <FormRegister setView={setView} />
            )}
            
        </Container>
            
       
    )
}
