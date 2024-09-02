// import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { motion } from "framer-motion";
import { CiSearch } from 'react-icons/ci'
import { GrConnect } from "react-icons/gr";
import Nav from "../components/Nav";
import { useMovie } from "../filmsContext/MovieProvider";
import { Results } from "../hooks/useAxios";
import { IMG_URL } from "./Home";
import { URL } from "./Home";
import { API_KEY } from "./Home";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";

//  const API_KEY = "790d5cae"
//  const MOVIEDB_API_KEY = "783b989891a1dfd1d14239cf72263160"
//https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
//https://api.themoviedb.org/3/movie/550?api_key=783b989891a1dfd1d14239cf72263160


const Search = () => {
    const [movieData, setMovieData] = useState<Results[] | null>([])
    const [movieName, setMovieName] = useState("")
    const {data, error} = useAxios<Results>([
      `${URL}/search/movie?query=${movieName}&api_key=${API_KEY}`
    ])


    useEffect(() => {
      setMovieData(data && data[0]?.results)
    },[movieData])

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === "Enter"){
          setMovieData(data && data[0]?.results)
        }
    }
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
        key: string
    ) => {

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

  return (
    <div className="w-full relative min-h-screen p-[10px] bg-[#0f0f0f] gap-[20px] flex flex-col items-center justify-start">
      <Nav />
      <div className="w-full h-[150px]"/>
      <div className="w-[85%] relative max-w-[700px] h-[45px] flex items-center justify-center gap-[10px]">
       <div className="h-full absolute left-[10px] mx-auto text-white w-auto text-[1.5rem] flex items-center justify-center"><CiSearch /></div>  
        <input type="text" onKeyUp={handleSearch} placeholder="Search movie..." className="h-full bg-transparent pl-[40px] text-white w-full rounded-[10px] outline outline-[1px] outline-[#3b3b3b] border-none p-[10px] focus:outline-[#646464]" onChange={(e) => setMovieName(e.target.value)}/>
      </div>
        {/* {isLoading && <p className="text-white">Loading...</p>} */}
      <motion.div layout className="flex p-[10px] h-auto w-full max-w-[1200px] flex-wrap items-center justify-center gap-[20px]">
        {error && <motion.p initial={{ scale: 0 }} animate={{scale: 1}} className="text-white flex flex-col items-center justify-center"><GrConnect className="text-[3rem]"/>{error}</motion.p>}
        {movieData?.map(c => {
          return  (
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
            c.name,
            c.key
           )}
          key={c.id} className="w-full relative group bg-[#0f0f0f] cursor-pointer max-w-[200px] min-h-[300px] flex flex-col items-center justify-center">
            <Link to={`/movie/${encodeURIComponent(c.title)}`}><motion.div className="w-full h-full absolute top-0 left-0">
                <img src={IMG_URL + c.poster_path} alt={c.title} className="w-full h-full object-cover"/>
            </motion.div>
            <div className="absolute w-full left-0 right-0 bottom-0 h-[100px] bg-gradient-to-b from-zinc-950/5 to-zinc-950"/>
            <div className="p-[10px] absolute bottom-0 left-[10px]">
              <h1 className="text-white text-[1rem] w-full">{c.title}</h1>
            </div>
            </Link>
         </motion.div>
        )
        })}
      </motion.div>
    </div>
  )
}

export default Search
