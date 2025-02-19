import { useEffect, useState } from "react"
import { useMovie } from "../filmsContext/MovieProvider"
import { IMG_URL } from "./Home"
import Nav from "../components/Nav"
import { FaStar } from "react-icons/fa"
// import Categories from "../components/Categories"
import Similar from "../components/Similar"
import Recommendations from "../components/Recommendations"
import NowPlaying from "../components/NowPlaying"
import VideoPlayer from "./VideoPlayer"
// import { useNavigate } from "react-router"
import { TemplateOne, TemplateTwo, TemplateThree } from "../components/DisplayTemplate"
import Casts from "../components/Casts"
import { TrendingMovies, TrendingTv } from "../components/Trending"
import { GenreLayout } from "../components/GenreLayout"
import { useParams } from "react-router"
import { Results } from "../hooks/useAxios"

const MovieDetails = () => {
  // const navigate = useNavigate()
  const {movieName} = useParams()
  const [formattedDate, setFormattedDate] = useState("")
  const { movieInfo } = useMovie()
  const [curMovie, setCurMovie] = useState<Results[]>([])

  // useEffect(() => {
  //   if(!isAuthorized){
  //      navigate('/', { replace: true })
  //   }
  // },[isAuthorized])

  if (!movieInfo) {
    return <div>No movie information available.</div>;
  }
useEffect(() => {
  console.log(movieName, movieInfo.slice(movieInfo.length - 1));

  const currentMovie = () => {
    let curMovie = movieInfo.slice(movieInfo.length - 1)
    if(curMovie[0]?.title !== movieName){
      curMovie = movieInfo.filter(c => c.title === movieName)
      return curMovie
    }
    return curMovie
  }
  setCurMovie(currentMovie)
},[movieName])

  useEffect(() => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };
    setFormattedDate(formatDate(curMovie[0]?.release_date))

    console.log(curMovie);
  }, [curMovie[0]?.release_date])

  return (
    <main className="w-full">
      <Nav />
      <header id="header" className="w-full pt-[70px] p-[30px] h-auto flex-wrap flex items-center justify-evenly relative overflow-hidden">
        <div className="absolute md:hidden top-[70px] w-[350px] h-2/3 left-0">
          <img className="w-full h-full object-cover z-10" src={IMG_URL + curMovie[0]?.poster_path} alt={curMovie[0]?.poster_path} />
          <div className="absolute top-0 right-0 z-20 h-full w-full bg-gradient-to-l from-gradient to-gradient/0" />
          <div className="absolute top-0 right-0 z-20 h-full w-full bg-gradient-to-l from-gradient to-gradient/0" />
          <div className="absolute top-0 bottom-0 z-20 h-full w-full bg-gradient-to-t from-gradient to-gradient/0" />
          <div className="absolute top-0 bottom-0 z-20 h-full w-full bg-gradient-to-t from-gradient to-gradient/0" />
          <div className="absolute top-0 left-0 z-20 h-full w-full bg-gradient-to-b from-gradient to-gradient/0" />
        </div>
        <div className="absolute top-0 left-0 hidden z-20 md:block h-full w-full bg-gradient-to-r from-zinc-950 to-zinc-950/0" />
        <div className="absolute hidden md:block z-20 h-[50%] w-full bg-gradient-to-b from-[#0f0f0f00] to-[#0f0f0f] bottom-0" />
        <div className="w-full z-30 max-w-[800px] h-auto relative gap-[20px] flex flex-col items-start justify-end pb-[50px] pt-[30px]">
          <h1 className="text-[4rem] sm:text-[2rem] font-bold w-full max-w-[900px] text-white">{curMovie[0]?.title || curMovie[0]?.name}</h1>
          <div className="flex items-center justify-center gap-[10px]">
            {curMovie[0]?.release_date !== undefined && <span className="text-white text-[.85rem]">{formattedDate}</span>}
            <span className="text-white text-[.9rem]"> {curMovie[0]?.media_type}</span>
          </div>
          <div className="flex w-auto items-center justify-center gap-[15px]">
            {/* <div className="flex w-auto items-center justify-center gap-[5px]">
            <FaStar className="fill-[#e6e21c] text-[1rem]"/>
            <FaStar className="fill-[#e6e21c] text-[1rem]"/>
            <FaStar className="fill-[#e6e21c] text-[1rem]"/>
            <FaStar className="fill-[#e6e21c] text-[1rem]"/>
            <FaStar className="fill-[#e6e21c] text-[1rem]"/>
          </div> */}
            <div className=" text-white flex  text-[1rem] w-auto items-center justify-center">
              <FaStar className="fill-[#e6e21c]" />
              <span>{curMovie[0]?.vote_average.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-[#dddddd] sm:text-[.9rem] w-full max-w-[700px]">{curMovie[0]?.overview}</p>
          <div className="h-[50px] w-auto flex mt-[50px]">
            <a href="#" className="min-w-[200px] w-full h-full text-white border-[1px] border-white rounded-full flex items-center justify-center">Watch trailer</a>
          </div>
          <Casts />
        </div>
        <img className="w-full relative z-30 md:opacity-50 max-w-[400px] h-full md:absolute md:z-10 md:max-w-full top-0 left-0 object-cover" src={IMG_URL + curMovie[0]?.poster_path} alt={curMovie[0]?.poster_path} />
      </header>
      <VideoPlayer id={curMovie[0]?.id} />
      <GenreLayout />
      <section className="w-full flex xl:flex-col relative items-start justify-center gap-[10px] px-[10px]">
        <div className="w-full max-w-[1000px] xl:max-w-full flex flex-col items-start justify-start">
          <Similar>
            <TemplateTwo data={null} handleMovieInfo={function (): void { }} />
          </Similar>
          <Recommendations>
            <TemplateOne data={null} handleMovieInfo={function (): void { }} />
          </Recommendations>
          <NowPlaying>
            <TemplateTwo data={null} handleMovieInfo={function (): void { }} />
          </NowPlaying>
          {/* <Categories /> */}
        </div>
        <SideLayout />
      </section>
    </main>
  )
}

export const SideLayout = () => {
  return (
    <div className="w-full max-w-[350px] xl:flex-row md:flex-wrap xl:max-w-full xl:items-center xl:justify-around h-auto overflow-hidden flex flex-col justify-start items-start sticky top-0 gap-[30px]">
      <TrendingMovies>
        <TemplateThree data={null} handleMovieInfo={function (): void { }} />
      </TrendingMovies>
      <TrendingTv>
        <TemplateThree data={null} handleMovieInfo={function (): void { }} />
      </TrendingTv>
    </div>
  )
}
export default MovieDetails
