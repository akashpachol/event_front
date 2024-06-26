
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import {store} from './utils/redux/app/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')!).render(

         <Provider store={store}>
            
         <GoogleOAuthProvider clientId="793856567539-g571dvb9lv0qv1lh34hhv40ceerqha6d.apps.googleusercontent.com">
        <App />
        </GoogleOAuthProvider>
    </Provider>

)
