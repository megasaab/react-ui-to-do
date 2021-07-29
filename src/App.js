import LoginForm from "./components/LoginForm";
import { useEffect, useContext } from 'react';
import { Context } from ".";
import { observer } from "mobx-react-lite";

function App() {
  const {store} = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  },[]);

  return (
    <div>
      <h1>{store.isAuth ? "Auth" + store.user.email : 'You need to auth'}</h1> 
      <LoginForm />
    </div>
  );
}

export default observer(App);
