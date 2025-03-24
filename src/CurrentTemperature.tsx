import React, { useState, useEffect } from "react";

const CurrentTemperature: React.FC = () => {
    const [temperature, setTemperature] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTemperature = async () => {
            try {
                const response = await fetch('https://wttr.in/Prague?format=%t');
                if (!response.ok) {
                    throw new Error(`HTTP chyba: ${response.status}`);
                }
                const data = await response.text();
                setTemperature(data);
            } catch (err) {
                setError('Chyba při získávání teploty. Zkuste to znovu.');
                console.error(err);
            }
        };

        fetchTemperature();
    }, []);

    return (
        <div>
            {error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <p>Aktuální teplota v Praze: {temperature}</p>
            )}
        </div>
    );
};

export default CurrentTemperature;
