import { useEffect, useState, useMemo } from 'react'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'
import {
  Articles,
  Step1,
  Step2,
  Step3,
  Categories,
  Home,
  Login,
  Me,
  ModifyInfo,
  OrderDetail,
  Orders,
  Products,
  NotFound
} from './pages/index'
import { AdminOrders, AdminMembers, AdminProducts } from './pages/AdminPages'
import { Brand, FAQ, Join, Notice, Privacy } from './pages/InfoPages/index'
<<<<<<< HEAD
import { PageHeight, AdminPageWidth } from './components/general'
import {
  HashRouter as Router,
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'
import { ScrollToTop, getProductItems, setProductItems } from './utils'
import { LoadingContext, ModalContext, LocalStorageContext } from './context'
=======
import { PageHeight } from './components/general'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ScrollToTop } from './utils'
import { LoadingContext, ModalContext } from './context'
>>>>>>> 335b579e6016fa4a10af550c9c99e85a35b482a0

export default function App() {
  return (
    <Router basename='/'>
      <ScrollToTop />
      <Switch>
        <Route path='/admin' component={AdminRoutes} />
        <Route path='/' component={Shop} />
      </Switch>
    </Router>
  )
}

function AdminRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <AdminPageWidth>
        <Route path={`${path}/orders`} component={AdminOrders} />
        <Route path={`${path}/products`} component={AdminProducts} />
        <Route path={`${path}/members`} component={AdminMembers} />
      </AdminPageWidth>
    </Switch>
  )
}
function Shop() {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
<<<<<<< HEAD
  const [cartItems, setCartItems] = useState(JSON.parse(getProductItems()))
  const totalPrice = useMemo(() => {
    let sum = 0
    for (const cartItem of cartItems) {
      sum += cartItem.price
    }
    return sum
  }, [cartItems])
  const totalItems = useMemo(() => cartItems.length, [cartItems])

  const handleRemoveCartItem = (id) => {
    setProductItems(cartItems.filter((item) => item.id !== id))
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  useEffect(() => {
    setCartItems(JSON.parse(getProductItems()))
  }, [])
=======
>>>>>>> 335b579e6016fa4a10af550c9c99e85a35b482a0

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
<<<<<<< HEAD
        <LocalStorageContext.Provider
          value={{
            cartItems,
            totalPrice,
            totalItems,
            setCartItems,
            handleRemoveCartItem
          }}
        >
          <Navbar />
          <PageHeight>
            <Switch>
              <Route path='/articles/:slug' component={Articles} />
              <Route path='/checkout' component={CheckoutRoutes} />
              <Route path='/categories/:slug/:page' component={Categories} />
              <Route path='/login' component={Login} />
              <Route path='/member/' component={MemberRoutes} />
              <Route path='/products/:id' component={Products} />
              <Route path='/info' component={InfoRoutes} />
              <Route exact path='/' component={Home} />
              <Route path='*' component={NotFound} />
            </Switch>
          </PageHeight>
          <Footer />
        </LocalStorageContext.Provider>
=======
        <Router basename='/'>
          <ScrollToTop />
          <Navbar />
          <PageHeight>
            <Switch>
              <Route path='/articles/:slug'>
                <Articles />
              </Route>
              <Route path='/checkout/step1'>
                <Step1 />
              </Route>
              <Route path='/checkout/step2'>
                <Step2 />
              </Route>
              <Route path='/checkout/step3'>
                <Step3 />
              </Route>
              <Route path='/categories/:slug/:page'>
                <Categories />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/member/me'>
                {/* 會員首頁 */}
                <Me />
              </Route>
              <Route path='/member/modify-info'>
                {/* 修改資料頁面 */}
                <ModifyInfo />
              </Route>
              <Route path='/member/orders/order-detail'>
                {/* 訂單詳細資料頁面 */}
                <OrderDetail />
              </Route>
              <Route path='/member/orders'>
                {/* 訂單頁面 */}
                <Orders />
              </Route>
              <Route path='/products/:id'>
                <Products />
              </Route>
              <Route path='/info/brand'>
                <Brand />
              </Route>
              <Route path='/info/faq'>
                <FAQ />
              </Route>
              <Route path='/info/join'>
                <Join />
              </Route>
              <Route path='/info/notice'>
                <Notice />
              </Route>
              <Route path='/info/privacy'>
                <Privacy />
              </Route>
              <Route exact path='/'>
                <Home />
              </Route>
            </Switch>
          </PageHeight>
          <Footer />
        </Router>
>>>>>>> 335b579e6016fa4a10af550c9c99e85a35b482a0
      </ModalContext.Provider>
    </LoadingContext.Provider>
  )
}
function CheckoutRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/step1`} component={Step1} />
      <Route path={`${path}/step2`} component={Step2} />
      <Route path={`${path}/step3`} component={Step3} />
    </Switch>
  )
}
function MemberRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/me`} component={Me} />
      <Route path={`${path}/modify-info`} component={ModifyInfo} />
      <Route path={`${path}/orders/order-detail`} component={OrderDetail} />
      <Route path={`${path}/orders`} component={Orders} />
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
