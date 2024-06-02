interface Employee {
  id: number;
  name: string;
  role: string;
  availability: string[];
}

export const EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: 'Ana Tica',
    role: 'Cabeleireira',
    availability: ['SEG - TER - SEX'],
  },
  {
    id: 2,
    name: 'João Sedoso',
    role: 'Manicure',
    availability: ['TER - QUA - SEX'],
  },
  {
    id: 3,
    name: 'Maria Kotonete',
    role: 'Esteticista',
    availability: ['SEG - QUI - SAB'],
  },
  {
    id: 4,
    name: 'Oliveiro Maduro',
    role: 'Depilador',
    availability: ['TER - SEX'],
  },
  {
    id: 5,
    name: 'Narnia Souchique',
    role: 'Sobrancelhas',
    availability: ['SEG'],
  },
];
