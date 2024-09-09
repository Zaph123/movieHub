import useAxios from "../hooks/useAxios"
import { useMovie } from "../filmsContext/MovieProvider"
import { URL } from "../pages/Home"
import { API_KEY } from "../pages/Home"
import { useEffect, useState } from "react"
import { IMG_URL } from "../pages/Home"

interface Cast {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: number,
  order: number
}

const Casts = () => {
  const { movieInfo } = useMovie()
  const [cast, setCast] = useState<Cast[] | undefined>([])

  const currentMovie  = () => {
    if(movieInfo){
    const curMovie = movieInfo.slice(movieInfo.length - 1)
    return curMovie
    }
   }
   
  const movie = currentMovie() ?? []
  
  const {data} = useAxios<Cast>([
    `${URL}/movie/${movie[0]?.id}/credits?&api_key=${API_KEY}&language=en-US&page=1`,
  ])

  useEffect(() => {
    if(data && data[0]){
    console.log(data[0].cast);
    const movieCasts = data[0].cast?.splice(0, 4)
    setCast(movieCasts)
    console.log(cast);
    }
    
  },[data])
  return (
    <div className="flex mt-[20px] h-auto w-auto items-start flex-col justify-center gap-[10px]">
      <h2 className="text-white">Casts:</h2>
    <div className="flex h-full lg:flex-wrap w-auto items-start justify-start gap-[10px]">
      {cast && cast.map(data => {
        return (
          <div className="flex h-full items-start w-full max-w-[250px] gap-[10px] justify-start">
            <div className="w-full max-w-[70px] h-[70px] rounded-full overflow-hidden">
              <img src={IMG_URL + data.profile_path} alt="" className="w-full h-full object-cover"/>
            </div>
            <div className="flex flex-col h-auto items-start justify-between">
              <p className="text-white text-[.9rem]">{data.original_name}</p>
              <span className="text-[#797979] text-[.75rem]">as</span>
              <span className="text-[#f1f1f1] text-[.8rem]">{data.character}</span>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Casts
