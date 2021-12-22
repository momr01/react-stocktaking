import React, {useState, useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import url from '../../helpers/url';
import axios from 'axios'


import './FormRegister.scss'

export default function FormRegister(props) {
    const {setView} = props


    const [names, setNames] = useState()
    const [surnames, setSurnames] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [checkbox, setCheckbox] = useState(false)
    const [formData, setFormData] = useState()
    

    useEffect(() => {
      function setValue() {
        setFormData({
          names,
          surnames,
          email,
          password,
          checkbox,
        });
      }
      setValue();
    }, [names, surnames, email, password, checkbox]);

    

    const sendData = async (e) => {
        e.preventDefault()
        const expression=/^([\da-z_-]+)@([\da-z-]+)\.([a-z]{2,6})$/

        if(names?.length>5 &&
          surnames?.length>5 &&
          email?.length>5 &&
          expression.exec(email) &&
          password?.length>=8 &&
          password2?.length>=8 &&
          checkbox) {
            if(password===password2) {
              if(formData) {
                const existed = await axios.get(`${url.backUsers}/${email}`)
            

                if(existed.data!=null) {
                  console.log("YA EXISTE")
                  toast.error("El email ingresado ya existe", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  })

                } else {
                  toast.success("Usuario creado! Redireccionando...", {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });

                  const newUser = await axios.post(`${url.backUsers}`, formData)
                  
                  if(newUser.data!=null) {
                    setTimeout(redirect, 5000)
                  }
                 function redirect() {
                    setView(true)
                  }
                }
                
                
              }
            } else {
              toast.error("Las contraseñas deben ser iguales!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
            
          } else {
            toast.error("Datos erróneos", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
    }


    return (
        <div className="form-register">
            <h3 className="form-register__title">Registrese para poder acceder</h3>
        
        <div className="form-register__form">
        <Form className="form-register__form-content">
        <Form.Group className="mb-3">
        <Form.Label>Nombres:</Form.Label>
        <Form.Control type="text" placeholder="Escriba todos sus nombres..." onChange={(e)=> setNames(e.target.value)} />
        <Form.Text className="text-muted">
          Mínimo 5 caracteres
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Apellidos:</Form.Label>
        <Form.Control type="text" placeholder="Escriba su apellido completo..." onChange={(e)=> setSurnames(e.target.value)} />
        <Form.Text className="text-muted">
          Mínimo 5 caracteres
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su email..." onChange={(e)=> setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          Debe ser un email válido. No será compartido con nadie!
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" onChange={(e)=> setPassword(e.target.value)} />
        <Form.Text className="text-muted">
          Mínimo 8 caracteres
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Repita su contraseña:</Form.Label>
        <Form.Control type="password" placeholder="Vuelva a ingresar su contraseña..." onChange={(e)=> setPassword2(e.target.value)}/>
        <Form.Text className="text-muted">
          Las contraseñas deben ser iguales!
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="No soy un robot" onChange={(e)=> setCheckbox(e.target.checked)} />
        <Form.Text className="text-muted">
         Debe seleccionar
        </Form.Text>
      </Form.Group>
      <Button variant="info" type="submit" onClick={(e)=> sendData(e)}>
        Registrarse
      </Button>
      <Button variant="link" className="link-login" onClick={() => setView(true)}>Ya estás registrado? Ingresa ahora</Button>
    </Form>
        </div>
        
        
        <ToastContainer
    position="bottom-left"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
    </div>
    )
}
