import React, { createContext, ReactNode, useState } from "react";

type weatherContextType = {
    isCelsius: boolean,
    isNotCelsius: () => void,
}

const weatherContextDefaultValues: weatherContextType = {
    isCelsius: true,
    isNotCelsius: () => {}
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

    const value = {
        isCelsius,
        isNotCelsius
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;