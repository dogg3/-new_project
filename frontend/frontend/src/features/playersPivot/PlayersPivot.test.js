import React from 'react'

import { render, unmountComponentAtNode } from "react-dom";
import {shallow} from "enzyme";
import {act} from "react-dom/test-utils"
import PlayersPivot from "./PlayersPivot";
import {getAllPlayers} from "../../lib/services/footballApi";
import axios from "axios";

jest.mock('axios');


let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


describe('Players Pivot', ()=>{
    const fakePlayers = [{name:"douglas", info:{position:"midfield", foot:"right"}}, {name:"stefan", info:{position:"midfield", contract:"expires"}}]

    //TODO //Renders correctly for given props just STYLES

   //TODO  //user events - clicks and so one


    //Data fetching
    it("Rendering player table when resolved api fetch", async () =>{

        //Fake api response as a resolved promise
        axios.get.mockImplementationOnce(() => Promise.resolve(fakePlayers));

        //Add component to DOM
        await act(async ()=>{
            render(<PlayersPivot/>, container)
        })


        //Players table to be show
        expect(container.querySelector('.playersTable')).toBeTruthy()


        //Only the values and trimming json object to test equality
        const onlyLetters = JSON.stringify(fakePlayers).replace(/[}{\[\]"":,]|name|info/g, "")

        //only match that all the values from the request is in the playersTable
        expect(container.querySelector('.playersTable').textContent.replace((/\s/g),"")).toBe(onlyLetters)

        //Loading not to be shown
        expect(container.querySelector('.loading')).toBeFalsy()
        //error message not to be shown
        expect(container.querySelector('.errorFetch')).toBeFalsy()



    })


    //Rejection of API request
    it("Rejection of playerfetch", async()=>{

        //Mock the get response as a rejection
        axios.get.mockImplementationOnce(()=> Promise.reject(new Error("Network error")))


        await act(async()=>{
                render(<PlayersPivot/>, container)
        })

        //Error message to be shown
        expect(container.querySelector('.fetchError')).toBeTruthy()

        //Loading not to be shown
        expect(container.querySelector('.loading')).toBeFalsy()

        //Player table to be shown
        expect(container.querySelector('.playersTable')).toBeTruthy()


    })


})