import {useEffect, useState} from 'react'
import './App.css'
import PasswordInput from "./PasswordInput.tsx";
import PasswordStrength from "./PasswordStrength.tsx";
import CharacterSequenceValidator from "./CharacterSequenceValidator.tsx";
import PasswordTimeValidator from "./PasswordTimeValidator.tsx";
import CurrentTemperature from "./CurrentTemperature.tsx";
import CountryFlagValidator from "./CountryFlagValidator.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'






function App() {
    const [password, setPassword] = useState<string | null>(null);
    const [passwordTime, setPasswordTime] = useState<number>(Date.now());



    useEffect(() => {
        if (password !== null) {
            setPasswordTime(Date.now());
        }
    }, [password]);



    return (
        <>
            <title>HRA S HESLY</title>
            <h1 className="display-4">Vite + React</h1>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1 className="display-1">HRA S HESLY</h1>
            <PasswordInput passwordValue={password} setter={setPassword}/>
            <PasswordStrength password={password}/>
            <CharacterSequenceValidator password={password}/>
            <PasswordTimeValidator password={password} time={passwordTime}/>

            <CountryFlagValidator password={password}/>
            <CurrentTemperature/>

        </>
    )
}

export default App;