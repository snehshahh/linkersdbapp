import { useEffect } from 'react';
import { LinksOut } from '@/models/Dashboard/LinksOut';
import { getRequestList } from '@/services/baseService';


export const useFetchLinks = (setLinks: (links: LinksOut[]) => void, userId: string) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customData: LinksOut[] = await getRequestList(`links/${userId}`);
        setLinks(customData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userId]); // Add userId to the dependency array to re-fetch data when it changes
};