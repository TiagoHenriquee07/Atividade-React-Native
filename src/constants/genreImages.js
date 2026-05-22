const GENRE_IMAGES = {
  'Ação': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80',
  'Comédia': 'https://images.unsplash.com/photo-1524985069026-057b67a00f2d?w=400&q=80',
  'Drama': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80',
  'Ficção Científica': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
  'Terror': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&q=80',
  'Romance': 'https://images.unsplash.com/photo-1518676590629-4dcbd214ef00?w=400&q=80',
  'Animação': 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&q=80',
};

const MOVIE_POSTERS = {
  matrix: 'https://images.unsplash.com/photo-1616530940355-351b1093a43f?w=400&q=80',
  senhor: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
  toy: 'https://images.unsplash.com/photo-1594909122841-45284af594e6?w=400&q=80',
};

export function getPosterForMovie(nome, genero) {
  const key = nome.toLowerCase();
  if (key.includes('matrix')) return MOVIE_POSTERS.matrix;
  if (key.includes('senhor') || key.includes('anel')) return MOVIE_POSTERS.senhor;
  if (key.includes('toy')) return MOVIE_POSTERS.toy;
  return GENRE_IMAGES[genero] || GENRE_IMAGES['Drama'];
}

export const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80';

export const TASK_HEADER_IMAGE =
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80';
