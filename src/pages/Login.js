import React from "react";
import { Row, Col } from "react-bootstrap";

import Catcher from "../components/presentation/Catcher";
import withScrollTop from "../components/view/withScrollTop";
import SignIn from "../modules/SignIn";

const Login = () => (
  <div className="background-image-panel">
    <Row noGutters>
      <Col md={{ span:5, offset:1 }}>
        <Catcher />
      </Col>
      <Col md={{ span:4, offset:1 }}>
        <SignIn />
      </Col>
    </Row>
  </div>
);

export default withScrollTop(Login);
