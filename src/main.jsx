import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


//TanStack Query
const queryClient = new QueryClient();


// Update the breakpoints as key-value pairs
const breakpoints = {
  base: '0px',
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}
// Extend the theme
const theme = extendTheme({ breakpoints })


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
       <BrowserRouter>
         <App />
       </BrowserRouter>
       {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
