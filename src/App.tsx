import {useEffect, useState} from 'react'
import './App.css'
import PasswordInput from "./PasswordInput.tsx";
import PasswordStrength from "./PasswordStrength.tsx";
import CharacterSequenceValidator from "./CharacterSequenceValidator.tsx";
import PasswordTimeValidator from "./PasswordTimeValidator.tsx";
import CurrentTemperature from "./CurrentTemperature.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';




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
            <h1>Password validator</h1>
            <PasswordInput passwordValue={password} setter={setPassword} />
            <PasswordStrength password={password}/>
            <CharacterSequenceValidator password={password}/>
            <PasswordTimeValidator password={password} time={passwordTime}/>
            <CurrentTemperature/>
        </>
    )
}

export default App