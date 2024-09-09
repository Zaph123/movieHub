import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Results } from "../hooks/useAxios"
import useLocalStorage from "../hooks/useLocalStorage"
import { ApiResponse } from "../hooks/useAxios"
import { Genres } from "../components/Genre"

export interface MOVIECONTEXT {
    movieInfo: Results[] | null
    setMovieInfo: React.Dispatch<React.SetStateAction<Results[] | null>>,
    genreData: ApiResponse<Results>[] | null
    setGenreData: React.Dispatch<React.SetStateAction<ApiResponse<Results>[] | null>>,
    isAuthorized: boolean,
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>,
    error: string | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    SETGENRE: React.Dispatch<React.SetStateAction<ApiResponse<Genres>[] | null>>,
    GENRE: ApiResponse<Genres>[] | null
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

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [genreData, setGenreData] = useState<ApiResponse<Results>[] | null>(() => {
      const savedGenres = localStorage.getItem('genre');
      return savedGenres ? JSON.parse(savedGenres) : [];
    })
   
    const [GENRE, SETGENRE] = useState<ApiResponse<Genres>[] | null>([])

    useEffect(() => {
      const {setItem} = useLocalStorage("movieData")
      setItem(movieInfo)
   }, [movieInfo])
 
    useEffect(() => {
      const {setItem} = useLocalStorage("genre")
      setItem(genreData)
   }, [genreData])
 
    const context = {
      movieInfo,
      setMovieInfo,
      genreData,
      setGenreData, 
      isAuthorized, 
      setIsAuthorized, 
      error, 
      setError, 
      isLoading,
      setIsLoading,
      SETGENRE,
      GENRE,
    }

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
