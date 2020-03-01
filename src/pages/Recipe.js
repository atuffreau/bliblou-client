import React from "react";

import withScrollTop from "../components/view/withScrollTop";
import Recipe from "../modules/Recipe";
import { Row, Col } from "react-bootstrap";

const view = ({ match: { params: { id } }, location: { search } }) => { 
  const query = new URLSearchParams(search);
  const mode = query.get('mode');

  return (
    <Row className="content form-margin-bottom-16">
      <Col md={{ span:10, offset:1 }}>
        <Recipe id={ id } readonly={ mode !== "edit" } />
      </Col>
    </Row>
  );
};

export default withScrollTop(view);