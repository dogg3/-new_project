///Menu mainlist search

import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import PlayerShortlist ,{DefendersShortList} from '../features/playerShortlist'
import PlayersPivot from "../features/playersPivot/PlayersPivot";


const PlayerList = () => (
    <Container  fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Players shortlist" subtitle="PivotTables" className="text-sm-left mb-3" />
        </Row>
        <h3>Defenders</h3>
        <PlayerShortlist position={'defender'}/>
        <h3>Midfielders</h3>
        <PlayerShortlist position={'midfielder'}/>
        <h3>Forwards</h3>
        <PlayerShortlist position={'forward'}/>


    </Container>

);

export default PlayerList