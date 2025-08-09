export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export type SortOption = 'relevance' | 'priceDesc' | 'priceAsc' | 'rating';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Novidades' },
  { value: 'priceDesc', label: 'Preço: Maior - menor' },
  { value: 'priceAsc', label: 'Preço: Menor - maior' },
  { value: 'rating', label: 'Mais vendidos' },
];
