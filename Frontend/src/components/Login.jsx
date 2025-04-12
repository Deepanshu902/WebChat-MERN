import React, { useState } from 'react';
import axios from 'axios'; 

function Login() {
    const API_URL = import.meta.env.VITE_API_URL
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('${API_URL}/api/v1/users/login', {
                email,
                password
            }, {
                withCredentials: true // Important for cookies
            });
            
           
            console.log("Login successful:", response.data);
          
            
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder='Enter Your Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder='Enter Your Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}

export default Login;