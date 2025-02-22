import useAxios from "../hooks/useAxios";
import { useMovie } from "../filmsContext/MovieProvider";
import { Results } from "../hooks/useAxios";
import { URL } from "../pages/Home";
import { API_KEY } from "../pages/Home";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router";

interface Children {
  children: ReactNode;
}

const Recommendations = ({children}: Children) => {
  const {setMovieInfo, movieInfo, setIsAuthorized} = useMovie()
  const { movieName } = useParams()
  const [curMovie, setCurMovie] = useState<Results[]>([])

  if (!movieInfo) {
    return <div>No movie information available.</div>;
  }
  
  useEffect(() => {
    const getCurMovie = () => {
        const curMovie = movieInfo.filter(c => c.title === movieName)
        console.log(curMovie);
        return curMovie
    }
    
    setCurMovie(getCurMovie())
    console.log(curMovie);
    console.log(movieInfo);
  },[movieName])

  const { data } = useAxios<Results>([
    `${URL}/movie/${curMovie[0]?.id}/recommendations?&api_key=${API_KEY}&language=en-US&page=1`,
  ]);

      
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
      // document.getElementById("header")?.scrollIntoView({behavior: "smooth"})
      // console.log(scroll);
      console.log(movieInfo);
    }
   

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement, {
        data: data && data[0],
        handleMovieInfo,
      });
    }
    return child;
  });
  
  if(data && data[0]?.results?.length === 0){
    return <div></div>
  }
  
  return (
    <div className="w-full my-[20px] h-auto gap-[10px] flex flex-col items-start justify-evenly">
      <h1 className="text-[1.5rem] sm:text-[1.2rem] text-white ml-[15px]">
        You might also like
      </h1>
      {enhancedChildren}
    </div>
  );
};

export default Recommendations;
