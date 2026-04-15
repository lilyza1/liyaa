
import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationSubscription } from '../types';

interface NotificationContextType {
  subscriptions: NotificationSubscription[];
  subscribe: (subscription: Omit<NotificationSubscription, 'id' | 'timestamp'>) => void;
  unsubscribe: (id: string) => void;
  isSubscribed: (movieId: string, type: string, schedule?: string) => boolean;
  notifications: string[];
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<NotificationSubscription[]>(() => {
    const saved = localStorage.getItem('cinemax_subscriptions');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('cinemax_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  // Simulate receiving a notification
  useEffect(() => {
    const interval = setInterval(() => {
      if (subscriptions.length > 0 && Math.random() > 0.8) {
        const randomSub = subscriptions[Math.floor(Math.random() * subscriptions.length)];
        const msg = randomSub.type === 'MOVIE_RELEASE' 
          ? `Film "${randomSub.movieTitle}" sekarang sudah tayang! Segera pesan tiketmu.`
          : `Pengingat: Jadwal tayang "${randomSub.movieTitle}" pada pukul ${randomSub.schedule} akan segera dimulai!`;
        
        setNotifications(prev => [msg, ...prev].slice(0, 5));
      }
    }, 15000); // Check every 15 seconds for simulation

    return () => clearInterval(interval);
  }, [subscriptions]);

  const subscribe = (sub: Omit<NotificationSubscription, 'id' | 'timestamp'>) => {
    const newSub: NotificationSubscription = {
      ...sub,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    setSubscriptions(prev => [...prev, newSub]);
  };

  const unsubscribe = (id: string) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  };

  const isSubscribed = (movieId: string, type: string, schedule?: string) => {
    return subscriptions.some(s => 
      s.movieId === movieId && 
      s.type === type && 
      (schedule ? s.schedule === schedule : true)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ 
      subscriptions, 
      subscribe, 
      unsubscribe, 
      isSubscribed, 
      notifications, 
      clearNotifications 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
