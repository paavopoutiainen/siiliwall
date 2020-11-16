import React from 'react'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'

function App() {
    return (
        <SnackbarProvider>
            <Router>
                <Routes />
            </Router>
        </SnackbarProvider>
    )
}
export default App
