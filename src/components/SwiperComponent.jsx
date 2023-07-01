import { Navigation, Pagination, Scrollbar, A11y, Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '../components/MovieCard'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import '../css/customSwiper.css';
import '../css/movierow.css'

const SwiperComponent = ({slides, startIndex, isLargeSwiper}) => {

    const slideImages = slides.map((slide) => {
        return (
        <SwiperSlide key = {slide.id}>
               <MovieCard
                    key = {slide.id}
                    background = {slide.backdrop_path}
                    posterBackground = {slide.poster_path}
                    title = {slide.original_title || slide.title}
                    description = {slide.overview}
                    releaseDate = {slide.release_date}
                    isLarge = {isLargeSwiper}
               /> 
        </SwiperSlide>
        )
    })

    return (
        <div onClick = {(e) => e.stopPropagation()} >
        <Swiper
            initialSlide = {0}
            autoplay = {{delay: Math.random() * (4500 - 2500) + 2500}}
            modules = {[Navigation, Scrollbar, A11y, Autoplay]}
            navigation  
            slidesPerView={isLargeSwiper ? 1 : 2}
            spaceBetween={isLargeSwiper ? 25 : 25}
            className = "relative movie-row-swiper h-full w-full"
            breakpoints = {{
                600: {
                    slidesPerView: isLargeSwiper ? 1 : 3,
                },
                650: {
                    slidesPerView: isLargeSwiper ? 2 : 3,
                },
                800: {
                    slidesPerView: isLargeSwiper ? 2 : 4,
                },
                975: {
                    slidesPerView: isLargeSwiper ? 2 : 5,
                },
                1180: {
                    slidesPerView: isLargeSwiper ? 3 : 6,
                },
                1435: {
                    slidesPerView: isLargeSwiper ? 4 : 7,
                },
                1555: {
                    slidesPerView: isLargeSwiper ? 4 : 8,
                },
                1700: {
                    slidesPerView: isLargeSwiper ? 4 : 9,
                },
                
            }}
        >
            {slideImages}
            <div className = "movie-left-arrow-backdrop absolute w-[3rem] h-[19.5rem] left-[0%] top-0 z-[1]"/>
            <div className = "movie-right-arrow-backdrop absolute right-[0%] w-[3rem] h-[19.5rem] top-0 z-[1]"/>
        </Swiper>
        </div>
    );
};

export default SwiperComponent