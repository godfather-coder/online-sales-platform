import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pools from './component/pages/Polls';
import Sports from './component/pages/Sports';
import Fitness from './component/pages/Fitness';
import Navbar from "./component/navbar/Navbar.jsx"
import Home from "./component/pages/Home.jsx"
import Login from "./component/pages/Login.jsx"
import SignUp from "./component/pages/SignUp.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './component/pages/Profile.jsx';
import Footer from './component/pages/footer.jsx';
import UploadPool from './component/pages/upload/UploadPools.jsx'
import PoolDetail from './component/pages/PoolDetail.jsx';
import ContactForm from './component/pages/ContactForm.jsx';
import UploadSportComponent from './component/pages/upload/SportComponent.jsx';
import FitnessForm from './component/pages/upload/FitnessForm.jsx';
import Cart from './Cart/Cart.jsx';

function App() {

  return (
    <Router>
      <div style={{height:'100%'}}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/pool/:id" element={<PoolDetail />} />
          <Route path='/pools' element={<Pools />} />
          <Route path='/sports' element={<Sports />} />
          <Route path='/fitness' element={<Fitness />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/me' element={<UserProfile />} />
          <Route path ='/uploadPool' element={<UploadPool/>}/>
          <Route path ='/uploadSport' element={<UploadSportComponent/>}/>
          <Route path = '/uploadFitness' element={<FitnessForm/> }/>
          <Route path ='/contact' element = {<ContactForm/>}/>
          <Route path = '/cart' element = {<Cart/>}/>
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
