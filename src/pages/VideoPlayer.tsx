import useAxios from "../hooks/useAxios"
import { API_KEY } from "./Home"
import { URL } from "./Home"
import { Results } from "../hooks/useAxios";
// import { useMovie } from "../filmsContext/MovieProvider";

import { useEffect } from "react";


interface ID {
    id: number
}

const VideoPlayer = ({id}: ID) => {
    const {data} = useAxios<Results>([
        `${URL}/movie/${id}/videos?&api_key=${API_KEY}&language=en-US&page=1`,
    ])

    // const {movieInfo, setMovieInfo} = useMovie()

  useEffect(() => {
    if(data){
        // console.log(data);
        // setMovieInfo(prev => prev?.map(c: => ({...c})))
    }
  })

  return (
    data && data[0]?.results && data[0]?.results[0]?.site === "YouTube" && 
    <section className="w-full max-w-[900px] p-[30px] mx-auto my-[50px]">
    <div className="w-full relative pb-[56.25%] h-0 overflow-hidden p-[10px]">
     <iframe
       src={`https://www.youtube.com/embed/${data[0]?.results[9]?.key}`}
       title={data[0]?.results[9]?.name}
       className="absolute top-0 left-0 w-full h-full border-0 object-cover"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
       allowFullScreen
      />
   </div>
   </section>
  )
}

export default VideoPlayer
