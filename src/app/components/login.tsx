import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="relative h-svh w-screen bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://images.ctfassets.net/ee85281gugj6/1jr0jrVcYmhP6hbdMUFCbk/e9ce4d6991c952c8ccebf54f5db19744/bg_Login.JPG')" }}>
            <nav className="fixed top-0 left-0 w-full bg-transparent p-4">
            <div className="container mx-auto">
                <h1 className="text-white text-2xl">Your Logo</h1>
            </div>
            </nav>
            <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-4">Login with Email</button>
                <button className="w-full bg-red-500 text-white py-2 px-4 rounded mb-4">Login with Google</button>
                <button className="w-full bg-blue-800 text-white py-2 px-4 rounded mb-4">Login with Facebook</button>
                <div className="flex justify-between mt-4">
                <a href="/register" className="text-blue-500">Register</a>
                <a href="/reset-password" className="text-blue-500">Forgot Password?</a>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;