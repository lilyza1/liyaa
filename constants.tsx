
import { Movie, FoodItem } from './types';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Avatar 3: Fire and Ash',
    genre: 'Sci-Fi / Action',
    duration: '190 mins',
    rating: 'PG-13',
    image: 'https://images.unsplash.com/photo-1460666833946-83601264c391?q=80&w=800&auto=format&fit=crop',
    description: 'James Cameron membawa kita kembali ke Pandora untuk menghadapi Ash People, suku Na\'vi yang agresif dan tinggal di wilayah vulkanik.',
    price: 55000,
    schedules: ['12:00', '15:30', '19:00', '21:30']
  },
  {
    id: '2',
    title: 'Agak Laen: Menyala Pantiku!',
    genre: 'Comedy / Drama',
    duration: '118 mins',
    rating: 'R13+',
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=800&auto=format&fit=crop',
    description: 'Kembalinya empat sekawan dalam petualangan baru yang lebih gila, penuh tawa, dan tentu saja... menyala pantinya!',
    price: 45000,
    schedules: ['13:00', '15:45', '18:15', '20:45']
  },
  {
    id: '3',
    title: 'Janur Ireng: Sewu Dino Prequel',
    genre: 'Horror / Mystery',
    duration: '125 mins',
    rating: 'D17+',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop',
    description: 'Kisah awal sebelum tragedi Sewu Dino. Mengungkap rahasia kelam keluarga Atmojo dan kutukan santet Janur Ireng yang legendaris.',
    price: 50000,
    schedules: ['14:00', '16:30', '19:30', '22:00']
  },
  {
    id: '5',
    title: 'The Shadow Strays',
    genre: 'Action / Thriller',
    duration: '144 mins',
    rating: 'D17+',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
    description: 'Seorang pembunuh bayaran muda harus melawan organisasinya demi menyelamatkan seorang anak kecil.',
    price: 45000,
    schedules: ['13:15', '16:15', '19:15', '22:15']
  },
  {
    id: '6',
    title: 'Dune: Part Two',
    genre: 'Sci-Fi / Epic',
    duration: '166 mins',
    rating: 'PG-13',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    description: 'Paul Atreides bersatu dengan Chani untuk membalas dendam terhadap para konspirator yang menghancurkan keluarganya.',
    price: 55000,
    schedules: ['10:30', '14:30', '18:30', '21:45']
  },
  {
    id: '7',
    title: 'Dilan 1990',
    genre: 'Drama / Romance',
    duration: '110 mins',
    rating: 'R13+',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop',
    description: 'Milea bertemu dengan Dilan di sebuah SMA di Bandung tahun 1990. Cara Dilan mendekati Milea yang tidak biasa membawanya ke dalam kisah cinta yang unik dan tak terlupakan.',
    price: 40000,
    schedules: ['12:30', '15:00', '17:30', '20:00']
  },
  {
    id: '8',
    title: 'Interstellar',
    genre: 'Sci-Fi / Classics',
    duration: '169 mins',
    rating: 'PG-13',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
    description: 'Edisi spesial re-run: Perjalanan melintasi lubang cacing demi menyelamatkan umat manusia.',
    price: 35000,
    schedules: ['11:00', '15:00', '19:00']
  },
  {
    id: '9',
    title: 'Sore: Istri dari masa depan',
    genre: 'Romance / Drama',
    duration: '105 mins',
    rating: 'R13+',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    description: 'Jonathan bertemu dengan Sore, seorang wanita yang tiba-tiba muncul dan mengaku sebagai istrinya yang datang dari masa depan untuk mengubah hidupnya.',
    price: 45000,
    schedules: ['12:15', '14:45', '17:15', '20:15']
  },
  {
    id: '10',
    title: 'Superman: Legacy',
    genre: 'Action / Sci-Fi',
    duration: 'TBA',
    rating: 'SU',
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop',
    description: 'Mendatang: Kisah awal Clark Kent dalam menyeimbangkan warisan Krypton dengan asuhan manusianya.',
    price: 0,
    schedules: [],
    isUpcoming: true
  }
];

export const SNACKS: FoodItem[] = [
  {
    id: 'f1',
    name: 'Combo Popcorn Caramel + Cola',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1594433834139-12117a631c15?q=80&w=400&auto=format&fit=crop',
    category: 'SNACK'
  },
  {
    id: 'f2',
    name: 'Caramel Popcorn Large',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1572177191856-3cde618dee1f?q=80&w=400&auto=format&fit=crop',
    category: 'SNACK'
  },
  {
    id: 'f3',
    name: 'Double Hot Dog Cheese',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?q=80&w=400&auto=format&fit=crop',
    category: 'SNACK'
  },
  {
    id: 'f4',
    name: 'Coca-Cola Zero Sugar',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&auto=format&fit=crop',
    category: 'DRINK'
  },
  {
    id: 'f5',
    name: 'Iced Thai Tea Special',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop',
    category: 'DRINK'
  },
  {
    id: 'f6',
    name: 'French Fries Salted',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400&auto=format&fit=crop',
    category: 'SNACK'
  }
];

export const THEME_COLORS = {
  primary: '#064e3b',
  secondary: '#022c22',
  accent: '#10b981',
  dark: '#020617',
};
