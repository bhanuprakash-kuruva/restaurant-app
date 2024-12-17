
import './App.css'
import Layout from './components/Layout/Layout'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Menu from './pages/Menu'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Additem from './pages/Additem'
import TermsAndConditions from './pages/TermsAndConditions'
import PageNotFound from './pages/PageNotFound'
import Chefs from './pages/Chefs'
import Booking from './pages/Booking'
import CateringPage from './pages/Catering'
import DeliverBoyOrders from './pages/Upadtedelivery'
import AdminPage from './pages/Admin'
import AddChefs from './pages/Addchef'
import SalesAndItemsAnalysis from './pages/Analytics'
import AddDeliveryBoyForm from './pages/Adddeliveryboy'
import DeliveryBoys from './pages/DeliveryBoys'
import OrderPage from './pages/Orders'
import ReviewPage from './pages/Feedback'
import EventAnalysis from './pages/CateringOrganisation'
import Needaccess from './pages/Needaccess'
function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/menu' element={<Menu/>}/>
          <Route path='*' element={<PageNotFound/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/chefs' element={<Chefs/>}/>
          <Route path='/additem' element={<Additem/>}/>
          <Route path='/booking' element={<Booking/>}/>
          <Route path='/catering' element={<CateringPage/>}/>
          <Route path ='/deliveryboy' element={<DeliverBoyOrders/>}/>
          <Route path ='/admin' element={<AdminPage/>}/>
          <Route path='/addchef' element={<AddChefs/>}/>
          <Route path='/adddeliveryboy' element={<AddDeliveryBoyForm/>}/>
          <Route path='/deliveryboys' element={<DeliveryBoys/>}/>
          <Route path='/orders' element={<OrderPage/>}/>
          <Route path='/analytics' element={<SalesAndItemsAnalysis/>}/>
          <Route path='/review' element={<ReviewPage/>}/>
          <Route path='/events' element={<EventAnalysis/>}/>
          <Route path='/needaccess' element={<Needaccess/>}/>
          <Route path='/tandc' element={<TermsAndConditions/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
