import Header from './layouts/Header';
import Content from './layouts/Content';
import Footer from './layouts/Footer';
import Checkout from './checkout/Checkout';
import Congratulation from './checkout/Congratulations';
import { items } from './products.json';
import { useDispatch } from 'react-redux';
import { setAllItems } from './products/product';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";


function App() {

  const dispatch = useDispatch()

  dispatch(setAllItems(items));

  return (
    <main className="main py-5">
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Content />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/congratulations' element={<Congratulation />} />
        </Routes>
      </Router>
      <Footer />
    </main>
  )
}

export default App;