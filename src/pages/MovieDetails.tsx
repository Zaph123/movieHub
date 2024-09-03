import { useEffect, useState } from "react"
import { useMovie } from "../filmsContext/MovieProvider"
import { IMG_URL } from "./Home"
import Nav from "../components/Nav"
import { FaStar } from "react-icons/fa"
import Categories from "../components/Categories"
import useAxios from "../hooks/useAxios"
import { API_KEY } from "./Home"
import { Results } from "../hooks/useAxios"
import { URL } from "./Home"
import { Section } from "../components/Categories"
import VideoPlayer from "./VideoPlayer"
import { useNavigate } from "react-router"


//'https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=1'
//'https://api.themoviedb.org/3/movie/movie_id/credits?language=en-US'
const MovieDetails = () => {
  const navigate = useNavigate()
  const [formattedDate, setFormattedDate] = useState("")
  const {movieInfo, isAuthorized} = useMovie()

  useEffect(() => {
    if(!isAuthorized){
       navigate('/', { replace: true })
    }
  },[isAuthorized])
    
    if (!movieInfo) {
      return <div>No movie information available.</div>;
    }

    const {data} = useAxios<Results>([
      `${URL}/movie/${movieInfo[0]?.id}/recommendations?&api_key=${API_KEY}&language=en-US&page=1`,
      `${URL}/movie/${movieInfo[0]?.id}/credits?&api_key=${API_KEY}&language=en-US&page=1`,
      `${URL}/genre/movie/list?&api_key=${API_KEY}&language=en-US`,
      // `${URL}/search/collection?query=thor/credits?&api_key=${API_KEY}&language=en-US&page=1`,
    ])
  //  const [recData] = data

    useEffect(() => {
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      };
      setFormattedDate(formatDate(movieInfo[0]?.release_date))
      // console.log(data[2]);
      
  },[movieInfo[0]?.release_date])

  return (
    <main className="w-full">
      <Nav />
      <header id="header" className="w-full h-auto pt-[70px] flex-wrap flex items-center justify-evenly relative overflow-hidden">
        <div className="absolute left-0 hidden z-20 md:block h-full w-full bg-gradient-to-r from-zinc-950 to-zinc-950/0"/> 
         <div className="absolute hidden md:block z-20 h-[50%] w-full bg-gradient-to-b from-[#0f0f0f00] to-[#0f0f0f] bottom-0"/>
        <div className="w-full z-30 max-w-[800px] h-auto relative gap-[20px] flex flex-col items-start justify-end p-[30px] pb-[50px]">
          <h1 className="text-[4rem] md:text-[3rem] font-bold w-full max-w-[900px] text-white">{movieInfo[0]?.title || movieInfo[0]?.name}</h1>
          <div className="flex items-center justify-center gap-[10px]">
           {movieInfo[0]?.release_date !== undefined && <span className="text-white text-[.85rem]">{formattedDate}</span>}
            <span className="text-white text-[.9rem]"> {movieInfo[0]?.media_type}</span>
          </div>
          <div className="flex w-auto items-center justify-center gap-[5px]">
            <FaStar className="fill-[#e6e21c] text-[1.2rem]"/>
            <FaStar className="fill-[#e6e21c] text-[1.2rem]"/>
            <FaStar className="fill-[#e6e21c] text-[1.2rem]"/>
            <FaStar className="fill-[#e6e21c] text-[1.2rem]"/>
            <FaStar className="fill-[#e6e21c] text-[1.2rem]"/>
          </div>
          <p className="text-[#dddddd] md:text-[.9rem] w-full max-w-[700px]">{movieInfo[0]?.overview}</p>
          <div className="h-[50px] w-auto flex mt-[50px]">
            <a href="#" className="min-w-[200px] w-full h-full text-white border-[1px] border-white rounded-full flex items-center justify-center">Watch trailer</a>
          </div>
        </div>
        <img className="w-full md:opacity-50 max-w-[400px] md:top-[70px] h-full md:absolute md:z-10 md:max-w-full top-0 left-0 object-cover" src={IMG_URL + movieInfo[0]?.poster_path} alt={movieInfo[0]?.poster_path} />
      </header>
      <VideoPlayer id={movieInfo[0]?.id}/>
      <section className="w-full min-h-[400px]">
       <Section data={data && data[0]?.results} heading="You might also like"/>
      </section>
      <Categories />
    </main>
  )
}

export default MovieDetails