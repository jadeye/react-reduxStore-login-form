import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "react-toastify/dist/ReactToastify.css";
import classes from "./App.css";
import { store } from "./app/store";
import Login from "./features/user/Login";
import User from "./features/user/User";

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }
  }, [isLoggedIn]);

  return (
    <Provider store={store}>
      <div className={classes.main}>
        <ToastContainer
          autoClose={2000}
          position="top-center"
          hideProgressBar="false"
          closeOnClick="true"
          pauseOnHover="true"
          draggable="true"
          progress="undefined"
        />
        <Tabs
          className={classes.tabs}
          defaultFocus="true"
          disabledTabClassName="true"
          defaultIndex={tabIndex}
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList>
            <Tab
              disabled={isLoggedIn}
              style={{ cursor: !{ isLoggedIn } ? "default" : "pointer" }}
            >
              Login
            </Tab>
            <Tab
              disabled={!isLoggedIn}
              style={{ cursor: !{ isLoggedIn } ? "pointer" : "default" }}
            >
              User
            </Tab>
          </TabList>

          <TabPanel>
            <Login />
          </TabPanel>

          <TabPanel>
            <User />
          </TabPanel>
        </Tabs>
      </div>
    </Provider>
  );
}

export default App;
