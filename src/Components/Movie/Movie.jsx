import React from 'react'
import { Link } from 'react-router-dom';
import style from './Movie.module.css'

export default function Movie(props) {
    let Image_Base_URL = 'https://image.tmdb.org/t/p/original/';
    let { title, name, poster_path, vote_average, profile_path } = props.movieInfo;
 
    return (
        <div className='col-md-2 position-relative shadow my-3'>
            <div>
                <Link to={`/movieDetails/${props.movieInfo.media_type}/${props.movieInfo.id}`}>{poster_path ? <img src={Image_Base_URL + poster_path} className='w-100' alt={name} />
                    :
                    profile_path ? <img src={Image_Base_URL + profile_path} className='w-100' alt="" />
                        :
                        <img src='' className='w-100' alt="" />
                }
                </Link>
                {title ? <h5>{title} </h5> : <h5>{name} </h5>}
                {vote_average ? <div className={style.movieCard}><h6 className='p-0 m-0'>{vote_average}</h6></div>
                    :
                    ""}

            </div>
        </div>
    )
}
