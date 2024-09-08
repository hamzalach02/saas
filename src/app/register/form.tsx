"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl ="/choose";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ name: "", email: "", password: "" });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
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
    <form onSubmit={onSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-2xl font-bold">Register</h1>
      </div>
      <div className="mb-6">
        <input
          required
          type="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Name"
          className={`${input_style}`}
        />
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
        className="inline-block px-7 py-4 bg-blue-600 text-white font-bold text-sm leading-snug uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "loading..." : "Sign Up"}
      </button>
      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>

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
      <span className=" self-center">I already have an account <Link href='/login' className="font-bold hover:underline text-darker-blue">Login</Link></span>
      </div>
    </form>
  );
};
