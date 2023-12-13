import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`!@$%^&*()+{}[]";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char); // it means select a random index number for each itteration
    }
    setPassword(pass);
  }, [length, charAllowed, numberAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numberAllowed, generatePassword]);

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="bg-[#2e2e2e] min-h-screen">
      <div className="md:w-[700px] border border-white mx-auto p-4 rounded-md">
        <h1 className="text-3xl font-semibold text-white text-center">
          Password Generator
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="outline-none bg-transparent border border-white rounded-md px-3
            text-white py-1 w-full font-semibold text-xl"
            value={password}
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyPassword}
            className="bg-blue-700 px-4 py-[7px] rounded-md text-white"
          >
            Copy
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="py-2 flex gap-3 items-center">
            <input
              type="range"
              name=""
              id=""
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="" className="text-white">
              Length ({length})
            </label>
          </div>
          <div className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              name=""
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              name=""
              id="charcterInput"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charcterInput">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
