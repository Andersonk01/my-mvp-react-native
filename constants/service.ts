interface BeautyService {
  id: number;
  name: string;
  duration: number; 
  price: number; 
}

export const BEAUTY_SERVICES: BeautyService[] = [
  {
    id: 1,
    name: "Corte de Cabelo",
    duration: 60,
    price: 50.0,
  },
  {
    id: 2,
    name: "Manicure",
    duration: 45,
    price: 30.0,
  },
  {
    id: 3,
    name: "Pedicure",
    duration: 45,
    price: 35.0,
  },
  {
    id: 4,
    name: "Escova",
    duration: 40,
    price: 40.0,
  },
  {
    id: 5,
    name: "Coloração",
    duration: 120,
    price: 150.0,
  },
  {
    id: 6,
    name: "Depilação",
    duration: 30,
    price: 60.0,
  },
  {
    id: 7,
    name: "Limpeza de Pele",
    duration: 90,
    price: 80.0,
  },
  {
    id: 8,
    name: "Sobrancelha",
    duration: 30,
    price: 25.0,
  },
];

