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
import { auth, db } from "./component/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect } from 'react';
import { DataContext } from './context/DataContext.js';
import Cookies from "js-cookie";
import FitnessDetail from './component/pages/fitnessDetails.js';

function App() {
  const {setData} = useContext(DataContext)
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            Cookies.set('myKey', user.uid)
            setData(true)
        } else {
            console.log("User is not logged in");
        }
    });
};
useEffect(() => {
    if(Cookies.get('myKey')){
      setData(true)
    }
    fetchUserData();
}, []);
  return (
    <Router>
      <div style={{height:'100%'}}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/pool/:id" element={<PoolDetail />} />
          <Route path="/fitnesses/:id" element={<FitnessDetail />} />
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
