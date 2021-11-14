import { useEffect, useState, useMemo } from 'react'
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
  MeTab,
  OrderDetail,
  Products,
  NotFound
} from './pages'
import {
  AdminLogin,
  AdminOrders,
  AdminOrderDetail,
  AdminProducts,
  AdminMembers,
  AdminMemberDetail,
  AdminProductDetail,
  AdminProductAdd,
  Layout as AdminLayout,
  NotFound as AdminNotFound
} from './pages/AdminPages'
import { Brand, FAQ, Join, Notice, Privacy } from './pages/InfoPages/index'
import { PageHeight } from './components/general'
import {
  HashRouter as Router,
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'
import {
  ScrollToTop,
  addItemsToLocalStorage,
  getItemsFromLocalStorage
} from './utils'
import { LocalStorageContext, UserContext, OversoldContext } from './context'
import GlobalStyle from './constants/globalStyle'
import useAuth from './hooks/useAuth'

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
  return (
    <Switch>
      <Route path={'/admin/login'} component={AdminLogin} />
      <AdminLayout>
        <Switch>
          <Route path={'/admin/members/:id'} component={AdminMemberDetail} />
          <Route path={'/admin/members'} component={AdminMembers} />
          <Route path={'/admin/orders/:ticket'} component={AdminOrderDetail} />
          <Route path={'/admin/orders'} component={AdminOrders} />
          <Route
            path={'/admin/products/detail/:id'}
            component={AdminProductDetail}
          />
          <Route path={'/admin/products/add'} component={AdminProductAdd} />
          <Route path={'/admin/products/:page'} component={AdminProducts} />
          <Route path={'/admin/products/'} component={AdminProducts} />
          <Route path={'*'} component={AdminNotFound} />
        </Switch>
      </AdminLayout>
    </Switch>
  )
}
function Shop() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(getItemsFromLocalStorage())
  )
  const memberAuth = useAuth('members')

  const totalPrice = useMemo(() => {
    if (!cartItems) return
    // 預先加上 80 元運費
    let sum = 80
    for (const cartItem of cartItems) {
      sum += cartItem.discountPrice * cartItem.quantity
    }
    return sum
  }, [cartItems])

  const totalItems = useMemo(() => {
    if (!cartItems) return
    return cartItems.length
  }, [cartItems])

  const handleAddCartItem = (targetId, productInfo) => {
    const { imgs, name, price, discountPrice, quantity } = productInfo
    const length = imgs.length
    let storageProductItems = JSON.parse(getItemsFromLocalStorage()) || []
    let imgUrlSm
    if (imgs) {
      imgUrlSm = imgs[length - 1].imgUrlSm || imgs[0].imgUrlSm
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
    <UserContext.Provider value={memberAuth}>
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
    </UserContext.Provider>
  )
}
function CheckoutRoutes() {
  const [isOversold, setIsOversold] = useState(false)
  const { path } = useRouteMatch()
  return (
    <OversoldContext.Provider value={{ isOversold, setIsOversold }}>
      <Switch>
        <Route path={`${path}/step1`} component={Step1} />
        <Route path={`${path}/step2`} component={Step2} />
        <Route path={`${path}/step3/:ticket`} component={Step3} />
        <Route path='*' component={NotFound} />
      </Switch>
    </OversoldContext.Provider>
  )
}
function MemberRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/orders/:ticket`} component={OrderDetail} />
      <Route path={`${path}/:tab(me|info|orders)`} component={MeTab} />
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
