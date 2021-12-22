import React from "react";
import { Container } from "react-bootstrap";
import { CloseOutlined } from "@ant-design/icons";

import './NotFoundPage.scss'

export default function NotFoundPage() {
  return (
    <Container className="not-found-page">
        <div className="icon-div">
        <CloseOutlined className="icon" />
        </div>

        <div className="title-div">
        <h3>ERROR</h3>
        </div>

        <div className="text-div">
          <h4>Página no encontrada</h4>
          
        </div>
     
      
    </Container>
  );
}
