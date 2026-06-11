import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import API from '../services/api';

export default function AddTrip(){const n=useNavigate();
    const[f,s]=useState({destination:'',startDate:'',endDate:'',notes:'',preferences:''});
const submit=async(e)=>{e.preventDefault();
    await API.post('/trips',{...f,preferences:f.preferences.split(',').map(v=>v.trim())});n('/trips');};
return <form onSubmit={submit}>
    <h2>Add Trip</h2>
    <input placeholder='Destination' onChange={e=>s({...f,destination:e.target.value})}/><br/>
    <input type='date' onChange={e=>s({...f,startDate:e.target.value})}/><br/>
    <input type='date' onChange={e=>s({...f,endDate:e.target.value})}/><br/>
    <textarea placeholder='Notes' onChange={e=>s({...f,notes:e.target.value})}/><br/>
    <input placeholder='Food,Beach' onChange={e=>s({...f,preferences:e.target.value})}/><br/>
    <button>Save</button></form>}