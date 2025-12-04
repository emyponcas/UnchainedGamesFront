export interface Product {

  id: number;
  name: string;
  picture: string;

  playerMin: number;
  playerMax: number;
  duration: number;

  recommendedAge: string;
  price: number;
  stock: number;

  boxSize: string;
  difficulty: string;
  description: string;

  mechanics: any[];
  categories: any[];
  languages: any[];

}
