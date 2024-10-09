import { useMovie } from "../filmsContext/MovieProvider"

const handleMovieInfo = () => {
    const {setMovieInfo, movieInfo, setIsAuthorized} = useMovie()
    
    const handleMovie = (
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
        type: string
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
        type: type
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
  return {handleMovie}
}

export default handleMovieInfo
