import { useState } from "react"
import useAxios from "../hooks/useAxios"
import { API_KEY } from "../pages/Home"
import { URL } from "../pages/Home"
import { useMovie } from "../filmsContext/MovieProvider"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

//https://api.themoviedb.org/3/discover/movie?&language=en-US&page=1&sort_by=popularity.desc'
export interface Genres {
    id: number,
    name: string
}

export const Genre = () => {
    const {SETGENRE} = useMovie()
    const [genreId, setGenreId] = useState<number | null>(0)
    const {data: genre, isLoading, error} = useAxios<Genres>([
        `${URL}/genre/movie/list?&api_key=${API_KEY}&language=en-US&page=1`,
    ])
    
    
    const handleGenres = (id: number) => {
        setGenreId(id)
        SETGENRE(genre)
        console.log(genreId);
    }
    
    return (
        <div className="w-[80%] h-auto flex flex-col items-start justify-start gap-[10px]">
      <h2 className="text-white ml-[10px]">Choose Genre:</h2>
      <div className="w-full h-auto flex flex-wrap items-center justify-center gap-[10px]">
      {/* {movieData[0]?.results[0]?.original_title} */}
      {error && <div></div>}
      {isLoading ? <p className="loader"></p> : (genre && genre[0]?.genres?.map(c => {
        return (
            <motion.div whileHover={{scale: 1.05}} className="w-auto h-auto">
             <Link to={`/genre/${encodeURIComponent(c?.name)}`} key={c.id} onClick={() => handleGenres(c.id)} className="hover:bg-gradient-to-b block text-[#c1c1c1] from-[#1f1f1f] bg-[#181818] text-[.9rem] hover:text-white p-[10px] rounded-[5px]">{c?.name}</Link>
            </motion.div>
        )
      }))}
      </div>
    </div>
    //genre/${encodeURIComponent(c?.name)}
)
}

// const getGenreId = () => {
//     const [getGenreId, setGetGenreId] = useState<number | null>(0)
//     const {data} = useAxios<Results>([
//         `${URL}/discover/movie?&api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc&with_genres=${getGenreId}`,
//     ])   

//     const {setGenre, genre} = useMovie()
//     useEffect(() => {
//         if(data)
//         setGenre(data)
//         console.log(data && data[0]);
//         console.log(genre);
//     },[getGenreId, data])

//     return {setGetGenreId}
// }

