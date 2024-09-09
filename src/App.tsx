import Home from './pages/Home';
import Search from './pages/Search'
import NotFound from './pages/NotFound';
import MovieDetails from './pages/MovieDetails';
import Footer from './components/Footer';
import Genre from './pages/Genre';
import MovieProvider from './filmsContext/MovieProvider';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import './App.css'

import 'swiper/css';
import 'swiper/css/navigation';


// import required modules

const Layout = () => {
  return (
    <MovieProvider>
     <main className='font-poppins w-full bg-[#0f0f0f]'>
      <Outlet />
      <Footer />
     </main>
    </MovieProvider>
  )
}
//#F1F5F9
  const router = createBrowserRouter([
     {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
         },
        {
          path: "/search",
          element: <Search />
         },
        {
          path: "movie/:movieName",
          element: <MovieDetails />
         },
        {
          path: "genre/:name",
          element: <Genre />
         },
        {
          path: "*",
          element: <NotFound />
         },
      ]
     }
  ], {basename: "/movieHub"})

function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
