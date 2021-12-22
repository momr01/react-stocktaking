import React, {useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory, Link } from 'react-router-dom'
import routes from '../../helpers/routes'

import './EditTool.scss'
import url from "../../helpers/url";


export default function EditTool(props) {
  const {id, data} = props
  const MySwal = withReactContent(Swal)
  const history = useHistory()

  const [equipo, setEquipo] = useState(data?.equipo)
  const [marca, setMarca] = useState(data?.marca)
  const [numero, setNumero] = useState(data?.numero)
  const [serie, setSerie] = useState(data?.serie)
  const [modelo, setModelo] = useState(data?.modelo)
  const [estado, setEstado] = useState(data?.estado)
  const [responsable, setResponsable] = useState(data?.responsable)
  const [accesorios, setAccesorios] = useState(data?.accesorios)
  const [recepcion, setRecepcion] = useState(new Date(data?.recepcion).toISOString().split('T')[0])
  const [checkbox, setCheckbox] = useState(false)
  const [formData, setFormData] = useState()
  const [isConfirmed, setIsConfirmed] = useState(false)

  
  useEffect(() => {
    function setValue() {
      setFormData({
        equipo,
        marca,
        numero,
        serie,
        modelo,
        estado,
        responsable,
        accesorios,
        recepcion,
        checkbox
      })
    }
    setValue()
  }, [equipo,marca,numero,serie,modelo,estado,responsable,accesorios,recepcion,
  checkbox])

  useEffect(() => {
    function alertConfirmed() {
      setIsConfirmed(false)
    }
    alertConfirmed()
  }, [isConfirmed])

  const sendForm = async (e) => {
    e.preventDefault()

    console.log(formData)

    if(checkbox &&
      equipo && marca && numero && serie && modelo && estado && responsable 
      && accesorios) {
      if(equipo!==data.equipo || 
        modelo!==data.modelo ||
        marca!==data.marca ||
        numero!==data.numero ||
        serie!==data.serie ||
        estado!==data.estado ||
        responsable!==data.responsable ||
        accesorios!==data.accesorios) 
      {
      await MySwal.fire({
        title: <strong>Se actualizará el registro</strong>,
        html: <i>Confirma actualización</i>,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Aceptar`,
      })
        .then(async (value) => {
          if(value.isConfirmed) {
            await MySwal.fire({
              title: <strong>Perfecto!</strong>,
              html: <i>Actualizado correctamente</i>,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            });
            grabTool()
            setIsConfirmed(false)
              setEquipo()
              setMarca()
              setNumero()
              setSerie()
              setModelo()
              setEstado()
              setResponsable()
              setAccesorios()
              setRecepcion()
              setCheckbox(false)
              history.push(routes.home)
          } else {
            toastError()
          }
        }) 

      
    } else {
      toastError()
    }
  } else {
      toastError()
    }
  }

  const grabTool = async () => {
    await axios.put(`${url.backTools}/${id}`, formData)
  }

  console.log(data)

  return (
    <div className="add-new">
      <Container>
        
          <h3 className="add-new__title">Editar equipo</h3>
        
        <div className="add-new__form">
          <Form className="add-new__form-content" id="form-add-new">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Instrumento/Equipo</Form.Label>
              
    
                
                  <Form.Select defaultValue={equipo} onChange={(e)=>setEquipo(e.target.value)}>
                  <option value="Seleccione...">Seleccione...</option>
                  <option value="TPL">TPL</option>
                  <option value="Cuna carga TPL">Cuna carga TPL</option>
                  <option value="Cargador TPL">Cargador TPL</option>
                  <option value="Batería">Batería</option>
                  <option value="Sonda Optica">Sonda Optica</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nº</Form.Label>
                <Form.Control defaultValue={numero} type="number" onChange={(e)=>setNumero(e.target.value)}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Marca</Form.Label>
                <Form.Select defaultValue={marca} onChange={(e)=>setMarca(e.target.value)}>
                  <option>Seleccione...</option>
                  <option>Psion</option>
                  <option>Phihong</option>
                  <option>Tronik</option>
                  <option>Probattery</option>
                  <option>PS-1050</option>
                  <option>SMC-Energy</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Modelo</Form.Label>
                <Form.Select defaultValue={modelo} onChange={(e)=>setModelo(e.target.value)}>
                  <option>Seleccione...</option>
                  <option>Workabout Pro 3</option>
                  <option>Workabout Pro 4</option>
                  <option>NEO</option>
                  <option>PSA 15R-050P</option>
                  <option>SW0530</option>
                  <option>1PWA6400</option>
                  <option>ES-053000</option>
                  <option>MS-99</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nº de serie</Form.Label>
                <Form.Control type="text" defaultValue={serie} onChange={(e)=>setSerie(e.target.value)}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Responsable</Form.Label>
                <Form.Select defaultValue={responsable} onChange={(e)=>setResponsable(e.target.value)}>
                  <option>Seleccione...</option>
                  <option>Operario 1</option>
                  <option>Operario 2</option>
                  <option>Operario 3</option>
                  <option>Operario 4</option>
                  <option>Operario 5</option>
                  <option>Operario 6</option>
                  <option>Operario 7</option>
                  <option>Operario 8</option>
                  <option>Operario 9</option>
                  <option>Operario 10</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Accesorios</Form.Label>
              <Form.Control type="text" defaultValue={accesorios} onChange={(e)=>setAccesorios(e.target.value)}/>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Estado</Form.Label>
                <Form.Select defaultValue={estado} onChange={(e)=> setEstado(e.target.value)}>
                  <option>Seleccione...</option>
                  <option>En uso</option>
                  <option>Nuevo</option>
                  <option>Reparado</option>
                  <option>Fuera de uso/Inutilizable</option>
                  <option>Para reparar</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Fecha de recepción</Form.Label>
                <Form.Control type="date" defaultValue={recepcion} onChange={(e) => setRecepcion(new Date(`${e.target.value}`))} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="No soy un robot" onChange={(e)=>setCheckbox(e.target.checked)}/>
            </Form.Group>

            <div className="add-new__form-content-buttons">
            <Button variant="success" type="submit" onClick={(e)=>sendForm(e)}>
              Actualizar
            </Button>
            <Link to={`${routes.list}`} ><Button variant="secondary">
              Atrás
            </Button></Link>
            </div>
          </Form>
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
    </div>
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
}
