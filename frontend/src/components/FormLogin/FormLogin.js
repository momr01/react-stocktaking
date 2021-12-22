import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../auth/useAuth";
import { useLocation } from "react-router-dom";
import axios from 'axios'
import url from '../../helpers/url'

import "./FormLogin.scss";

export default function FormLogin(props) {
  const { setView } = props;
  const { login } = useAuth();

  const location = useLocation();
  const userCredentials = {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [formData, setFormData] = useState();

  useEffect(() => {
    function setValue() {
      setFormData({
        email,
        password,
        checkbox,
      });
    }
    setValue();
  }, [email, password, checkbox]);

  const sendData = async (e) => {
    e.preventDefault();

    if (email.length > 0 && password.length > 0 && checkbox) {
      const userFound = await axios.get(`${url.backUsers}/${email}`)

      console.log(userFound)
      console.log(formData)

      if(userFound.data!=null) {
        if(userFound.data.email===email && userFound.data.password===password) {
          console.log("SUPEEEEEEEEEER")
          login(userCredentials, location.state?.from, userFound.data);
          
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
      console.log("ERROR EN DATOS");
    }
  };

  return (
    <div className="form-login">
      <h3 className="form-login__title">Ingreso al sistema</h3>

      <div className="form-login__form">
        <Form className="form-login__form-content">
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              No será compartido con nadie!
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="No soy un robot"
              onChange={(e) => setCheckbox(e.target.checked)}
            />
          </Form.Group>
          <Button variant="success" type="submit" onClick={(e) => sendData(e)}>
            Ingresar
          </Button>
          <Button
            variant="link"
            className="link-register"
            onClick={() => setView(false)}
          >
            No tienes usuario? Registrate!
          </Button>
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
  );
}
