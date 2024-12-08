import React from 'react';

const IngredientsContext = React.createContext();

const useIngredients = () => {
    const context = React.useContext(IngredientsContext)
    if (!context) {
        throw new Error('useIngredients must be used within a IngredientsProvider');
    }
    return context
}

const IngredientsProvider = (props) => {
    const [ingredients, setIngredients] = React.useState({
        ingredients:{
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 4
    });
    const value = React.useMemo(() => [ingredients, setIngredients],[ingredients])
    return <IngredientsContext.Provider value={value} {...props} />
}

export {IngredientsProvider, useIngredients, IngredientsContext};