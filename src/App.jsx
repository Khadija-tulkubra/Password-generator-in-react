import { useCallback, useState,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numeric, setNumeric] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numeric) {
      str += "0123456789";
    }
    if (character) {
      str += "!@#$%^&*()_+[]{}|;:,.<>?";
    }


    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str[char];
    }

    setPassword(pass);

  },[length,numeric,character,setPassword]);


  const CopyPasswordToClipBoard = useCallback(() => {
    passwordRef.current.select();

    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numeric, character, passwordGenerator]);
  
  return (
    <>
    <div className='w-full max-w-md mx-auto p-4 bg-black shadow-md rounded-lg'>
      <div className='flex shadow-lg rounded-lg p-4 mb-4 bg-white'>
        <input type="text" 
        value={password}
        className='flex-1 p-2 text-black bg-transparent border-none outline-none'
        placeholder='Generated Password'
        readOnly
        ref={passwordRef}
        
      

        />
        <button  onClick={CopyPasswordToClipBoard} className='outline none bg-zinc-400'>Copy</button>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'> 
          <input 
          type="range" 
          miin={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          
          />
          <label className='text-blue-300'>Length:{length}</label>
          <div className='flex items-center gap-2'>
        <input 
        type="checkbox" 
        defaultChecked={numeric}
        onChange={() => setNumeric((prev) => !prev)}
        className='cursor-pointer'
         />
         <label className='text-blue-300'>Numbers</label>

         </div>
         <div className='flex items-center gap-2'>
        <input 
        type="checkbox" 
        defaultChecked={character}
        onChange={() => setCharacter((prev) => !prev)}
        className='cursor-pointer'
         />
         <label className='text-blue-300'>Characters</label>

         </div>
        </div>
      </div>
      
    </div>

    
    </>
  )
}

export default App
