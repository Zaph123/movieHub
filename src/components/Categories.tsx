
import { Link } from "react-router-dom"
import { Results } from "../hooks/useAxios"
import { useMovie } from "../filmsContext/MovieProvider"
import { GrConnect } from "react-icons/gr"
import { motion } from "framer-motion"
import { IMG_URL } from "../pages/Home" 
import { URL } from "../pages/Home"
import { API_KEY } from "../pages/Home"
import useAxios from "../hooks/useAxios"
import loader from '../assets/loader.gif'
import { Swiper, SwiperSlide } from "swiper/react"
// import Lazy  from "swiper"

import { Navigation} from 'swiper/modules';


const Categories = () => {

    const { data, error, isLoading } = useAxios<Results>([
        `${URL}/movie/popular?&api_key=${API_KEY}&language=en-US&page=1`,
        `${URL}/movie/top_rated?&api_key=${API_KEY}&language=en-US&page=1`,
        `${URL}/movie/upcoming?&api_key=${API_KEY}&language=en-US&page=1`,
        `${URL}/trending/movie/day?&api_key=${API_KEY}&language=en-US`,
        `${URL}/trending/tv/day?&api_key=${API_KEY}&language=en-US`
    ])

    if(!data){
        return <div>No movie information available.</div>;
    }
    const [popular, topRated, upcoming, trendingMovies, trendingTvSeries] = data;
    
    // const [popular, setPopular] = useState<Results[]>([])
    // const [topRated, setTopRated] = useState<Results[] | null>([])
    // const [upcoming, setUpcoming] = useState<Results[] | null>([])
    // const [trendingMovies, setTrendingMovies] = useState<Results[] | null>([])
    // const [trendingTvSeries, setTrendingTvSeries] = useState<Results[] | null>([])
    // // const [isLoading, setIsLoading] = useState(false)
    // // const [error, setError] = useState("")
    //  useEffect(() => {
    //    setPopular(data[0])
    //    setTopRated(data[1])
    //    setUpcoming(data[2])
    //    setTrendingMovies(data[3])
    //    setTrendingTvSeries(data[4])
    // })
    //   const fetchData = async (url : string) => {
    //     try {
    //       setIsLoading(true)
    //       const res: AxiosResponse<ApiResponse> = await axios.get(url)
    //       const data: Results[] = res.data.results
    //       setIsLoading(false)
    //       setError('')
    //       return data
  
    //     } catch (error) {
    //       setIsLoading(false)
    //       setError("Please check your Internet Connection and try again")
    //     }
    //   }
  
    //   const fetchPopular = async () => {
    //      const data = await fetchData(`${URL}/movie/popular?&api_key=${API_KEY}&language=en-US&page=1`)
    //      setPopular(data)
    //      console.log(data);
         
    //   }
  
    //   const fetchTopRated = async () => {
    //      const data = await fetchData(`${URL}/movie/top_rated?&api_key=${API_KEY}&language=en-US&page=1`)
    //      setTopRated(data)
    //   }
  
    //   const fetchUpcoming = async () => {
    //      const data = await fetchData(`${URL}/movie/upcoming?&api_key=${API_KEY}&language=en-US&page=1`)
    //      setUpcoming(data)
    //   }

    //   const fetchTrendingMovies = async () => {
    //      const data = await fetchData(`${URL}/trending/movie/day?&api_key=${API_KEY}&language=en-US`)
    //      setTrendingMovies(data)
    //   }

    //   const fetchTrendingTvSeries = async () => {
    //      const data = await fetchData(`${URL}/trending/tv/day?&api_key=${API_KEY}&language=en-US`)
    //      setTrendingTvSeries(data)
    //      console.log(data);
    //   }
  
    //   useEffect(() => {
    // //     fetchData(`https://api.themoviedb.org/3/search/movie?query=thor&api_key=783b989891a1dfd1d14239cf72263160`)
    //        fetchPopular()
    //        fetchTopRated()
    //        fetchUpcoming()
    //        fetchTrendingMovies()
    //        fetchTrendingTvSeries()
    //   },[])
  
      if(isLoading) return <p className="text-white"><img src={loader} alt="" /></p>
      if(error) return <motion.p initial={{ scale: 0 }} animate={{scale: 1}} className="text-white flex flex-col items-center justify-center"><GrConnect className="text-[3rem]"/>{error}</motion.p>
      return (
      <>
      <Section data={popular?.results} heading="Popular" />
      <Section data={topRated?.results} heading="Top Rated" />
      <Section data={upcoming?.results} heading="Upcoming" />
      <Section data={trendingMovies?.results} heading="Trending Movies" />
      <Section data={trendingTvSeries?.results} heading="Trending TV Series" />
      </>
    )
}

interface Props {
    data: Results[] | null,
    heading: string
}
  export const Section = ({data, heading}: Props) => {
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
        
        
        setMovieInfo([Data])
        setIsAuthorized(true)
        document.getElementById("header")?.scrollIntoView({behavior: "smooth"})
        // console.log(scroll);
        console.log(movieInfo);
      }
  
      return (
          <div className="w-full p-[10px] h-auto gap-[20px] flex flex-col items-start justify-evenly">
          <h1 className="text-[1.5rem] sm:text-[1.2rem] text-white ml-[15px]">{heading}</h1>
          {/* <div className="w-full min-h-[300px] p-[10px] flex items-center justify-center flex-wrap gap-[15px]"> */}
          <Swiper
           style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          padding: "10px"
        }as React.CSSProperties & { [key: string]: string }}
          spaceBetween={5}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          grabCursor={true}
          breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
          className="w-full min-h-[300px] p-[20px]">
          {data?.map(c => {
        return  (
          <SwiperSlide className="flex-shrink-0 rounded-[10px]">
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
          c.name,
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
          c.key,
         )}
        key={c?.id}
       className="w-full rounded-xl overflow-auto flex-shrink-0 relative group shadow-2xl cursor-pointer min-h-[300px] flex flex-col items-center justify-center">
          <Link to={`/movie/${encodeURIComponent(c?.title || c?.name)}`}><motion.div className="w-full h-full absolute top-0 left-0">
              <img src={IMG_URL + c?.poster_path} loading="lazy" alt={String(c?.id)} className="w-full h-full object-cover"/>
          </motion.div>
          <div className="absolute w-full left-0 right-0 bottom-0 h-[200px] bg-gradient-to-b from-zinc-950/0 to-zinc-950"/>
          <div className="p-[10px] absolute bottom-[10px] h-[90px] left-[10px] overflow-hidden">
            <h1 className="text-white text-[1rem] w-full">{c?.title || c?.name}</h1>
            <p className="text-[0.85rem] text-[#b6b6b6] text-ellipsis">{c?.overview}</p>
          </div>
          </Link>
       </motion.div>
       </SwiperSlide>
      )
      })}
      </Swiper>
          {/* </div> */}
        </div>
      )
   }
  

export default Categories
