import React, { useState, useEffect } from "react";

interface PasswordTimeValidatorProps {
    password: string | null;
    time: number;
    validationWindow?: number;
    debounceTime?: number;
}

const PasswordTimeValidator: React.FC<PasswordTimeValidatorProps> = ({
                                                                         password,
                                                                         time,
                                                                         validationWindow = 5000,
                                                                         debounceTime = 3000,
                                                                     }) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [finalPassword, setFinalPassword] = useState<string | null>(null);

    useEffect(() => {
        if (!password) {
            setFinalPassword(null);
            setIsValid(null);
            return;
        }

        const handler = setTimeout(() => {
            setFinalPassword(password);
        }, debounceTime);

        return () => clearTimeout(handler);
    }, [password, debounceTime]);

    useEffect(() => {
        if (!finalPassword) {
            setIsValid(null);
            return;
        }

        const isPasswordValid = Date.now() - time > validationWindow;
        setIsValid(isPasswordValid);
    }, [finalPassword, time, validationWindow]);

    return (
        <div>
            {isValid === true && (
                <p>Heslo bylo zadáno v pořádku</p>
            )}
            {isValid === false && (
                <p>Heslo bylo zadáno příliš rychle</p>
            )}
        </div>
    );
};

export default PasswordTimeValidator;
