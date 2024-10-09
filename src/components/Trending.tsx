import useAxios from "../hooks/useAxios";
import { Results } from "../hooks/useAxios";
import { URL } from "../pages/Home";
import { API_KEY } from "../pages/Home";
import React, { ReactElement, ReactNode } from "react";
import { TemplateTwo } from "./DisplayTemplate";
import handleMovieInfo from "../hooks/handleMovieInfo";

interface Children {
  children: ReactNode;
}

const Trending = () => {
  return (
    <div className="w-full">
      <TrendingMovies>
      <TemplateTwo data={null} handleMovie={function (): void {} } />
      </TrendingMovies>
      <TrendingTv>
      <TemplateTwo data={null} handleMovie={function (): void {} } />
      </TrendingTv>
    </div>
  )
}

 export const TrendingMovies = ({children}: Children) => {
  const { data } = useAxios<Results>([
     `${URL}/trending/movie/day?&api_key=${API_KEY}&language=en-US`,
  ]);

  const {handleMovie} = handleMovieInfo()

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement, {
        data: data && data[0],
        handleMovie,
      });
    }
    return child;
  });

  if(data && data[0]?.results?.length === 0){
    return <div></div>
  }

  return (
    <div className="w-full my-[20px] p-[10px] h-auto gap-[10px] flex flex-col items-start justify-evenly">
      <h1 className="text-[1.5rem] sm:text-[1.2rem] text-white">
        Trending Movies
      </h1>
      {enhancedChildren}
      <a href="" className="self-center hover:text-white underline text-[.9rem] text-[#ffa32c]">See all</a>
    </div>
  );
 } 

export const TrendingTv = ({children}: Children) => {
  const { data } = useAxios<Results>([
        `${URL}/trending/tv/day?&api_key=${API_KEY}&language=en-US`
  ]);
  const {handleMovie} = handleMovieInfo()
   

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement, {
        data: data && data[0],
        handleMovie,
      });
    }
    return child;
  });

  if(data && data[0]?.results?.length === 0){
    return <div></div>
  }

  return (
    <div className="w-full my-[20px] h-auto gap-[10px] flex flex-col items-start justify-evenly">
      <h1 className="text-[1.5rem] sm:text-[1.2rem] text-white">
        Trending Series
      </h1>
      {enhancedChildren}
      <a href="" className="self-center hover:text-white underline text-[.9rem] text-[#ffa32c]">See all</a>
    </div>
  );
} 
export default Trending
