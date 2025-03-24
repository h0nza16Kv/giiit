import React, { useEffect, useState } from "react";

interface PasswordStrengthProps {
    password: string | null;
}

const validatePassword = {
    length: (password: string): string | null =>
        password.length < 8 ? "Heslo je příliš krátké" : null,
    uppercase: (password: string): string | null =>
        !/[A-Z]/.test(password) ? "Heslo neobsahuje velké písmeno" : null,
    number: (password: string): string | null =>
        !/[0-9]/.test(password) ? "Heslo neobsahuje číslo" : null,
    specialChar: (password: string): string | null =>
        !/[!@#$%^&*]/.test(password) ? "Heslo neobsahuje speciální znak" : null,
    emoji: (password: string): string | null =>
            !/[😀-🙏]/u.test(password) ? "Heslo neobsahuje emoji" : null,
};

const evaluatePassword = (password: string | null): { strength: string; errors: string[] } => {
    if (!password) {
        return { strength: "Slabé", errors: ["Napiš něco"] };
    }

    const errors = Object.values(validatePassword)
        .map((validator) => validator(password))
        .filter((error) => error !== null) as string[];

    const strength =
        errors.length > 3 ? "Slabé" : errors.length > 0 ? "Střední" : "Masivní jako.....";

    return { strength, errors };
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [passwordStrength, setPasswordStrength] = useState<string>("");

    useEffect(() => {
        const { strength, errors } = evaluatePassword(password);
        setErrors(errors);
        setPasswordStrength(strength);
    }, [password]);

    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);

    return (
        <div className="alert alert-warning mt-2">
            {errors.length === 0 ? (
                <p className="text-success">Heslo je silné</p>
            ) : (
                errors.map((error, index) => (
                    <p className="text-danger" key={index}>
                        {error}
                    </p>
                ))
            )}
            <p>Síla hesla: {passwordStrength}</p>
        </div>
    );
};

export default PasswordStrength;
