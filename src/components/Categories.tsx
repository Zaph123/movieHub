
import Popular from "./Popular"
import TopRated from "./TopRated"
import Upcoming from "./Upcoming"
import { TemplateOne } from "./DisplayTemplate"
import { TemplateTwo } from "./DisplayTemplate"


const Categories = () => {
      return (
      <>
      <Popular>
        <TemplateOne data={null} handleMovie={function (): void {} } />
      </Popular>
      <TopRated>
        <TemplateTwo data={null} handleMovie={function (): void {} } />
      </TopRated>
      <Upcoming>
        <TemplateTwo data={null} handleMovie={function (): void {} } />
      </Upcoming>
      {/* <Section data={trendingMovies?.results} heading="Trending Movies" />
      <Section data={trendingTvSeries?.results} heading="Trending TV Series" /> */}
      </>
    )
}

  

export default Categories
