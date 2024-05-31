import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import addHeaderHttp from './utils/httpClient.ts'
import { AuthProvider } from './contexts/auth.tsx'
import { store } from './utils/store.ts'
import { Provider } from 'react-redux'

addHeaderHttp()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
