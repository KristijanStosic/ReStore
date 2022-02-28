import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import { useEffect, useState } from 'react'
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
import BasketPage from '../../features/basket/BasketPage'
import LoadingComponent from './LoadingComponent'
import CheckoutPage from '../../features/checkout/CheckoutPage'

// React toastify
import 'react-toastify/dist/ReactToastify.css'

import { getCookie } from '../util/utils'
import { useStoreContext } from '../context/StoreContext'
import agent from '../api/agent'

const App = () => {
  const { setBasket } = useStoreContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const buyerId = getCookie('buyerId')
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [setBasket])

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

  if(loading) return <LoadingComponent message='Initializing app...' />

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
          <Route path='/basket' component={BasketPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  )
}

export default App
