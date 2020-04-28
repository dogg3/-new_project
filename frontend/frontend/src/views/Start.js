///Menu mainlist search

import React from "react";
import { Container, Row, Col } from "shards-react";
import DefaultLayout from "../layouts/Default";
import PageTitle from "../components/common/PageTitle";
import requireAuth from "./Auth/requireAuth";

const Start = () => (

        <Container  fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="Football-scouting" subtitle="Dashboard" className="text-sm-left mb-3" />
            </Row>
        </Container>



)

export default requireAuth(Start)