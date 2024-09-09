"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

 
  const callbackUrl = "/choose"
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <div>
    <form onSubmit={onSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-2xl font-bold">Login</h1>
      </div>
      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
          className={`${input_style}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className={`${input_style}`}
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#ccc" : "rgb(34 197 94)"}` }}
        className="inline-block px-7 py-4 bg-green-600 text-white  text-sm leading-snug uppercase rounded-md font-bold shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "loading..." : "Sign In"}
      </button>

      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>

      
    </form>
      <div className="flex justify-center gap-4 mt-4">
          <button  onClick={() => signIn("google", { callbackUrl })}  className="bg-slate-200 flex justify-center items-center font-medium gap-1 px-4 py-2 rounded-md shadow-md hover:bg-slate-300 border-gray-400 border-solid border-[1px]">
            <span>Google</span>
              <Image src='/images/google.svg' alt="" height={32} width={32}/>
          </button>
          <button onClick={() => signIn("github", { callbackUrl })} className="bg-slate-200 flex justify-center items-center font-medium gap-1 px-4 py-2 rounded-md shadow-md hover:bg-slate-300 border-gray-400 border-solid border-[1px]">
            <span>Github</span>
              <Image src='/images/github.svg' alt="" height={32} width={32}/>
          </button>
          
        </div>

        <div className="flex justify-center items-center mt-4">
        <span className=" self-center">I don't have an account <Link href='/register' className="font-bold hover:underline text-darker-blue">Register</Link></span>
        </div>
    </div>
  );
};
