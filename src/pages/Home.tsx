
import { useEffect, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
import Nav from "../components/Nav"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
// import { movieContext } from "../filmsContext/MovieProvider"
// import { MOVIECONTEXT } from "../filmsContext/MovieProvider"
import { useMovie } from "../filmsContext/MovieProvider"
import Categories from "../components/Categories"
import { Results } from "../hooks/useAxios"
import useAxios from "../hooks/useAxios"
import bgImg from '../assets/movie-collection.jpg'


export const URL = 'https://api.themoviedb.org/3'
export const API_KEY = "783b989891a1dfd1d14239cf72263160"
export const IMG_URL = "https://image.tmdb.org/t/p/w500"

const Home = () => {
    const [movieData, setMovieData] = useState<Results[] | undefined>([])
    const [movieName, setMovieName] = useState<string>('')
    const [openBar, setOpenBar] = useState<boolean>(false)

    const {data} = useAxios<Results>([
      `${URL}/search/movie?query=${movieName}&api_key=${API_KEY}`
    ])
   
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            // fetchData(`${URL}${API_KEY}&s=${movieName}`)
        }
    }

    useEffect(() => {
      if(data){
        const filter: Results[] | undefined = data[0]?.results?.filter(c => c.title.toLowerCase().trim() !== movieName)
      if(movieName.toLowerCase().trim() === ""){
        setMovieData([])
      }else{
        setOpenBar(true)
        setMovieData(filter)
      }
    }
    },[movieName])
  
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if(ref.current && !ref.current.contains(event.target as Node))
        setOpenBar(false)
      }
      if(openBar){
      document.addEventListener("mousedown", handleClickOutside)
      }else{
        document.removeEventListener("mousedown", handleClickOutside)
      }
    },[openBar])

    const {setMovieInfo, setIsAuthorized} = useMovie()
    
    const handleMovieInfo = (
        id: number,
        original_title: string,
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
        name: string,
        key: string,
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
      e.stopPropagation()
      const Data = {
        id: id,
        original_title: original_title,
        name: name,
        overview: overview,
        media_type: media_type,
        poster_path: poster_path,
        title: title,
        vote_count: vote_count,
        vote_average: vote_average,
        adult: adult,
        release_date: release_date,
        original_language: original_language,
        site: site,
        key: key,
      }  
      
      setMovieInfo([Data])
      setIsAuthorized(true)
    }

    // const variants = {
    //   show: {
    //     height: "200px",
    //   },
    //   hide: {
    //     height
    //   }
    // }
  return (
    <div className="relative w-full min-h-screen bg-[#0f0f0f]">
      <Nav />
      <div className="w-full absolute h-[200px]">
        <img src={bgImg} alt="" className="w-full h-full object-cover"/>
       <div className="absolute z-10 h-[70%] w-full bg-gradient-to-t from-[#0f0f0f00] to-[#0f0f0f] top-0"/>
       <div className="absolute z-10 h-[70%] w-full bg-gradient-to-b from-[#0f0f0f00] to-[#0f0f0f] bottom-0"/>
      </div>
      <div className="w-full relative h-[250px]"/>
        <section className="w-full flex h-full flex-col items-center justify-start gap-[20px]">
          {/* {isLoading && <p className="text-white">Loading...</p>} */}
          <div className="w-[85%] relative z-40 max-w-[700px] h-[55px] md:h-[45px] flex items-center justify-center gap-[10px]">
            <div className="h-full absolute left-[10px] text-white mx-auto w-auto text-[1.5rem] flex items-center justify-center"><CiSearch /></div>  
            <input type="text" onKeyUp={handleSearch} placeholder="Search movie/tv series..." className="h-full bg-[#252525] text-white pl-[40px] w-full rounded-full outline-none border-none p-[10px] focus:ring-[1px] focus:ring-[#646464]" onChange={(e) => setMovieName(e.target.value)}/>
          <AnimatePresence>
           {openBar && <motion.div
           id="scroller" 
           ref={ref}
           initial={{height: 0, y: -50, visibility: "hidden", opacity: 0}}
           animate={{
            height: "250px",
            y: 5,
            visibility: "visible",
            opacity: 1
           }}
           exit={{
            height: 0,
            y: -50,
            visibility: "hidden",
            opacity: 0
           }}
           transition={{
            duration: .3,
            type: "spring",
            ease: [.22,.68,0,1.71]
           }}
           className="absolute z-40 top-[55px] md:top-[45] p-[10px] rounded-[10px] left-0 w-full overflow-hidden overflow-y-auto h-[300px] bg-[#252525]">
              <h4 className="text-[.85rem] text-[#797979]"><i>found </i> <b>({movieData?.length})</b> results</h4>
              {movieData?.map(data => {
                return (
                  <Link key={data.id} to={`/movie/${encodeURIComponent(data.title)}`}
                  onClick={(e) => handleMovieInfo(
                    data.id,
                    data.original_title,
                    data.overview,
                    data.media_type,
                    data.poster_path,
                    data.title,
                    data.vote_count,
                    data.vote_average,
                    data.adult,
                    data.release_date,
                    data.original_language,
                    data.site,
                    data.name,
                    data.key,
                    e
                   )}
                  className="text-white flex items-center justify-start w-full min-h-[45px] rounded-[10px] hover:bg-[#1c1c1c] active:bg-[#1a1a1a] p-[10px] text-[.9rem]">
                    <img src={IMG_URL + data?.poster_path} loading="lazy" alt={String(data?.id)} className="w-[50px] h-full object-cover"/>
                    <span className="ml-[10px]">{data.title}</span>
                  </Link>
                )
              })}
            </motion.div>}
          </AnimatePresence>
          </div>
          <div className="w-full min-h-[400px] flex flex-col items-center justify-center">
            <Categories />
          </div>
        </section>
    </div>
  )
}
  



export default Home
