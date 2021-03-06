import { useEffect, useState } from 'react';

import { Content } from './components/Content';
import { SideBar } from './components/SideBar';

import { api } from './services/api';

import './styles/global.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([])
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenreId, setSelectedGenreId] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps)

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres')
      .then(response => setGenres(response.data))
  }, [])

  useEffect(() => {
    loadMovies()
    loadGenre()
  }, [selectedGenreId])

  function loadMovies() {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then(response => setMovies(response.data))
  }

  function loadGenre() {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then(response => setSelectedGenre(response.data))
  }

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        changeSelectedGenre={handleClickButton}
      />
      
      <Content
        movies={movies}
        selectedGenre={selectedGenre}
      />
    </div>
  )
}