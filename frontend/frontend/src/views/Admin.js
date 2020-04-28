///Menu mainlist search

import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";


const Admin = () => (
    <Container  fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Admin" subtitle="Admin" className="text-sm-left mb-3" />
        </Row>
        <h3>Members list with Crud</h3>
    </Container>

)

export default Admin