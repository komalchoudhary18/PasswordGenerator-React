import { useState,useCallback ,useEffect,useRef} from "react"

function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")
  //  use useref hook
  const passwordRef=useRef(null)



  // store at cache memory
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*(){}~"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
          setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

   const CopyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
   },[password])

// for pass function 
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  
  return (
    <>
     
     <div className="w-full max-w-md m-auto shadow-md rounded-lg my-8 text-emerald-900 font-medium bg-red-300 ">
     <h1 className="text-white text-4xl text-center font-bold py-5 font-serif">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 m-3">
        <input
        type="text"
        value={password} className="outline-none w-full py-1 px-3"
        placeholder="password"
        readOnly
        ref={passwordRef}
        />
        <button onClick={CopyPasswordToClipboard} className="outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0">copy</button>
      </div>
      <div className="flex text-md gap-x-2 ">
        <div className="flex items-center gap-x-1 mx-3 ">
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>
            {setLength(e.target.value)}}
          />
          <label>length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox" defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}
          />
          
          <label htmlFor="numberInput">Numbers</label>
       
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox" defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=>{
            setCharAllowed((prev)=>!prev);
          }}
          />
          
          <label htmlFor="characterInput">characters</label>
       
        </div>
      </div>
     </div>
    </>
   
  )
}

export default App