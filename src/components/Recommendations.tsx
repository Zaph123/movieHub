import useAxios from "../hooks/useAxios";
import { useMovie } from "../filmsContext/MovieProvider";
import { Results } from "../hooks/useAxios";
import { URL } from "../pages/Home";
import { API_KEY } from "../pages/Home";
import React, { ReactElement, ReactNode } from "react";
import handleMovieInfo from "../hooks/handleMovieInfo";

interface Children {
  children: ReactNode;
}

const Recommendations = ({children}: Children) => {
  const {movieInfo} = useMovie()
  const { data } = useAxios<Results>([
    `${URL}/movie/${movieInfo && movieInfo[0]?.id}/recommendations?&api_key=${API_KEY}&language=en-US&page=1`,
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
      <h1 className="text-[1.5rem] sm:text-[1.2rem] text-white ml-[15px]">
        You might also like
      </h1>
      {enhancedChildren}
    </div>
  );
};

export default Recommendations;
