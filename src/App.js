import { useState } from 'react'
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
import { PageHeight, AdminPageWidth } from './components/general'
import {
  HashRouter as Router,
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'
import { ScrollToTop } from './utils'
import { LoadingContext } from './context'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <Router basename='/'>
        <ScrollToTop />
        <Switch>
          <Route path='/admin'>
            <AdminRoutes />
          </Route>
          <Route path='/'>
            <Shop />
          </Route>
        </Switch>
      </Router>
    </LoadingContext.Provider>
  )
}
function AdminRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <AdminPageWidth>
        <Route path={`${path}/orders`}>
          <AdminOrders />
        </Route>
        <Route path={`${path}/products`}>
          <AdminProducts />
        </Route>
        <Route path={`${path}/members`}>
          <AdminMembers />
        </Route>
      </AdminPageWidth>
    </Switch>
  )
}

function Shop() {
  return (
    <>
      <Navbar />
      <PageHeight>
        <Switch>
          <Route path='/articles/:slug'>
            <Articles />
          </Route>
          <Route path='/checkout'>
            <CheckoutRoutes />
          </Route>
          <Route path='/categories/:slug/:page'>
            <Categories />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/member/'>
            <MemberRoutes />
          </Route>
          <Route path='/products/:id'>
            <Products />
          </Route>
          <Route path='/info'>
            <InfoRoutes />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </PageHeight>
      <Footer />
    </>
  )
}

function CheckoutRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/step1`}>
        <Step1 />
      </Route>
      <Route path={`${path}/step2`}>
        <Step2 />
      </Route>
      <Route path={`${path}/step3`}>
        <Step3 />
      </Route>
    </Switch>
  )
}

function MemberRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/me`}>
        <Me />
      </Route>
      <Route path={`${path}/modify-info`}>
        <ModifyInfo />
      </Route>
      <Route path={`${path}/orders/order-detail`}>
        <OrderDetail />
      </Route>
      <Route path={`${path}/orders`}>
        <Orders />
      </Route>
    </Switch>
  )
}
function InfoRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/brand`}>
        <Brand />
      </Route>
      <Route path={`${path}/faq`}>
        <FAQ />
      </Route>
      <Route path={`${path}/join`}>
        <Join />
      </Route>
      <Route path={`${path}/notice`}>
        <Notice />
      </Route>
      <Route path={`${path}/privacy`}>
        <Privacy />
      </Route>
    </Switch>
  )
}
