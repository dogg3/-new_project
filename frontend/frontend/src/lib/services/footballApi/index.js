import axios from 'axios'

export const API = 'https://hn.algolia.com/api/v3';


export const getAllPlayers = async () => {
   return await axios.get(API)
}



