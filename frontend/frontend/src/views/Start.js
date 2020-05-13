///Menu mainlist search

import React from "react";
import {Container, Row, Col, CardGroup} from "shards-react";
import DefaultLayout from "../layouts/Default";
import 'antd/dist/antd.css';
import PageTitle from "../components/common/PageTitle";
import requireAuth from "./Auth/requireAuth";
import {Card} from "antd";
import {Doughnut} from 'react-chartjs-2';
import {Divider} from "antd";
const dataMidfield = {
    labels: [
        'Passes',
        'Duels',
        'Shots'
    ],
    datasets: [{
        data: [50, 35, 15],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};


const dataForward = {
    labels: [
        'Passes',
        'Duels',
        'Shots'
    ],
    datasets: [{
        data: [30, 30, 40],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};


const dataDefender = {
    labels: [
        'Passes',
        'Duels',
    ],
    datasets: [{
        data: [30, 70],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const Start = () => (

        <Container  fluid className="main-content-container px-4">

            <Row noGutters className="page-header py-4">
                <PageTitle title="scoutease" subtitle="Dashboard" className="text-sm-left mb-3" />
            </Row>
            <Row>
            <Col>
                <h3  className="text-sm-left mb-3" >Welcome to scoutease.com</h3>
                <p>Screen football players from position specific rankings and other metrics.
                    Shortlist the players and compare to averages. </p>
            </Col>


            </Row>
            <Divider/>
            <h5>The weights of the rankings.</h5>
            <Divider/>
            <h5>Forwards</h5>
            <p>
                The shooting is important to forwards. The air duels are also crucial in order to win against the defenders.
            </p>

            <Row>
                <Col>
                    <Doughnut data={dataForward} />

                </Col>

                <Col>
                    <Card size="large" title="Shots"style={{ width: 200 }}>
                        <p>Shot accuracy %</p>
                        <p>Shot opportunity %</p>
                        <p>Shot goal %</p>
                    </Card>
                </Col>
                <Col>
                    <Card size="medium" title="Passes"style={{ width: 200 }}>
                        <p>Simple passing accuracy %</p>
                        <p><strong>Head pass accuracy %</strong></p>
                        <p>Smart pass accuracy %</p>
                    </Card>
                </Col>
                <Col>
                    <Card size="medium" title="Duels"style={{ width: 200 }}>
                        <p><strong>Ground attacking duel %</strong></p>
                        <p>Air duel %</p>
                    </Card>
                </Col>
            </Row>
            <Divider/>
            <h5>Midfielders</h5>
            <p>
                A larger weight on the passing abillity and less on shoting.
            </p>
            <Row>


                <Col>
                    <Card size="large" title="Shots"style={{ width: 200 }}>
                        <p>Shot accuracy %</p>
                        <p>Shot opportunity %</p>
                    </Card>
                </Col>
                <Col>
                    <Card size="medium" title="Passes"style={{ width: 200 }}>
                        <p>Simple passing accuracy %</p>
                        <p>High pass accuracy %</p>
                        <p>Smart pass accuracy %</p>
                    </Card>
                </Col>
                <Col>
                    <Card size="medium" title="Duels"style={{ width: 200 }}>
                        <p><strong>Ground defending duel %</strong></p>
                        <p>Ground attacking duel won %</p>
                    </Card>
                </Col>
                <Col>
                    <Doughnut data={dataMidfield} />

                </Col>
            </Row>
            <Divider/>
            <h5>Defenders</h5>
            <p>A defender needs to handle duels well. Especially defensively. </p>
            <Row>
                <Col>

                    <Card size="large" title="Duels"style={{ width: 300 }}>
                        <p><strong>Ground defending duel won %</strong></p>
                        <p>Air duel won %</p>
                    </Card>
                </Col>
                <Col>
                    <Card size="large" title="Passes"style={{ width: 300 }}>
                        <p>Simple passing accuracy %</p>
                        <p>High pass %</p>
                        <p>Head pass %</p>
                    </Card>

                </Col>
                <Col>

                    <Doughnut data={dataDefender} />

                </Col>
            </Row>
            <Divider/>
        </Container>



);

export default requireAuth(Start)