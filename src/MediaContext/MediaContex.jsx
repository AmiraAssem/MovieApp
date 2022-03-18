import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MediaContext = createContext([])

export default function MediaContextProvider(props) {
    const [allMovies, setAllMovies] = useState([]);
    const [allTv, setAllTv] = useState([]);
    const [allPeople, setAllPeople] = useState([]);

    let API_KEY = '200a2423293156bfb1302800f5043f4a';


    async function getTrending(mediaType, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${API_KEY}`)
        callback(data.results.splice(0, 10))
        // console.log(data.results.splice(0, 10))
    }
    useEffect(() => {
        getTrending("movie", setAllMovies);
        getTrending("tv", setAllTv);
        getTrending("person", setAllPeople);

    }, []);
    return <MediaContext.Provider value={{ allMovies, allTv, allPeople }}>
        {props.children}
    </MediaContext.Provider>

}