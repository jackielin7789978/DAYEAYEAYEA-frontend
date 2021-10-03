import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer";
import {
  Articles,
  Step1,
  Step2,
  Step3,
  Categories,
  Home,
  Login,
  Me,
  MemberInfo,
  OrderDetail,
  Orders,
  Products,
} from "./pages/index";
import { Brand, FAQ, Join, Notice, Privacy } from "./pages/InfoPages/index";
import { PageHeight } from "./components/common";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ScrollToTop } from "./utils";

export default function App() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <Navbar />
      <PageHeight>
        <Switch>
          <Route path="/articles/:slug">
            <Articles />
          </Route>
          <Route path="/cart/step1">
            <Step1 />
          </Route>
          <Route path="/cart/step2">
            <Step2 />
          </Route>
          <Route path="/cart/step3">
            <Step3 />
          </Route>
          <Route path="/categories/:slug">
            <Categories />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/member-info">
            <MemberInfo />
          </Route>
          <Route path="/me">
            <Me />
          </Route>
          <Route path="/orders/order-detail">
            <OrderDetail />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/products/:slug">
            <Products />
          </Route>
          <Route path="/info/brand">
            <Brand />
          </Route>
          <Route path="/info/FAQ">
            <FAQ />
          </Route>
          <Route path="/info/join">
            <Join />
          </Route>
          <Route path="/info/notice">
            <Notice />
          </Route>
          <Route path="/info/privacy">
            <Privacy />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </PageHeight>
      <Footer />
    </Router>
  );
}
