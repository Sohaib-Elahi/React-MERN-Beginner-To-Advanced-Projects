import { useState } from 'react'
import { MovieHeader } from './components/layout/MovieHeader'
import { MovieLayout } from './components/layout/MovieLayout'
import { HeroBanner } from './components/hero/HeroBanner';
import CategoryRow from './components/rows/CategoryRow';
import SpotlightSlider from './components/rows/SpotlightSlider';
import SearchOverlay from './components/search/SearchOverlay';
import { MovieDetailsDialog } from './components/details/MovieDetailsDialog';


function App() {

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  return (
      <MovieLayout>
        <MovieHeader  onOpenSearch={() => setIsSearchOpen(true)}/>
        <main className='flex flex-col gap-10 pb-16'>
            <HeroBanner onSelectMovie={setSelectedMovie}/>

            <SpotlightSlider 
              title="Trending Today"
              category="trending"
              onSelectMovie={setSelectedMovie}
            />

            <CategoryRow 
              title="Now Playing"
              category="now_playing"
              onSelectMovie={setSelectedMovie}
            />

            <CategoryRow 
              title="Top Rated"
              category="top_rated"
              onSelectMovie={setSelectedMovie}
            />
            
            <CategoryRow 
              title="Popular"
              category="popular"
              onSelectMovie={setSelectedMovie}
            />
        </main>
        <SearchOverlay 
          open = {isSearchOpen}
          onClose = {() => setIsSearchOpen(false)}
          onSelectMovie = {(movie) => {
            setSelectedMovie(movie);
            setIsSearchOpen(false);
          }}
        />

        <MovieDetailsDialog
          movie ={selectedMovie}
          onClose = {() => setSelectedMovie(null)}
        />
      </MovieLayout>
  )
}

export default App
