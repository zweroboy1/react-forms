import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Header } from './components/Header/Header';
import { AppRouter } from './components/AppRouter/AppRouter';
import { store } from './store/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <AppRouter />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
