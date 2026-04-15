
export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  image: string;
  description: string;
  price: number;
  schedules: string[];
  isUpcoming?: boolean;
}

export interface NotificationSubscription {
  id: string;
  movieId: string;
  movieTitle: string;
  type: 'MOVIE_RELEASE' | 'SHOWTIME_REMINDER';
  schedule?: string;
  timestamp: string;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'SNACK' | 'DRINK';
}

export interface FoodOrder {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isOccupied: boolean;
  isSelected: boolean;
}

export interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  schedule: string;
  date: string;
  studio: string;
  seats: string[];
  foodOrders: FoodOrder[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  timestamp: string;
  status: 'PENDING' | 'PAID';
}

export interface SaleSummary {
  totalRevenue: number;
  totalTickets: number;
  movieStats: { [title: string]: number };
}
