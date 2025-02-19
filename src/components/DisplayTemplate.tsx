import { Results } from "../hooks/useAxios"
import { motion } from "framer-motion"
import { IMG_URL } from "../pages/Home"
// import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation} from 'swiper/modules';
import { ApiResponse } from "../hooks/useAxios"
import { FaStar } from "react-icons/fa"

 export type HandleMovieInfo = (
    id: number,
    original_title: string,
    name: string,
    overview: string,
    media_type: string,
    poster_path: string,
    title: string,
    vote_count: number,
    vote_average: number,
    adult: boolean,
    release_date: string,
    original_language: string,
    site: string,
    key: string,
 ) => void

 
 interface Template1 {
    data: ApiResponse<Results> | null,
    handleMovieInfo: HandleMovieInfo,
  }
  
    const TemplateOne = ({data, handleMovieInfo}: Template1) => {
    return (
      <div className="w-full sm:p-0 sm:flex flex-wrap items-start justify-evenly min-h-[300px] p-[10px] gap-[10px] grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        {data && data?.results?.map((c, i) => {
        return (
         <DisplayTemplate key={i} c={c} id={i} handleMovieInfo={handleMovieInfo} width=''/>
        )
         }) 
              
     }
     </div>
    )
  }
    const TemplateTwo = ({data, handleMovieInfo}: Template1) => {
    return (
         <Swiper
             style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            padding: "10px"
          } as React.CSSProperties & { [key: string]: string }}
            spaceBetween={-2}
            slidesPerView={2}
            navigation={true}
            modules={[Navigation]}
            grabCursor={true}
            breakpoints={{
            300: {
              slidesPerView: 3,
              spaceBetween: -2,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
          className="w-full min-h-[300px] sm:min-h-[200px] p-[20px]">
        {data && data?.results?.map((c, i) => {
         return (
          <SwiperSlide key={c.id} className="flex-shrink-0 h-auto rounded-[10px]">
            <DisplayTemplate c={c} id={i} handleMovieInfo={handleMovieInfo} width='md:w-[92%]'/>
          </SwiperSlide>
        )
    }) 
              
     }
     </Swiper>
    )
}

export const TemplateThree = ({data, handleMovieInfo}: Template1) => {
 const slicedData = () => {
  return data?.results?.slice(0, 10)
 }
  return (
    <div className="w-full h-auto flex flex-col gap-[10px]">
       {slicedData()?.map((c, i) => {
        return (
         <DisplayTemplateTwo key={i} c={c} id={i} handleMovieInfo={handleMovieInfo} width=''/>
        )
         })        
     }
    </div>
  )
}

export interface Template {
   handleMovieInfo: HandleMovieInfo,
   c: Results,
   width: string,
   id: number
}

const DisplayTemplate = ({handleMovieInfo, c, width, id}: Template) => {
    return(
      <a href={`/movieHub/movie/${encodeURIComponent(c?.title || c?.name)}`} className={`${width} ${id === 14 || id === 8  && "col-span-2" } rounded-[5px] overflow-hidden w-full sm:max-w-[150px] flex h-full flex-shrink-0 sm:min-h-[200px] ${id === 0 ? "row-span-2 col-span-3 md:row-span-1 md:col-span-1" : ''} min-h-[300px]`}>
       <motion.div 
          initial={{opacity: 0, y: 50}}
          animate={{opacity: 1, y: 0}}
          transition={{
          duration: .5,
          type: "spring"
          }}
          whileHover={{scale: 1.05}}
          onClick={() => handleMovieInfo(
           c.id,
           c.original_title,
           c.name,
           c.overview,
           c.media_type,
           c.poster_path,
           c.title,
           c.vote_count,
           c.vote_average,
           c.adult,
           c.release_date,
           c.original_language,
           c.site,
           c.key,
          )}
         key={c?.id}
         style={{
          backgroundImage: `url(${IMG_URL + c?.poster_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
         }}
        className={` w-full overflow-auto relative group shadow-2xl flex flex-col items-center justify-center`}>
           {/* <motion.div className="w-full h-full">
               <img src={IMG_URL + c?.poster_path} loading="lazy" alt={String(c?.id)} className="w-full h-full object-cover"/>
           </motion.div> */}
           <div className="absolute w-full left-0 right-0 bottom-0 h-[200px] bg-gradient-to-b from-zinc-950/0 to-zinc-950"/>
           <div className="absolute bottom-[10px] h-auto left-[10px] overflow-hidden">
             <h1 className="text-white text-[1rem] sm:text-[.85rem] w-full">{c?.title || c?.name}</h1>
             {/* <p className="text-[0.85rem] text-[#b6b6b6] text-ellipsis">{c?.overview}</p> */}
           </div>
        </motion.div>
      </a>
    )
}
const DisplayTemplateTwo = ({handleMovieInfo, c, width, id}: Template) => {
    return(
    <a href={`/movieHub/movie/${encodeURIComponent(c?.title || c?.name)}`}>
       <motion.div 
          initial={{opacity: 0, y: 50}}
          animate={{opacity: 1, y: 0}}
          transition={{
          duration: .5,
          type: "spring"
          }}
          whileHover={{scale: 1.05}}
          onClick={() => handleMovieInfo(
           c.id,
           c.original_title,
           c.name,
           c.overview,
           c.media_type,
           c.poster_path,
           c.title,
           c.vote_count,
           c.vote_average,
           c.adult,
           c.release_date,
           c.original_language,
           c.site,
           c.key,
          )}
         key={c?.id}
        className={`${width} ${id} w-full overflow-auto rounded-xl flex-shrink-0 relative group cursor-pointer h-[100px] flex items-center justify-center`}>
           <motion.div className="w-full max-w-[100px] h-full">
               <img src={IMG_URL + c?.poster_path} loading="lazy" alt={String(c?.id)} className="w-full h-full object-cover"/>
           </motion.div>
           {/* <div className="absolute w-full left-0 right-0 bottom-0 h-[200px] bg-gradient-to-b from-zinc-950/0 to-zinc-950"/> */}
           <div className="px-[10px] py-[5px] bg-[#181818] flex flex-col items-start justify-between w-full h-full overflow-hidden"> 
             <h1 className="text-white text-[1rem] w-full">{c?.title || c?.name}</h1>
             <p className="text-white text-ellipsis h-5 overflow-hidden">{}</p>
             <p className="flex items-center text-[.9rem] text-white justify-start"><FaStar className="fill-[#e6e21c]"/>{c?.vote_average.toFixed(1)}</p>
           </div>
        </motion.div>
      </a>

    )
}

export  {DisplayTemplate, TemplateOne, TemplateTwo}
