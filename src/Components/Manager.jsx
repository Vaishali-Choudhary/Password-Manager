import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username:"", password:"" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password"
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text"
    }
  };

  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
      setPasswordArray([...passwordArray, {...form,id: uuidv4()}]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]));
      setForm({ site: "", username:"", password:"" })
      toast('Password Saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      }

  };

  const deletePassword = (id)=>{
    let con = confirm("Do you really want to delete this password")
    if(con){
      setPasswordArray(passwordArray.filter(item=>item.id!==id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      toast('Password Deleted Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  const editPassword = (id)=>{
    setForm(passwordArray.filter(item=>item.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text)=>{
    toast('Copied to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text);
  }
  return (
    <>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition= "Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 md:mycontainer min-h-[86vh]">
        <h1 className="font-bold text-4xl text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/ &gt;</span>
        </h1>
        <p className=" text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="text-black gap-8 flex flex-col p-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            placeholder="Enter website url"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              placeholder="Enter Usernaeme"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                type="password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                placeholder="Enter Password"
                name="password"
                id="passwrod"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            className="flex justify-center items-center bg-green-400 rounded-full px-4 py-2 gap-4 w-fit hover:bg-green-300 border border-green-900 "
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length===0 && <div>No passwords to show</div>}
          {passwordArray.length!=0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
               {passwordArray.map((item,index)=>{
                return <tr key={index}>
                    <td className="py-2 border border-white text-center min-w-32"><div className="flex items-center justify-center gap-2"><a href={item.site} target="_blank">{item.site}</a><img className="lordiconcopy cursor cursor-pointer pl-1" src="icons/copy.png" alt="" onClick={()=>{copyText(item.site)}} /></div></td>
                    <td className="py-2 border border-white text-center min-w-32"><div className="flex items-center justify-center gap-2"><span>{item.username}</span><img className="lordiconcopy cursor cursor-pointer pl-1" src="icons/copy.png" alt="" onClick={()=>{copyText(item.username)}} /></div></td>
                    <td className="py-2 border border-white text-center min-w-32"><div className="flex items-center justify-center gap-2"><span>{item.password}</span><img className="lordiconcopy cursor cursor-pointer pl-1" src="icons/copy.png" alt="" onClick={()=>{copyText(item.password)}} /></div></td>
                    <td className="py-2 border border-white text-center min-w-32"><div className="flex items-center justify-center gap-2 "><span className="cursor-pointer" onClick={()=>{editPassword(item.id)}}><img src="icons/edit.png" alt=""/></span><span className="cursor-pointer" onClick={()=>{deletePassword(item.id)}}><img src="icons/delete.png" width={24} alt=""/></span></div></td>
                </tr>
               })} 
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
};

export default Manager;
