import { IArticle } from '~~/types/article';

export function useFavorite() {
  const toggleFavorite = (isFavoriteRef: { value: boolean }, article: IArticle) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (!article) return;

    const favoriteItem = {
        id: article.id,
      slug: article.slug,
      title: article.title,
      thumbnail: article.thumbnail,
      added_at: new Date().toISOString(), // Store the timestamp
    };

    if (isFavoriteRef.value) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((item: { id: string }) => item.id !== article.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favorites.push(favoriteItem);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Toggle the state
    isFavoriteRef.value = !isFavoriteRef.value;
  };

  return {
    toggleFavorite,
  };
}
