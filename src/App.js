import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute/UserRoute";
import AdmineRoute from "./routes/AdmineRoute/AdmineRoute";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";
import { Provider } from "react-redux";
import { storeReduce } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from "./Context/ThemeContext";
import Chechout from "./admine/containers/Checkout/Checkout";
import { CheckProvider } from "./Context/CheckoutContext";
import { ContactProvider } from "./Context/ContactContext";
import { SnackbarProvider} from 'notistack';
import Alerts from "./user/components/Alerts/Alerts";


function App() {
  const {store, persistor} = storeReduce();

  return (
    <SnackbarProvider>
    <ContactProvider>
    <CheckProvider>
    <ThemeProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Alerts/>
        <Routes>
          <Route exact path="/*" element={<UserRoute />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/admine/*" element={<AdmineRoute />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
    </ThemeProvider>
    </CheckProvider>
    </ContactProvider>
    </SnackbarProvider>
  );
}

export default App;
