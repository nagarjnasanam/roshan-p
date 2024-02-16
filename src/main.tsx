import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './assets/index.css'
import Routes from './Elements/Routes/Routes.tsx';
import { Provider } from 'jotai/react'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HydrateAtoms } from './Elements/Misc/HydrateAtoms.tsx';
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <HydrateAtoms queryClient={queryClient}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </HydrateAtoms>
      </Provider>
    </QueryClientProvider>

  </React.StrictMode>,
)
