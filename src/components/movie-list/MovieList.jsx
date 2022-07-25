import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './movie-list.scss';
// Import Swiper React components
import { Autoplay, Navigation, } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css'; // core Swiper
// import 'swiper/modules/autoplay/autoplay.min.css'; // core Swiper
import 'swiper/css/navigation';

// import { Link } from 'react-router-dom';
// import Button from '../button/Button';
import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import MovieCard from '../movie-card/MovieCard';

const MovieList = props => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params })
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id)
            }
            setItems(response.data.results)
        }
        getList()
    }, [props])

    return (
        <div className='movie-list'>
            <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={10}
            slidesPerView={'auto'}
            navigation
            speed={2000}
            effect={"fade"}
            >
                {
                    items.map((item, i) => (
                       <SwiperSlide key={i}>
                           <MovieCard item={item} category={props.category}/>
                           {/* <img src={apiConfig.w500Image(item.poster_path)} alt=""/> */}
                       </SwiperSlide> 
                    ))
                }
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

}

export default MovieList