import { Button } from './Button';

import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  changeSelectedGenre: (id: number) => void;
}

export function SideBar({genres, selectedGenreId, changeSelectedGenre}: SideBarProps) {
  return (
    <nav className='sidebar'>
      <span>Watch<p>Me</p></span>

      <div className='buttons-container'>
        {genres.map(genre => (
          <Button
            key={genre.id}
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => changeSelectedGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}