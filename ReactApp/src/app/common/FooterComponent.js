import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

let Footer = () => {
  //Javascript Like XML structure (not html, not xml - but js)
  return (
    <footer className="bg-light footer" style={{ display: "flex", alignItems: "center", justifyContent: "center",}}>
      <Container>
        <Row>
          <Col xs={12}>
            <div className="text-center">
              © 2024 SynerCart. All rights reserved. &nbsp;|&nbsp;
              <a href="https://www.synergisticit.com/" target="_blank">
                SynergisticIT
              </a>{" "}
              &nbsp;|&nbsp;
              <a href="http://www.synergisticit.com/sitemap.xml" target="_blank">
                Sitemap
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
