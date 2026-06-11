/*import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import API from '../services/api';

export default function Register(){const n=useNavigate();
    const[f,s]=useState({name:'',email:'',password:''});
const submit=async(e)=>{e.preventDefault();
    const r=await API.post('/auth/register',f);
    localStorage.setItem('token',r.data.token);
    n('/trips');};
return <form onSubmit={submit}><h2>Register</h2>
<input placeholder='Name' onChange={e=>s({...f,name:e.target.value})}/><br/>
<input placeholder='Email' onChange={e=>s({...f,email:e.target.value})}/><br/>
<input type='password' placeholder='Password' onChange={e=>s({...f,password:e.target.value})}/><br/>
<button>Register</button></form>}*/
