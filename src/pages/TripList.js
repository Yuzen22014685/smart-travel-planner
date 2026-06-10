import {useEffect,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import API from '../services/api';

export default function TripList(){const[t,setT]=useState([]);
    const n=useNavigate();
const load=async()=>{const r=await API.get('/trips');
    setT(r.data.trips||[])};useEffect(()=>{load()},[]);
const del=async(id)=>{await API.delete('/trips/'+id);load();};
return <div><h2>My Trips</h2>
<button onClick={()=>{localStorage.removeItem('token');n('/')}}>Logout</button><br/>
<Link to='/add-trip'>Add Trip</Link>{t.map(x=><div key={x._id}>
    <h3>{x.destination}</h3>
    <p>{x.notes}</p>
    <Link to={'/trip/'+x._id}>View</Link>
     | <Link to={'/edit/'+x._id}>Edit</Link>
      | <button onClick={()=>del(x._id)}>Delete</button></div>)}</div>}