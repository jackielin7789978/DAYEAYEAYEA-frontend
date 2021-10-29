import { useEffect, useState, useMemo, useCallback } from 'react'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'
import {
  Articles,
  Step1,
  Step2,
  Step3,
  Categories,
  Search,
  Home,
  Login,
  Me,
  Products,
  NotFound
} from './pages'
import {
  AdminLogin,
  AdminOrders,
  AdminProducts,
  AdminMembers,
  AdminProductDetail,
  AdminProductAdd
} from './pages/AdminPages'
import { Brand, FAQ, Join, Notice, Privacy } from './pages/InfoPages/index'
import { PageHeight } from './components/general'
import {
  HashRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  Redirect
} from 'react-router-dom'
import {
  ScrollToTop,
  addItemsToLocalStorage,
  getItemsFromLocalStorage,
  getTokenFromLocalStorage
} from './utils'
import {
  LoadingContext,
  ModalContext,
  LocalStorageContext,
  UserContext
} from './context'
import GlobalStyle from './constants/globalStyle'
import jwt_decode from 'jwt-decode'

export default function App() {
  return (
    <Router basename='/'>
      <GlobalStyle />
      <ScrollToTop />
      <Switch>
        <Route path='/admin' component={AdminRoutes} />
        <Route path='/' component={Shop} />
      </Switch>
    </Router>
  )
}

function AdminRoutes() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(() => {
    if (!getTokenFromLocalStorage()) return false
    // 尚未加上時效驗證
    try {
      const _info = jwt_decode(getTokenFromLocalStorage())
      if (_info.hasOwnProperty('role')) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <Switch>
          <Route path={'/admin/login'}>
            {user ? <Redirect to='/admin/orders' /> : <AdminLogin />}
          </Route>
          <Route path={'/admin/orders'}>
            {user ? <AdminOrders /> : <Redirect to='/admin/login' />}
          </Route>
          <Route path={'/admin/products/detail/:id'}>
            {user ? <AdminProductDetail /> : <Redirect to='/admin/login' />}
          </Route>
          <Route path={'/admin/products/add'}>
            {user ? <AdminProductAdd /> : <Redirect to='/admin/login' />}
          </Route>
          <Route path={'/admin/products/:page'}>
            {user ? <AdminProducts /> : <Redirect to='/admin/login' />}
          </Route>
          <Route path={'/admin/orders'}>
            {user ? <AdminOrders /> : <Redirect to='/admin/login' />}
          </Route>
          <Route path={'/admin/members'}>
            {user ? <AdminMembers /> : <Redirect to='/admin/login' />}
          </Route>
        </Switch>
      </LoadingContext.Provider>
    </UserContext.Provider>
  )
}
function Shop() {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProductSoldOut, setIsProductSoldOut] = useState(false)
  const [cartItems, setCartItems] = useState(
    JSON.parse(getItemsFromLocalStorage())
  )

  const isTokenExpired = (token) => {
    try {
      return jwt_decode(token)
      // const _info = jwt_decode(token)
      // if (_info.exp < Date.now() / 1000) {
      //   return true
      // } else return false
    } catch (error) {
      return false
    }
  }

  const [user, setUser] = useState()
  useEffect(() => {
    let localToken = getTokenFromLocalStorage()
    if (!localToken) return false
    let decoded = isTokenExpired(localToken)
    return decoded.id ? setUser(decoded) : setUser(null)
  }, [])
  const handleModalClose = useCallback(() => {
    setIsModalOpen((isModalOpen) => false)
    setIsProductSoldOut((isProductSoldOut) => false)
  }, [setIsModalOpen])
  const totalPrice = useMemo(() => {
    if (!cartItems) return
    let sum = 0
    for (const cartItem of cartItems) {
      sum += cartItem.price
    }
    return sum
  }, [cartItems])
  const totalItems = useMemo(() => {
    if (!cartItems) return
    return cartItems.length
  }, [cartItems])

  const handleAddCartItem = (targetId, productInfo) => {
    const { imgs, name, price, discountPrice, quantity } = productInfo
    let storageProductItems = JSON.parse(getItemsFromLocalStorage()) || []
    let imgUrlSm
    if (imgs) {
      imgUrlSm = imgs.length > 0 ? imgs[0].imgUrlSm : ''
    }
    const checkHasProducts =
      storageProductItems.length >= 1
        ? storageProductItems.filter((item) => item.id === targetId)
        : []
    let productList
    if (checkHasProducts.length < 1) {
      productList = [
        ...storageProductItems,
        {
          id: targetId,
          img: imgUrlSm,
          name,
          price,
          discountPrice,
          quantity
        }
      ]
    } else {
      productList = storageProductItems.map((item) => {
        if (item.id !== targetId) return item
        return {
          ...item,
          quantity: item.quantity + quantity
        }
      })
    }
    addItemsToLocalStorage(productList)
    setCartItems(productList)
  }
  const handleRemoveCartItem = (id) => {
    addItemsToLocalStorage(cartItems.filter((item) => item.id !== id))
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  useEffect(() => {
    setCartItems(JSON.parse(getItemsFromLocalStorage()))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <ModalContext.Provider
          value={{
            isModalOpen,
            setIsModalOpen,
            handleModalClose,
            isProductSoldOut,
            setIsProductSoldOut
          }}
        >
          <LocalStorageContext.Provider
            value={{
              cartItems,
              totalPrice,
              totalItems,
              setCartItems,
              handleAddCartItem,
              handleRemoveCartItem
            }}
          >
            <Navbar />
            <PageHeight>
              <Switch>
                <Route path='/articles/:id/:page' component={Articles} />
                <Route path='/checkout' component={CheckoutRoutes} />
                <Route path='/categories/:slug/:page' component={Categories} />
                <Route path='/search' component={Search} />
                <Route path='/login' component={Login} />
                <Route path='/member' component={MemberRoutes} />
                <Route path='/products/:id' component={Products} />
                <Route path='/info' component={InfoRoutes} />
                <Route exact path='/' component={Home} />
                <Route path='*' component={NotFound} />
              </Switch>
            </PageHeight>
            <Footer />
          </LocalStorageContext.Provider>
        </ModalContext.Provider>
      </LoadingContext.Provider>
    </UserContext.Provider>
  )
}
function CheckoutRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/step1`} component={Step1} />
      <Route path={`${path}/step2`} component={Step2} />
      <Route path={`${path}/step3/:ticket`} component={Step3} />
    </Switch>
  )
}
function MemberRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/me`} component={Me} />
      <Route path={`${path}/modify-info`} component={Me} />
      <Route path={`${path}/orders/order-detail`} component={Me} />
      <Route path={`${path}/orders`} component={Me} />
    </Switch>
  )
}
function InfoRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/brand`} component={Brand} />
      <Route path={`${path}/faq`} component={FAQ} />
      <Route path={`${path}/join`} component={Join} />
      <Route path={`${path}/notice`} component={Notice} />
      <Route path={`${path}/privacy`} component={Privacy} />
    </Switch>
  )
}
