import React, { useEffect, useState, ReactNode, ReactElement } from "react"
import { useMovie } from "../filmsContext/MovieProvider"
import { API_KEY } from "./Home"
import { URL } from "./Home"
import { useParams } from "react-router"
import { Results } from "../hooks/useAxios"
import useAxios from "../hooks/useAxios"
import Nav from "../components/Nav"
import { SearchFilter } from "./Home"
import { ApiResponse } from "../hooks/useAxios"
import { TemplateOne} from "../components/DisplayTemplate"
import { SideLayout } from "./MovieDetails"
import { motion } from "framer-motion"
import { GrConnect } from "react-icons/gr"
import { GenreLayout } from "../components/GenreLayout"

const Genre = () => {
    const [error, setError] = useState<string | null>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {name} = useParams()
    const {setGenreData, genreData, GENRE} = useMovie()

    const findGenre = GENRE && GENRE[0]?.genres?.find(g => g.name === name)
    const genreId = findGenre ? findGenre.id : null

    const {data: movieData } = useAxios<Results>([
      `${URL}/discover/movie?&api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
  ])  

  useEffect(() => {
    if(movieData && movieData[0]?.results){
    setGenreData(movieData)
    console.log(genreData);
    }
  },[movieData, setGenreData])

  return (
    <main className="relative bg-[#0f0f0f]">
      <Nav />
      <div className="w-full min-h-screen flex flex-col items-center justify-start text-white pt-[150px] p-[10px]">
       <SearchFilter setError={setError} setIsLoading={setIsLoading}/>
        <GenreLayout />
        <div className="w-full mt-[50px] p-[10px] min-h-[300px] flex flex-col items-start justify-start">
          <h1 className="text-[2.5rem]">{name}</h1>
        <div className="w-full flex relative items-start justify-evenly lg:flex-wrap">
        {error 
            ? <motion.p initial={{ scale: 0 }} animate={{scale: 1}} className="text-white text-center flex flex-col items-center justify-center"><GrConnect className="text-[3rem]"/>{error}</motion.p>
            : isLoading 
            ? <p className="loader"></p>
            : <>
              <GenreTemplate genreData={movieData}>
                <TemplateOne data={null} handleMovieInfo={function (): void {} } />
              </GenreTemplate>
              <SideLayout />
           </>
           }
          
        </div>
      </div>
        </div>
    </main>
  )
}

interface Children {
  children: ReactNode,
  genreData: ApiResponse<Results>[] | null
}
 const GenreTemplate = ({children, genreData}: Children) => {
    const {setMovieInfo, movieInfo, setIsAuthorized} = useMovie()
      
    const handleMovieInfo = (
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
      
      
      setMovieInfo((prev) => {
        if (prev) {
          return [...prev, Data];
        } else {
          return [Data]; // If prev is null, initialize with the first Data element
        }
      })
      setIsAuthorized(true)
      document.getElementById("header")?.scrollIntoView({behavior: "smooth"})
      // console.log(scroll);
      console.log(movieInfo);
    }
   
    
   const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as ReactElement, {data: genreData && genreData[0] , handleMovieInfo });
      }
      return child;
    })

  return (
    <div className="w-full my-[20px] h-auto gap-[10px] flex flex-col items-start justify-evenly">
          {/* <h1 className="text-[1.5rem] sm:text-[1.2rem] text-white ml-[15px]">Popular</h1> */}
         {enhancedChildren}
    </div>
  )
}
export default Genre
