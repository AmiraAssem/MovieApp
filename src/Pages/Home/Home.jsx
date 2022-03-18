import React, { useContext} from 'react'
import Movie from '../../Components/Movie/Movie';
import { MediaContext } from '../../MediaContext/MediaContex';


export default function Home() {
  const { allMovies, allTv, allPeople } = useContext(MediaContext);

  return (
    <>
      <div className="row">
        {allMovies ? <> <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className="borderr w-50"></div>
            <h2 className='fw-bold'>Trending</h2>
            <h2 className='fw-bold'> movies</h2>
            <h2 className='fw-bold'> to watch now</h2>
            <p>most watched movies by day</p>
            <div className="borderr"></div>
          </div>
        </div>
          {allMovies.map((movie, index) => <Movie movieInfo={movie} key={index}></Movie>)}</>
          : ''}



        {allTv ? <> <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className="borderr w-50"></div>
            <h2 className='fw-bold'>Trending</h2>
            <h2 className='fw-bold'> Tv</h2>
            <h2 className='fw-bold'> to watch now</h2>
            <p>most watched tvs by day</p>
            <div className="borderr"></div>
          </div>
        </div>
          {allTv.map((movie, index) => <Movie movieInfo={movie} key={index}></Movie>)}
          </>
          : ''}
        {allPeople ? <>
          <div className="col-md-4 d-flex align-items-center">
            <div className='w-100'>
              <div className="borderr w-50"></div>
              <h2 className='fw-bold'>Trending</h2>
              <h2 className='fw-bold'> People</h2>
              <div className="borderr"></div>
            </div>
          </div>
          {allPeople.map((movie, index) => <Movie movieInfo={movie} key={index}></Movie>)}
        </> : ''}
      </div>
    </>
  )
}
