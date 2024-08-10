import  { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate()
  const [textt, setText] = useState('');

  const handleSubmit =(e) =>{
    e.preventDefault()
    
    console.log(e);
    const text = e.target[0].value
    navigate(`/detail?q=${text}`)

    setText("")

  }
  return (
    <form onSubmit={handleSubmit} className="flex items-center border rounded ">
      <input
        type="text"
        value={textt}
        placeholder="Ülke Arayın..."
        className=" bg-transparent p-1 px-2 md:px-5 outline-none"
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="bg-green-500 p-[6px] text-xl w-full h-full rounded transition hover:bg-green-600">
        <CiSearch />
      </button>
    </form>
  );
};

export default Form;