import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './utils/redux/app/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
         <Provider store={store}>
         <GoogleOAuthProvider clientId="148557789553-sacq2fu1liun02j38c29srmi5ego060l.apps.googleusercontent.com">
        <App />
        </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
