import { useState } from 'react';

export const useSuggestionLogic = () => {
    const initialSuggestion = Array.from({ length: 4 }, () => ({
        type: null,
        flight: null,
        original: null,
        Class: null,
        sales: null,
    }));

    const [suggestion, setSuggestion] = useState(initialSuggestion);

    const [date, setDate] = useState();

    const handleTypeChange = (index, newType) => {
        const updatedSuggestion = [...suggestion];
        updatedSuggestion[index] = { ...suggestion[index], type: newType };
        setSuggestion(updatedSuggestion);
    };

    const handleClassChange = (index, newType) => {
        const updatedSuggestion = [...suggestion];
        updatedSuggestion[index] = { ...suggestion[index], Class: newType };
        setSuggestion(updatedSuggestion);
    };

    const handleFlightChange = (index, newType) => {
        const updatedSuggestion = [...suggestion];
        updatedSuggestion[index] = { ...suggestion[index], flight: newType };
        setSuggestion(updatedSuggestion);
    };

    const handleOriginalChange = (index, newType) => {
        const updatedSuggestion = [...suggestion];
        updatedSuggestion[index] = { ...suggestion[index], original: newType };
        setSuggestion(updatedSuggestion);
    };

    const handleSalesChange = (index, newType) => {
        const updatedSuggestion = [...suggestion];
        updatedSuggestion[index] = { ...suggestion[index], sales: newType };
        setSuggestion(updatedSuggestion);
    };

    const handleDateChange = (newType) => {
        setDate(newType);
    };

    return {suggestion, date , handleDateChange, handleTypeChange, handleFlightChange,handleOriginalChange,handleClassChange,handleSalesChange}
};
