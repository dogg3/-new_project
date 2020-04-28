///Menu mainlist search

import React from "react";
import { Container, Row, Col } from "shards-react";
import PlayersPivot from "../features/playersPivot/PlayersPivot";

import PageTitle from "./../components/common/PageTitle";


const PivotTable = () => (
    <Container  fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="PivotTable" subtitle="PivotTable" className="text-sm-left mb-3" />
        </Row>
        <h2>Filter e.g. span of age minutes on pitch</h2>
        <h3>Table fetched data from python flask</h3>
        <h3>Crud operations on this adding to player list</h3>
        <PlayersPivot/>
    </Container>

)

export default PivotTable