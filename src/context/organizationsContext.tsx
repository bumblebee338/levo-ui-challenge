import { createContext } from 'react';

interface DataContextType {
    data: any[];
    loading: boolean;
    error: Error | null;
  }

  
const OrganizationsContext = createContext<DataContextType | undefined>(undefined)

export default OrganizationsContext