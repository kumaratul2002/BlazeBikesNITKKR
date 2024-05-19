import logo from './logo.svg';
import './App.css';
import {Route , BrowserRouter , Redirect} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingCycle from './pages/BookingCycle'
import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import AddCycle from './pages/AddCycle';
import AdminHome from './pages/AdminHome';
import EditCycle from './pages/EditCycle';

function App() {
  return (
    <div className="App">
   
         <BrowserRouter>
             
             <ProtectedRoute path='/' exact component={Home} />
             <Route path='/login' exact component={Login} />
             <Route path='/register' exact component={Register} />
             {/* <Route path='/main' exact component={Main} /> */}
             <ProtectedRoute path='/booking/:cycleid' exact component={BookingCycle} />
             <ProtectedRoute path='/userbookings' exact component={UserBookings} />
             <ProtectedRoute path='/addcycle' exact component={AddCycle} />
             <ProtectedRoute path='/editcycle/:cycleid' exact component={EditCycle} />
             <ProtectedRoute path='/admin' exact component={AdminHome} />
         
         </BrowserRouter>

    </div>
  );
}


export default App;


export function ProtectedRoute(props)
{

    if(localStorage.getItem('user'))
    {
      return <Route {...props}/>
    }
    else{
      return <Redirect to='/login'/>
    }

}
