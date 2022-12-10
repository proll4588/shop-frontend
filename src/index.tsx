import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import client from './apollo/client'
import { ApolloProvider } from '@apollo/client'
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <RecoilRoot>
        <React.StrictMode>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </BrowserRouter>
        </React.StrictMode>
    </RecoilRoot>
)
