///Menu mainlist search

import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";


const PlayerList = () => (
    <Container  fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="PlayerList" subtitle="PlayerList" className="text-sm-left mb-3" />
        </Row>
        <h2>Positions</h2>
        <h3>Center back</h3>
        <h3>Full back</h3>
        <h3>Center midfield</h3>
        <h3>Winger</h3>
        <h3>Goal kepper</h3>
        <h3>Table of players with crud</h3>
    </Container>

)

export default PlayerList