import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AccountOverview from "./components/Account/AccountOverview";
import AccountPositions from "./components/Account/AccountPositions";
import AccountOrders from "./components/Account/AccountOrders";
import AccountFees from "./components/Account/AccountFees";
import AccountHistory from "./components/Account/AccountHistory";
import MarketGraph from "./components/MarketData/MarketGraph";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainPage from "./components/MainPage/MainPage";

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
          <Route path="/fees">
            <AccountFees />
          </Route>
          <Route path="/history">
            <AccountHistory />
          </Route>
          <Route path="/market/:symbol" render={(props) => <MarketGraph symbol={props.match.params.symbol} />} />
        </Switch>
      )}
    </>
  );
}

export default App;
