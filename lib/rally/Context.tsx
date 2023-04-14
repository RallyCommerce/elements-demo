import React from 'react'

interface ContextShape {
    product: any | null;
    setProduct: React.Dispatch<React.SetStateAction<any | null>>;
    rally: any;
}

export const Context = React.createContext<ContextShape>({
    product: null,
    rally: null,
    setProduct: () => {
        throw Error('You forgot to wrap this in a Provider object')
    }
})
