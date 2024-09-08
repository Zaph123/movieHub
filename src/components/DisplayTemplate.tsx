import { Results } from "../hooks/useAxios"
import { motion } from "framer-motion"
import { IMG_URL } from "../pages/Home"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation} from 'swiper/modules';
import { ApiResponse } from "../hooks/useAxios"

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
      <div className="w-full min-h-[300px] p-[20px] gap-[10px] grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        {data && data?.results?.map((c, i) => {
        return (
         <DisplayTemplate c={c} id={i} handleMovieInfo={handleMovieInfo} width=''/>
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
            spaceBetween={-20}
            slidesPerView={1}
            navigation={true}
            modules={[Navigation]}
            grabCursor={true}
            breakpoints={{
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
          className="w-full min-h-[300px] p-[20px]">
        {data && data?.results?.map((c, i) => {
         return (
          <SwiperSlide className="flex-shrink-0 rounded-[10px]">
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
         <DisplayTemplateTwo c={c} id={i} handleMovieInfo={handleMovieInfo} width=''/>
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
        className={`${width} w-full ${id === 0 ? "row-span-2 col-span-3 md:row-span-1 md:col-span-1" : ''} ${id === 14 ? "col-span-2" : ''} rounded-xl overflow-auto flex-shrink-0 relative group shadow-2xl cursor-pointer min-h-[300px] flex flex-col items-center justify-center`}>
           <Link to={`/movie/${encodeURIComponent(c?.title || c?.name)}`}><motion.div className="w-full h-full absolute top-0 left-0">
               <img src={IMG_URL + c?.poster_path} loading="lazy" alt={String(c?.id)} className="w-full h-full object-cover"/>
           </motion.div>
           <div className="absolute w-full left-0 right-0 bottom-0 h-[200px] bg-gradient-to-b from-zinc-950/0 to-zinc-950"/>
           <div className="px-[10px] absolute bottom-[10px] h-auto left-[10px] overflow-hidden">
             <h1 className="text-white text-[1rem] w-full">{c?.title || c?.name}</h1>
             {/* <p className="text-[0.85rem] text-[#b6b6b6] text-ellipsis">{c?.overview}</p> */}
           </div>
           </Link>
        </motion.div>

    )
}
const DisplayTemplateTwo = ({handleMovieInfo, c, width, id}: Template) => {
    return(
    <Link to={`/movie/${encodeURIComponent(c?.title || c?.name)}`}>
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
        className={`${width} ${id} w-full overflow-auto flex-shrink-0 relative group cursor-pointer h-[100px] flex items-center justify-center`}>
           <motion.div className="w-full max-w-[100px] h-full">
               <img src={IMG_URL + c?.poster_path} loading="lazy" alt={String(c?.id)} className="w-full h-full object-cover"/>
           </motion.div>
           {/* <div className="absolute w-full left-0 right-0 bottom-0 h-[200px] bg-gradient-to-b from-zinc-950/0 to-zinc-950"/> */}
           <div className="px-[10px] w-full h-full overflow-hidden">
             <h1 className="text-white text-[1rem] w-full">{c?.title || c?.name}</h1>
           </div>
        </motion.div>
      </Link>

    )
}

export  {DisplayTemplate, TemplateOne, TemplateTwo}
