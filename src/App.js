import React, { lazy, useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GlobalStyle } from "./global.styles";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import Header from "./components/header/header.component";
import Contact from "./pages/contact(error)/contact(error).component";
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
        <Suspense fallback={<Spinner/>}>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
          <Route exact path='/contact' component={Contact}/>
        </Suspense>
        </ErrorBoundary>        
      </Switch>
    </div>
  );
};

export default App;
