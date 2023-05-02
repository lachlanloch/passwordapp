import React from "react";
import './App.css';
import {HiClipboardDocument} from "react-icons/hi2";
import {useState} from 'react';
import {AiOutlineArrowRight} from "react-icons/ai"
import { generate} from '@wcj/generate-password';


function App() {
  const [password, setPassword] = useState(generate())
  const [strength, setStrength] = useState("Medium");
  const MAX = 20;
  const [hasUppercase, setUppercase] = useState(false);
  const [hasLowercase, setLowercase] = useState(false);
  const [hasNumbers, setNumbers] = useState(false);
  const [hasSymbols, setSymbols] = useState(false);
  const [passwordSize, setPasswordSize] = useState(10);





  function getStrength(){
    console.log("running the func")
    console.log(passwordSize)
    if(passwordSize  > 13 && passwordSize < 21){
      setStrength("Strong");
    }
    if(passwordSize < 8 ){
      setStrength("Very weak");
    }
    if(passwordSize < 11 && passwordSize > 7){
      setStrength("Weak");
    }
    if(passwordSize < 14 && passwordSize > 10){
      setStrength("Good");
    }
    console.log(strength)
  }

  const copyToClipboard = () =>{
    navigator.clipboard.writeText(password);
    alert("Succesfully copied to the clipboard")
  }
  
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(passwordSize * 100) / MAX}% 100%`,
      width: "100%",
      accentColor: "#a4ffaf",
    };
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(hasSymbols === false && hasNumbers === false && hasLowercase === false && hasUppercase === false){
      return;
    }
    
    if(hasSymbols === true && hasNumbers === true && hasLowercase === false && hasUppercase === false){
      setPassword(generate({upperCase: false, lowerCase: false, length: passwordSize}));
    }
    if(hasSymbols===true && hasNumbers === true && hasLowercase === true && hasUppercase === true){
      setPassword(generate({length: passwordSize}))
    }
    if(hasSymbols === true && hasNumbers === true && hasLowercase === false && hasUppercase === true){
      setPassword(generate({length: passwordSize, lowerCase: false,}));
    }
    if(hasSymbols === true && hasNumbers === true && hasUppercase === false && hasLowercase === true){
      setPassword(generate({length: passwordSize, upperCase: false}));
    }
    if(hasSymbols === true && hasNumbers === false && hasUppercase === false && hasLowercase === false){
      setPassword(generate({length: passwordSize, numeric: false, lowerCase: false, upperCase: false}));
    }
    if(hasSymbols === true && hasNumbers === false && hasUppercase === true && hasLowercase === false){
      setPassword(generate({length: passwordSize, numeric: false,lowerCase: false}));
    }
    if(hasSymbols === true && hasNumbers === false && hasUppercase === false && hasLowercase === true){
      setPassword(generate({length: passwordSize, numeric: false,upperCase: false}));
    }
    if(hasSymbols === true && hasNumbers === false && hasUppercase === true && hasLowercase === true){
      setPassword(generate({length: passwordSize, numeric: false}));
    }
    if(hasSymbols === false && hasNumbers === false && hasUppercase === true && hasLowercase === true){
      setPassword(generate({length: passwordSize, special: false, numeric: false}));
    }
    if(hasSymbols === false && hasNumbers === false && hasUppercase === true && hasLowercase === false){
      setPassword(generate({length: passwordSize, special: false, numeric: false, lowerCase: false}));
    }
    if(hasSymbols === false && hasNumbers === false && hasUppercase === false && hasLowercase === true){
      setPassword(generate({length: passwordSize, special: false, numeric: false, upperCase: false}));
    }
    if(hasSymbols === false && hasNumbers === true && hasUppercase === false && hasLowercase === false){
      setPassword(generate({length: passwordSize, special: false, lowerCase: false, upperCase: false}));
    }
    if(hasSymbols === false && hasNumbers === true && hasUppercase === true && hasLowercase === true){
      setPassword(generate({length: passwordSize, special: false}));
    }
    setStrength(getStrength);
  };

  return (
    <div className="App">

        <p id="title">Password Generator</p>
       <div id="topBox">
          <p>{password}<HiClipboardDocument id="clipboardIcon" onClick={copyToClipboard}/></p> 
        </div>

      <div id="bottomBox">
          <div id="lengthSlider">
            <p>Character Length</p>
            <p id="numberofChars">{passwordSize}</p>
          </div>

      <div id="sliderDiv">
          <input
              type="range"
              min="0"
              max={MAX}
              onChange={(e) => setPasswordSize(e.target.value)}
              style={getBackgroundSize()}
              value={passwordSize}
          />
      </div>

        <form id="checkboxForm" name="passwordForm" onSubmit={handleSubmit}>
          <input type="checkbox" id="checkbox1" name="checkbox1" onChange={e => {
                       setUppercase(e.target.checked)
                   }}></input>
          <label for="checkbox1">Include Uppercase Letters</label><br/>
          
          <input type="checkbox" id="checkbox2" name="checkbox2" onChange={e => {
                       setLowercase(e.target.checked)
                   }}></input>
          <label for="checkbox2">Include Lowercase Letters</label><br/>

          <input type="checkbox" id="checkbox3" name="checkbox3" onChange={e => {
                       setNumbers(e.target.checked)
                   }}></input>
          <label for="checkbox3">Include Numbers</label><br/>

          <input type="checkbox" id="checkbox4" name="checkbox4" onChange={e => {
                       setSymbols(e.target.checked)
                   }}></input>
          <label for="checkbox4">Include Symbols</label><br/>

          <div id="insideBox">
          <p>STRENGTH</p> 
          <p id="strengthboxes">{strength}</p>
          </div>
      
        <button type="submit" id="generateButton">GENERATE<AiOutlineArrowRight id="arrowIcon"/></button>

        </form>
        </div>
    </div>
  );
}
export default App;
