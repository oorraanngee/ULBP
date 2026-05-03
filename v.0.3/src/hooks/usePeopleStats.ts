import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export interface PeopleStats {
  Bluesky: number;
  Discord: number;
  ULBP: number;
  ULBP_HUB: number;
  YouTube: number;
  total: number;
}

export function usePeopleStats() {
  const [stats, setStats] = useState<PeopleStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If db is not initialized properly, don't execute
    if (!db) {
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(doc(db, 'data', 'people'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const Bluesky = typeof data.Bluesky === 'number' ? data.Bluesky : 0;
        const Discord = typeof data.Discord === 'number' ? data.Discord : 0;
        const ULBP = typeof data.ULBP === 'number' ? data.ULBP : 0;
        const ULBP_HUB = typeof data.ULBP_HUB === 'number' ? data.ULBP_HUB : 0;
        const YouTube = typeof data.YouTube === 'number' ? data.YouTube : 0;
        
        const total = Bluesky + Discord + ULBP + ULBP_HUB + YouTube;
        
        setStats({ Bluesky, Discord, ULBP, ULBP_HUB, YouTube, total });
      } else {
        setStats({ Bluesky: 0, Discord: 0, ULBP: 0, ULBP_HUB: 0, YouTube: 0, total: 0 });
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching people stats: ", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { stats, loading };
}
