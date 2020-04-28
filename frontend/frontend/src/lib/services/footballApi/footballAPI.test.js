import React from 'react'
import axios from 'axios';

import {getAllPlayers} from './index'

jest.mock('axios');


describe('Footballs API', function () {
   it("Fetches correct data", async ()=>{
       const data = {
           data: {name:"douglas",info:{positoon:"midfield"}}
       };

       axios.get.mockImplementationOnce(() => Promise.resolve(data));

       await expect(getAllPlayers()).resolves.toEqual(data)

   })

    it("Fetches errousnsly data from API", async ()=>{
        const errorMessage= "Network error"

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );

        await expect(getAllPlayers()).rejects.toThrow(errorMessage)
    })


});