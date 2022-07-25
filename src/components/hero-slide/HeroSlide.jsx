import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Modal, { ModalContent } from '../modal/Modal'
import Button, { OutlineButton } from '../button/Button'
// Import Swiper React components
import { Autoplay, Navigation, } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css'; // core Swiper
// import 'swiper/modules/autoplay/autoplay.min.css'; // core Swiper
import 'swiper/css/navigation';

import tmbdApi, { category, movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import './hero-slide.scss'

const HeroSlide = () => {
    // SwiperCore.use([Autoplay])
    const [movieItems, setMovieItems] = useState([])
    useEffect(() => {
        const getMovieItems = async () => {
            const params = { page: 1 }
            try {
                const res = await tmbdApi.getMoviesList(movieType.popular, { params })
                console.log(res)
                setMovieItems(res.data.results.slice(0, 4))
            } catch {
                console.log('error')
            }
        }
        getMovieItems();
    }, [])

    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                speed={2000}
                effect={"fade"}
            >
                {movieItems.map((item, index) => (

                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {
                movieItems.map((item, i) => (
                    <TrailerModal key={i} item={item} />
                ))
            }
            {/* <Swiper
                modules={[Autoplay, Navigation]}
                slidesPerView={1}
                spaceBetween={0}
                speed={2000}
                navigation
                loop={true}
                effect={"fade"}
                autoplay
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    427: {
                        slidesPerView: 1,
                    },
                    // when window width is <= 999px
                    768: {
                        slidesPerView: 1,
                    },
                    999: {
                        slidesPerView: 1,
                    },

                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {movieItems.map((item, index) => (

                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <img src={apiConfig.originalImage(item.backdrop_path)} alt={item.original_title} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper> */}
        </div>
    )
}

const HeroSlideItem = (props) => {
    // const histor
    const navigate = useNavigate();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const setModalActive = async () => {
        console.log('hey')
        const modal = document.querySelector(`#modal_${item.id}`)
        console.log(modal)

        const videos = await tmbdApi.getVideos(category.movie, item.id);
        console.log(videos)

        if (videos.data.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.data.results[0].key;
            console.log(videoSrc)

            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer'
        }
        modal.classList.toggle('active');
    }
    return (
        <div className={`hero-slide__item ${props.className}`} style={{ backgroundImage: `url(${background})` }}>
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate.push('/movie/' + item.id)}>watch now</Button>
                        <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt={item.original_title} />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = (prop) => {
    const stuff = prop.item;
    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '')
    return (
        <Modal active={false} id={`modal_${stuff.id}`}>
            <ModalContent onClose={onClose} >
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"> </iframe>
            </ModalContent>

        </Modal>
    )
}


export default HeroSlide