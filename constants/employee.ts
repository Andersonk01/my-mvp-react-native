interface Employee {
  id: number;
  name: string;
  role: string;
  price?: number;
  availability: string[];
}

export const EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: 'Ana Tica',
    role: 'Cabeleireira',
    price: 50,
    availability: ['SEG - TER - SEX'],
  },
  {
    id: 2,
    name: 'João Sedoso',
    role: 'Manicure',
    price: 30,
    availability: ['TER - QUA - SEX'],
  },
  {
    id: 3,
    name: 'Maria Kotonete',
    role: 'Esteticista',
    price: 70,
    availability: ['SEG - QUI - SAB'],
  },
  {
    id: 4,
    name: 'Oliveiro Maduro',
    role: 'Depilador',
    price: 40,
    availability: ['TER - SEX'],
  },
  {
    id: 5,
    name: 'Narnia Souchique',
    role: 'Sobrancelhas',
    price: 150,
    availability: ['SEG'],
  },
];
