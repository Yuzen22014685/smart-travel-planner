import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TripList from './pages/TripList';
import AddTrip from './pages/AddTrip';
import EditTrip from './pages/EditTrip';
import TripDetail from './pages/TripDetail';
export default function App(){return(<Routes>
<Route path='/' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/trips' element={<TripList/>}/>
<Route path='/add-trip' element={<AddTrip/>}/>
<Route path='/edit/:id' element={<EditTrip/>}/>
<Route path='/trip/:id' element={<TripDetail/>}/>
</Routes>)}