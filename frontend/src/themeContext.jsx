import { createTheme } from "@mui/material/styles"

// Light Theme
export const lightTheme = createTheme({
    palette:{
        mode:"light",
        primary:{
            main:"#153aea",
            contrastText:"#ffffff",
        },
        secondary:{
            main:"#f5f5fc",
        },
        background:{
            default:"#ffffff",
            paper:"#f5f3fc"
        },
        text:{
            primary:"#153aea",
        }
    },
    typography:{
        fontFamily:"'Excon', sans-serif",
    }
})

// Dark Theme
export const darkTheme = createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#37b6f6",
            contrastText:"#ffffff",
        },
        secondary:{
            main:"#262541",
        },
        background:{
            default:"#262541",
            paper:"#242424",
        },
        text:{
            primary:"#ffffff",
        }
    },
    typography:{
        fontFamily:"'Excon', sans-serif",
    }
})