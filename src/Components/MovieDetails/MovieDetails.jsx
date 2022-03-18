import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
    let Image_Base_URL = 'https://image.tmdb.org/t/p/original/';
    const [details, setDetails] = useState(0);
    let API_KEY = '200a2423293156bfb1302800f5043f4a';
    let params = useParams();

    async function getMovieDetailes() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}?api_key=${API_KEY}&language=en-US`);
        console.log(data)
        setDetails(data)
    }
    useEffect(() => {
        getMovieDetailes();

    }, []);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-5 ">
                        {details.backdrop_path ?
                            <img src={Image_Base_URL + details.backdrop_path} className='w-100 h-100' alt="" />
                            :
                            <img src={Image_Base_URL + details.profile_path} className='w-100 ' alt="" />}

                    </div>
                    <div className="col-md-7 px-5">
                        {details.title ? <h2>{details.title}</h2> : <h2>{details.name}</h2>}
                        {details.tagline ? <p className='fs-5'>{details.tagline}</p>
                            :
                            <>{details.also_known_as ? <p className='fs-5'>also known as : {details.also_known_as.join(',')}</p> : ''}</>

                        }

                        {details.genres ? details.genres.map((genre) =>
                            <>
                                <span className='bg-info rounded-2 p-2 me-2'>{genre.name}</span>
                            </>)
                            : ""
                        }

                        {details.vote_count ? <h6 className='py-3 mt-3'>Vote: {details.vote_average}</h6> : ""}

                        {details.vote_average ? <h6 className='py-3'>Vote Count: {details.vote_count}</h6> : ""}

                        <h6 className='py-3'>popularity: {details.popularity}</h6>
                        {details.release_date ?
                            <h6 className='py-3'> Release date: {details.release_date}</h6>
                            :
                            <h6 className='py-3'>  birthday: {details.birthday}</h6>
                        }
                        {details.overview ? <p>{details.overview}</p>
                            :
                            <p>{details.biography}</p>
                        }



                    </div>
                </div>
            </div>
        </>
    )
}
