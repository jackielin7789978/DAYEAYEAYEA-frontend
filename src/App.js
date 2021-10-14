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
  Products
} from './pages/index'
import { Brand, FAQ, Join, Notice, Privacy } from './pages/InfoPages/index'
import { PageHeight } from './components/general'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ScrollToTop } from './utils'
import { LoadingContext, ModalContext } from './context'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
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
      </ModalContext.Provider>
    </LoadingContext.Provider>
  )
}
