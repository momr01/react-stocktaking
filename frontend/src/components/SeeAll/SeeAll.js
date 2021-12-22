import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import Loading from "../Loading";
import { EditFilled, DeleteFilled, DiffFilled } from "@ant-design/icons";
import routes from "../../helpers/routes";
import url from "../../helpers/url";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
import date from '../../helpers/date'

import "./SeeAll.scss";

export default function SeeAll() {
  //Alerta de Sweetalert 2
  const MySwal = withReactContent(Swal);

  //usestate de manejo de datos
  const [data, setData] = useState();
  const [isDeleted, setIsDeleted] = useState(true);

  //useeffect de manejo de datos
  useEffect(() => {
    async function loadData() {
      const data = await axios.get(`${url.backTools}`);
      if (isDeleted) {
        setData(data);
      }
    }
    loadData();
    setIsDeleted(false);
  }, [isDeleted]);


  //metodo para eliminar un registro
  const deleteTool = async (id) => {
    
    await MySwal.fire({
      title: <strong>Advertencia!</strong>,
      html: <i>Se eliminará el registro</i>,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Eliminar`,
    }).then(async (value) => {
      if (value.isConfirmed) {
        await MySwal.fire({
          title: <strong>Perfecto!</strong>,
          html: <i>Eliminado correctamente</i>,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
        await axios.delete(`${url.backTools}/${id}`);
        setIsDeleted(true);
      } else {
        toastError();
      }
    });
  };

  return (
    <>
      <Container className="see-all">
        <h3 className="see-all__title">Inventario de equipos</h3>

        {data?.data ? (
          <div className="see-all__table">
            <Table striped bordered hover className="see-all__table-content">
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Equipo</th>
                  <th>Marca</th>
                  <th>Nº de serie</th>
                  <th>Modelo</th>
                  <th>Responsable</th>
                  <th>Fecha de recepción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((line, index) => (
                  <tr key={index}>
                    <td>{line.numero}</td>
                    <td>{line.equipo}</td>
                    <td>{line.marca}</td>
                    <td>{line.serie}</td>
                    <td>{line.modelo}</td>
                    <td>{line.responsable}</td>
                    <td>{date(line.recepcion)}</td>
                    <td>{line.estado}</td>
                    <td className="see-all__table-content-buttons">
                      <Link to={routes.edit(line._id)}>
                        <EditFilled className="edit-icon" />
                      </Link>
                      <DeleteFilled
                        onClick={() => deleteTool(line._id)}
                        className="delete-icon"
                      />
                      <Link to={`${routes.services(line._id)}`}>
                        <DiffFilled className="report-icon" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <Loading />
        )}

        {data?.data && (
          <div>
            <Link to={routes.home}>
              <Button variant="secondary">Atrás</Button>
            </Link>
          </div>
        )}
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
