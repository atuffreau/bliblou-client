import React from "react";
import { number } from "prop-types";
import { Container, Row, Col } from "react-bootstrap";

import img from "../images/LeBliblou.jpg";

import ImagePanel from "../components/view/ImagePanel";
import Catcher from "../components/presentation/Catcher";
import withScrollTop from "../components/view/withScrollTop";
import SignUp from "../modules/SignUp";

const Home = ({ navbarHeight, footerHeight }) => (
  <ImagePanel src={ img } 
              className="text-align-justify" 
              minHeight={ `calc(100vh - ${navbarHeight}px - ${footerHeight}px)` }>
    <Container>
      <Row>
        <Col lg={{ span:5, offset:1 }}>
          <Catcher />
        </Col>
        <Col lg={{ span:4, offset:1 }}>
          <SignUp />
        </Col>
      </Row>
    </Container>
  </ImagePanel>
);

Home.propTypes= {
  navbarHeight: number,
  footerHeight: number
};

Home.defaultProps= {
  navbarHeight: 0,
  footerHeight: 0
};

export default withScrollTop(Home);
