///Menu mainlist search

import React from "react";
import { Container, Row, Col } from "shards-react";
import Player from "../features/player/Player";
import PageTitle from "./../components/common/PageTitle";


const PlayerProfile = () => (
    <Container  fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="PlayerProfile" subtitle="PlayerProfile" className="text-sm-left mb-3" />

            <Player/>
        </Row>
    </Container>

);

export default PlayerProfile