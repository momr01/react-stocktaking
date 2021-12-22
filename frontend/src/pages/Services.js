import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../helpers/url";
import { Container, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Reports from "../components/Reports";
import { useHistory } from "react-router-dom";
import routes from "../helpers/routes";
import { Link } from "react-router-dom";

export default function Services(props) {
  const id = props.match.params.id;

  const history = useHistory();

  const [data, setData] = useState();
  const [reports, setReports] = useState();
  const [loadData, setLoadData] = useState(true);

  const [paraReparar, setParaReparar] = useState(false);

  const type = "report";

  useEffect(() => {
    const findData = async () => {
      const data = await axios.get(`${url.backTools}/${id}`);
      if (loadData) {
        setData(data.data);
      }
    };

    findData();
    setLoadData(false);
  }, [id, loadData]);

  useEffect(() => {
    async function findReports() {
      const reports = await axios.get(`${url.backReports}/${id}`);
      if (loadData) {
        if (reports.data.length > 0) {
          setReports(reports.data);
        }
      }
    }

    findReports();
    setLoadData(false);
  }, [id, loadData]);

  useEffect(() => {
    const isParaReparar = () => {
      if (data?.estado === "Para reparar") {
        setParaReparar(true);
      }
    };
    isParaReparar();
  }, [data]);

  return (
    <>
      <Container>
        <Reports data={data} reports={reports} />

        <div className="d-flex justify-content-between mt-3">
          {paraReparar ? (
            <Link to={routes.new(type, id)}>
              <Button variant="success">Agregar service</Button>
            </Link>
          ) : (
            <div style={{ width: "500px", fontSize: "12px", color: "red" }}>
              Para agregar un nuevo registro de service, el equipo debe estar en
              estado "Para reparar". Pruebe con modificarlo y luego vuelva a
              intentarlo.
            </div>
          )}

          <Button variant="danger" onClick={() => history.goBack()}>
            Volver
          </Button>
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
