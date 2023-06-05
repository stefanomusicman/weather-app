import React, { createContext, ReactNode, useState } from "react";

type weatherContextType = {
    isCelsius: boolean,
    isNotCelsius: () => void,
    determineTemp: (temp: any) => JSX.Element,
}

const weatherContextDefaultValues: weatherContextType = {
    isCelsius: true,
    isNotCelsius: () => {},
    determineTemp: (temp: any) => <p>...</p>,
}

export const Context = createContext<weatherContextType>(weatherContextDefaultValues);

type Props = {
    children: ReactNode;
}

const ContextProvider = ({ children }: Props) => {

    const [isCelsius, setIsCelsius] = useState<boolean>(true);
    // const [valid, setValid] = useState<boolean>(true);

    const isNotCelsius = () => {
        setIsCelsius(!isCelsius)
    }

    const determineTemp = (temp: any): JSX.Element => {
        if(isCelsius) {
            return <h3>{Math.floor(temp - 273.15)}°C</h3>
        } else {
            return <h3>{(Math.floor(temp - 273.15) * 9/5) + 32}°F</h3>
        }
    }

    const value = {
        isCelsius,
        isNotCelsius,
        determineTemp,
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;