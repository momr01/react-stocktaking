import React, {useState, useEffect} from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios'
import url from "../../helpers/url";
import {ToastContainer, toast} from 'react-toastify'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./FormReport.scss";

export default function FormReport() {
  
  //usestate de inputs de formulario
  const [service, setService] = useState();
  const [remito, setRemito] = useState();
  const [fActual, setFActual] = useState();
  const [fNext, setFNext] = useState();
  const [observaciones, setObservaciones] = useState();
  const [checkbox, setCheckbox] = useState(false);
  const [formData, setFormData] = useState();

  const MySwal = withReactContent(Swal)

  const history = useHistory();
  const location = useLocation()

  const id = location.pathname.substring(12,36)



  //useeffect para obtener datos de inputs
  useEffect(() => {
    const setValues = () => {
      setFormData({
        service,
        remito,
        fActual,
        fNext,
        estado: "Para reparar",
        observaciones,
        checkbox,
        idTool: id,
      });
    };

    setValues();
  }, [
    service,
    remito,
    fActual,
    fNext,
    observaciones,
    checkbox,
    id
  ]);



 const sendData = async (e) => {
  e.preventDefault();

  console.log(formData);

  if (
    service?.length > 0 &&
    remito?.length > 0 &&
    fActual?.length > 0 &&
    fNext?.length > 0 &&
    observaciones?.length > 0 &&
    checkbox
  ) {
    await MySwal.fire({
      title: <strong>Advertencia!</strong>,
      html: (
        <i>
          Está por crear un nuevo reporte de service. Una vez generado, no
          será posible modificarlo ni eliminarlo.{" "}
          <strong>Desea continuar de todos modos?</strong>
        </i>
      ),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Crear`,
    }).then(async (value) => {
      if (value.isConfirmed) {
        await MySwal.fire({
          title: <strong>Perfecto!</strong>,
          html: <i>Registro creado correctamente</i>,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
        grabReport(id);        

       const form = document.getElementById("form-report-form__content");

        form.reset();
        resetValues()
      } else {
        toastError();
      }
    });
    console.log("PERFECTO");
  } else {
    toastError();
    console.log("FALTAN DATOS");
  }

};

const resetValues = () => {
  setService();
  setRemito();
  setFActual();
  setFNext();
  setObservaciones();
  setCheckbox(false);
};

const grabReport = async (id) => {
  const toolExisted = await axios.get(`${url.backTools}/${id}`);

  if (toolExisted?.data) {
    await axios.post(`${url.backReports}`, formData);
  } else {
    toastError();
  }
};


  return (
    <>
    <Container>
      <div className="form-report hide" id="form-report">
        <h3 className="form-report__title">Agregar nuevo registro</h3>

        <div className="form-report-form">
          <Form
            className="form-report-form__content"
            id="form-report-form__content"
          >
            <Row className="row1">
              <Form.Group as={Col}>
                <Form.Control
                  type="number"
                  placeholder="Número de service"
                  defaultValue=""
                  onKeyUp={(e) => setService(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Control
                  type="number"
                  placeholder="Número de remito"
                  defaultValue=""
                  onKeyUp={(e) => setRemito(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="row2">
              <Form.Group as={Col}>
                <Form.Label>Fecha de service</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue=""
                  onSelect={(e) => setFActual(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Fecha de próxima revisión</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue=""
                  onSelect={(e) => setFNext(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  className="estado"
                  defaultValue="Para reparar"
                  readOnly
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3 row2" as={Col}>
              <Form.Control
                as="textarea"
                placeholder="Observaciones realizadas"
                style={{ height: "100px" }}
                defaultValue=""
                onKeyUp={(e) => setObservaciones(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="No soy un robot"
                onClick={(e) => setCheckbox(e.target.checked)}
              />
            </Form.Group>
            <div className="buttons">
              <Button
                variant="success"
                type="submit"
                className="button1"
                onClick={(e) => sendData(e)}
              >
                Añadir
              </Button>
              <Button variant="secondary" onClick={history.goBack}>
                Volver
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>

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

</>
  );
}

const toastError = () => {
  toast.error("No se guardaron los cambios", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

