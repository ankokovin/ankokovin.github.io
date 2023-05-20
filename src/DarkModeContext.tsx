import {createContext} from 'react';
import { Scheme } from './DarkModeUtils';

export const DarkModeContext = createContext({
    isDarkMode:false,
    currentScheme: "light" as Scheme,
    setCurrentScheme: null as null | ((_scheme: Scheme) => void)
  })

export default DarkModeContext;