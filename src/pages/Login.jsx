import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import API from '../services/api';

export default function Login(){const n=useNavigate();
    const[f,s]=useState({email:'',password:''});
const submit=async(e)=>{e.preventDefault();
    try{const r=await API.post('/auth/login',f);
        localStorage.setItem('token',r.data.token);
        n('/trips');}catch(err){alert(err.response?.data?.message||'Login failed');}};
return <div><h2>Login</h2><form onSubmit={submit}>
    <input placeholder='Email' onChange={e=>s({...f,email:e.target.value})}/><br/>
    <input type='password' placeholder='Password' onChange={e=>s({...f,password:e.target.value})}/><br/>
    <button>Login</button></form>
    <Link to='/register'>Register</Link></div>}