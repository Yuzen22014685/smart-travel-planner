import {useEffect,useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import API from '../services/api';

export default function EditTrip(){const{id}=useParams();
const n=useNavigate();const[f,s]=useState({});
useEffect(()=>{API.get('/trips/'+id).then(r=>s(r.data.trip));},[id]);
const submit=async(e)=>{e.preventDefault();await API.put('/trips/'+id,f);n('/trips');};
return <form onSubmit={submit}>
    <h2>Edit Trip</h2><input value={f.destination||''} onChange={e=>s({...f,destination:e.target.value})}/>
    <button>Update</button></form>}