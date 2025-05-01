import React from "react";

function AdminLogin() {
  return (
    <div>
      <div className="min-h-screen flex">
        {/* left part div */}
        <div
          className="w-1/2 hidden md:block"
          style={{
            backgroundImage: `url('/folklife.jpg')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        {/* Right part */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="flex items-center justify-center p-8 shadow-xl w-full max-w-lg">
            <form action="" className="flex flex-col space-y-2 w-full">
                <h1 className="text-4xl font-Quintessential text-purple-800 text-center font-bold">Hare Krishna</h1>
                <p  className="text-md font-Quintessential text-red-800 text-center">Admin Login 🛡️</p>
                <p className="text-md font-Quintessential text-purple-800 text-center">Please enter your details</p>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="enter your email address" className="focus:outline-none focus:outline-purple-800 rounded-xl p-2"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" className="focus:outline-none focus:outline-purple-800 rounded-xl p-2"/>
                <button className="w-full font-Quintessential text-center bg-purple-800 text-white text-lg p-2 rounded-sm font-bold">Login</button>
            </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
