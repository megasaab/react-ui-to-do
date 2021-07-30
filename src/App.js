import LoginForm from "./components/LoginForm";
import MainMenu from "./components/MainMenu";
import { useEffect, useContext } from 'react';
import { Context } from ".";
import { observer } from "mobx-react-lite";
import LoadingBar from "./components/assets/LoadingBar";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return (
      <LoadingBar />
    )
  }


  if (!store.isAuth) {
    return (
      <LoginForm />
    )
  }

  return (
    <div>
      <MainMenu />
    </div>
  );
}

export default observer(App);
