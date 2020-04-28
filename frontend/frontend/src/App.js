import React from "react";
import {   Route, BrowserRouter as Router }  from "react-router-dom";
import routes from "./routes";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";



export default () => (
    <Router>
        <Router >
            {routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={ routeProps =>(

                            <route.layout noSidebar={true} {...routeProps}>
                                <route.component {...routeProps} />
                            </route.layout>

                        )}
                    />
                );
            })}


        </Router>
   </Router>
);

