import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <div>
        <img
          className="rounded-xl"
          style={{ height: "380px" }}
          src="https://sumihai.co.id/wp-content/uploads/2018/06/pos-2C.jpg"
          alt=""
        />
      </div>
      <div className="prose p-2 pt-1 w-1/2">
        <h1 className="text-center">Masuk ke Website</h1>
        <h1 className="text-center text-primary">Login</h1>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Alamat Email</span>
          </label>
          <input
            type="text"
            placeholder="example@gmail.com"
            className="input input-bordered w-full"
            value={"admin@gmail.com"}
          />
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="******"
            className="input input-bordered w-full"
            value={"password"}
          />
          <Link href={"/dashboard"}>
            <button className="w-full btn btn-primary mt-5">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
