import { useReducer } from "react";
import { createContext } from "react"
import { themeReducer } from "./reducer/theme.reducer";
import { TOGGLE_THEME } from "./ActionType";



const initialState = {
   theme: 'light'
}

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    const toggleTheme = (val) => {
        console.log(val);

        const newTheme = val === 'light' ? 'dark' : 'light'

        dispatch({type:TOGGLE_THEME, payload:newTheme})
    }

    return (
        <ThemeContext.Provider
        value = {{
            ...state,
            toggleTheme
        }}
        >
           {children}
        </ThemeContext.Provider>
    )
}



