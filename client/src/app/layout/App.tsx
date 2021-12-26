import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// Components
import Catalog from '../../features/catalog/Catalog'
import ProductDetails from '../../features/catalog/ProductDetails'
import Header from './Header'
import ServerError from '../errors/ServerError'
import NotFound from '../errors/NotFound'
import HomePage from '../../features/home/HomePage'
import AboutPage from '../../features/about/AboutPage'
import ContactPage from '../../features/contact/ContactPage'

// React toastify
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212',
      },
    },
  })

  const handleThemeChange = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme='colored' position='bottom-right' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={Catalog} />
          <Route path='/catalog/:id' component={ProductDetails} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/server-error' component={ServerError} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  )
}

export default App
