import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import API from '../services/api';

export default function TripDetail(){const{id}=useParams();
const[t,setT]=useState(null);
useEffect(()=>{API.get('/trips/'+id).then(r=>setT(r.data.trip));},[id]);
if(!t)return <p>Loading...</p>;
return <div><h2>{t.destination}</h2>
<p>{t.notes}</p>
<p>{t.startDate}</p>
<p>{t.endDate}</p>
<p>{(t.preferences||[]).join(', ')}</p></div>}