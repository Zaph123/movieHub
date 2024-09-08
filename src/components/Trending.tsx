import useAxios from "../hooks/useAxios";
import { useMovie } from "../filmsContext/MovieProvider";
import { Results } from "../hooks/useAxios";
import { URL } from "../pages/Home";
import { API_KEY } from "../pages/Home";
import React, { ReactElement, ReactNode } from "react";
import { TemplateTwo } from "./DisplayTemplate";

interface Children {
  children: ReactNode;
}

const Trending = () => {
  return (
    <div className="w-full">
      <TrendingMovies>
      <TemplateTwo data={null} handleMovieInfo={function (): void {} } />
      </TrendingMovies>
      <TrendingTv>
      <TemplateTwo data={null} handleMovieInfo={function (): void {} } />
      </TrendingTv>
    </div>
  )
}

 export const TrendingMovies = ({children}: Children) => {
  const {setMovieInfo, movieInfo, setIsAuthorized} = useMovie()
  const { data } = useAxios<Results>([
     `${URL}/trending/movie/day?&api_key=${API_KEY}&language=en-US`,
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
      
      
      setMovieInfo([Data])
      setIsAuthorized(true)
      document.getElementById("header")?.scrollIntoView({behavior: "smooth"})
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
        Trending Movies
      </h1>
      {enhancedChildren}
      <a href="" className="self-center hover:text-white underline text-[.9rem] text-[#ffa32c]">See all</a>
    </div>
  );
 } 

export const TrendingTv = ({children}: Children) => {
  const {setMovieInfo, movieInfo, setIsAuthorized} = useMovie()
  const { data } = useAxios<Results>([
        `${URL}/trending/tv/day?&api_key=${API_KEY}&language=en-US`
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
      
      
      setMovieInfo([Data])
      setIsAuthorized(true)
      document.getElementById("header")?.scrollIntoView({behavior: "smooth"})
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
        Trending Series
      </h1>
      {enhancedChildren}
      <a href="" className="self-center hover:text-white underline text-[.9rem] text-[#ffa32c]">See all</a>
    </div>
  );
} 
export default Trending
