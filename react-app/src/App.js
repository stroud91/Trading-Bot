
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AccountOverview from "./components/Account/AccountOverview";
import AccountPositions from "./components/Account/AccountPositions";
import AccountOrders from "./components/Account/AccountOrders";
import AccountHistory from "./components/Account/AccountHistory";
import MarketGraph from "./components/MarketData/MarketGraph";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainPage from "./components/MainPage/MainPage";
import AccountFormCreate from "./components/Account/AccountFormCreate";
import AccountFormUpdate from "./components/Account/AccountFormUpdate";
import AccountFormDelete from "./components/Account/AccountFormDelete";
import OrderFormCreate from "./components/Order/OrderFormCreate";
import OrderFormUpdate from "./components/Order/OrderFormUpdate";
import OrderFormDelete from "./components/Order/OrderFormDelete";
import TransactionFormCreate from "./components/Transaction/TransactionFormCreate";
import TransactionFormUpdate from "./components/Transaction/TransactionFormUpdate";
import TransactionFormDelete from "./components/Transaction/TransactionFormDelete";
import AboutUs from './components/MainPage/AboutUs';
import Testimonials from './components/MainPage/Testimonials';
import Cases from './components/MainPage/Cases';
import Services from './components/MainPage/Services';
import Blog from './components/MainPage/Blog';
import ContactUs from './components/MainPage/ContactUs';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/overview">
            <AccountOverview />
          </Route>
          <Route path="/positions">
            <AccountPositions />
          </Route>
          <Route path="/orders">
            <AccountOrders />
          </Route>
          <Route path="/history">
            <AccountHistory />
          </Route>
          <Route path="/about">
            <AboutUs />
          </Route>
          <Route path="/services">
            <Services />
          </Route>
          <Route path="/cases">
            <Cases />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/contact">
            <ContactUs />
          </Route>
          <Route path="/market/:symbol" render={(props) => <MarketGraph symbol={props.match.params.symbol} />} />
          <Route path="/account/create" component={AccountFormCreate} />
          <Route path="/account/update/:accountId" component={AccountFormUpdate} />
          <Route path="/account/delete/:accountId" component={AccountFormDelete} />
          <Route path="/order/create" component={OrderFormCreate} />
          <Route path="/order/update/:orderId" component={OrderFormUpdate} />
          <Route path="/order/delete/:orderId" component={OrderFormDelete} />
          <Route path="/transaction/create" component={TransactionFormCreate} />
          <Route path="/transaction/update/:transactionId" component={TransactionFormUpdate} />
          <Route path="/transaction/delete/:transactionId" component={TransactionFormDelete} />
        </Switch>
      )}
    </>
  );
}

export default App;
