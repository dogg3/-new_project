///Menu mainlist search

import React from "react";
import { Container, Row, Col } from "shards-react";
import PlayersPivot from "../features/playersPivot/PlayersPivot";


import PageTitle from "./../components/common/PageTitle";


const PivotTable = () => (
    <Container  fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="PivotTables" subtitle="PivotTables" className="text-sm-left mb-3" />
        </Row>
        <h3>Forwards</h3>
        <PlayersPivot position={'forward'}/>
        <h3>Midfielders</h3>
        <PlayersPivot position={'midfielder'}/>
        <h3>Defenders</h3>
        <PlayersPivot position={'defender'}/>
    </Container>
);

export default PivotTable