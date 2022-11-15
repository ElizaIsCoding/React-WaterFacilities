import React, {useContext, useState} from 'react';

export const ThemeContext = React.createContext();
export const ThemeChangeContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext)
}

export function useThemeUpdate() {
    return useContext(ThemeChangeContext)
}

export function ThemeProvider({children}) {
    const [darkTheme, setDarkTheme] = useState(true);

    function toggleTheme() {
        setDarkTheme(prevState => !prevState);
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeChangeContext.Provider value={toggleTheme}>
                {children}
            </ThemeChangeContext.Provider>
        </ThemeContext.Provider>
    )
}