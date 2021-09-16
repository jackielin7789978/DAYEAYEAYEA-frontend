import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  About,
  Articles,
  Step1,
  Step2,
  Step3,
  Categories,
  FAQ,
  Home,
  Login,
  Me,
  MemberInfo,
  OrderDetail,
  Orders,
  Products,
} from "./pages/index";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router basename="/">
      <Navbar />
      <Switch>
        <Route exact path="">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
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
        <Route path="/FAQ">
          <FAQ />
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
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}
