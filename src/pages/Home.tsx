
import { useEffect, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
import Nav from "../components/Nav"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
// import { movieContext } from "../filmsContext/MovieProvider"
// import { MOVIECONTEXT } from "../filmsContext/MovieProvider"
import { useMovie } from "../filmsContext/MovieProvider"
// import { GrConnect } from "react-icons/gr"
import Categories from "../components/Categories"
import { Results } from "../hooks/useAxios"
import useAxios from "../hooks/useAxios"






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

    const {setMovieInfo} = useMovie()
    
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
      <div className="w-full h-[150px]"/>
        <section className="w-full flex h-full flex-col items-center justify-start gap-[20px]">
          {/* {isLoading && <p className="text-white">Loading...</p>} */}
          <div className="w-[85%] relative max-w-[700px] h-[45px] flex items-center justify-center gap-[10px]">
            <div className="h-full absolute left-[10px] text-white mx-auto w-auto text-[1.5rem] flex items-center justify-center"><CiSearch /></div>  
            <input type="text" onKeyUp={handleSearch} placeholder="Search movie..." className="h-full bg-transparent text-white pl-[40px] w-full rounded-[10px] outline outline-[1px] outline-[#3b3b3b] border-none p-[10px] focus:outline-[#646464]" onChange={(e) => setMovieName(e.target.value)}/>
          <AnimatePresence>
           {openBar && <motion.div
           id="scroller" 
           ref={ref}
           initial={{height: 0, y: -50, visibility: "hidden", opacity: 0}}
           animate={{
            height: "250px",
            y: 0,
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
           className="absolute outline outline-[1px] outline-[#3b3b3b] z-40 top-[45px] p-[10px] rounded-[10px] left-0 w-full overflow-hidden overflow-y-auto h-[300px] bg-[#161616]">
              <h4 className="text-[.85rem] text-[#797979]"><i>found </i> ({movieData?.length}) results</h4>
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
                  className="text-white flex items-center justify-start w-full h-[45px] rounded-[10px] hover:bg-[#1c1c1c] active:bg-[#1a1a1a] px-[10px] text-[.9rem]">
                    {data.title}
                  </Link>
                )
              })}
            </motion.div>}
          </AnimatePresence>
          </div>
          <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-[20px]">
            <Categories />
          </div>
        </section>
    </div>
  )
}
  



export default Home
