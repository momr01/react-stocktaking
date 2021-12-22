import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import Loading from "../Loading";
import date from "../../helpers/date";

import "./Reports.scss";

export default function Reports(props) {
  const { data, reports } = props;

  return (
    <div className="reports">
      <h3 className="title">Reportes: service de equipos</h3>
      <Row>
        <Col className="main-data" xs={12}>
          {data ? (
            <div>
              <p>
                Equipo: <strong>{data.equipo}</strong>
              </p>
              <p>
                Nº: <strong>{data.numero}</strong>
              </p>
              <p>
                Marca: <strong>{data.marca}</strong>
              </p>
              <p>
                Nº de serie: <strong>{data.serie}</strong>
              </p>
            </div>
          ) : (
            <Loading />
          )}
        </Col>
        <Col xs={12}>
          <div className="line">
            <hr />
          </div>
        </Col>
        {reports ? (
          <Col xs={12}>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th># service</th>
                  <th>Fecha</th>
                  <th># remito</th>
                  <th>Condición ingreso</th>
                  <th>Observaciones</th>
                  <th>Próximo service</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((val, index) => (
                  <tr key={index}>
                    <td>{val.service}</td>
                    <td>{date(val.fActual)}</td>
                    <td>{val.remito}</td>
                    <td>{val.estado}</td>
                    <td>{val.observaciones}</td>
                    <td>{date(val.fNext)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        ) : (
          <div className="message">No existen registros para mostrar</div>
        )}
      </Row>
    </div>
  );
}
