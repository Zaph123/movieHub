import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Results } from "../hooks/useAxios"
import useLocalStorage from "../hooks/useLocalStorage"

export interface MOVIECONTEXT {
    movieInfo: Results[] | null
    setMovieInfo: React.Dispatch<React.SetStateAction<Results[] | null>>,
    isAuthorized: boolean,
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>,
}

export const MovieContext = createContext<MOVIECONTEXT | null>(null)

interface myCom {
    children: ReactNode
}

const MovieProvider = ({children}: myCom) => {
    const [movieInfo, setMovieInfo] = useState<Results[] | null>(() => {
      // Retrieve from localStorage on initial load and parse the JSON
      const savedMovies = localStorage.getItem('movieData');
      return savedMovies ? JSON.parse(savedMovies) : [];
    })
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    
    const {setItem} = useLocalStorage("movieData")
  
    useEffect(() => {
     setItem(movieInfo)
   }, [movieInfo])
 
    const context = {movieInfo, setMovieInfo, isAuthorized, setIsAuthorized}

  return (
    <MovieContext.Provider value={context}>
      {children}
    </MovieContext.Provider>
  )
}

 export const useMovie = (): MOVIECONTEXT => {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context
}
export default MovieProvider
