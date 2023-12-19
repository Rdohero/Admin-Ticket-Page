import { useState } from 'react';

export const useSuggestionLogic = () => {
    const initialSuggestion = Array.from({ length: 4 }, () => ({
        type: null,
        flight: null,
        original: null,
        Class: null,
        sales: null,
        date: null,
    }));

    const [suggestion, setSuggestion] = useState(initialSuggestion);

    const [date, setDate] = useState([
        {date: null,},
        {date: null,},
        {date: null,},
        {date: null,},
    ]);

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

    const handleDateChange = (index, newType) => {
        const updatedSuggestion = [...suggestion];
        updatedSuggestion[index] = { ...suggestion[index], date: newType.startDate };
        setSuggestion(updatedSuggestion);

        const updatedDate = [...date];
        updatedDate[index] = { ...date[index], date: newType };
        setDate(updatedDate);
    };

    return {suggestion, date , handleDateChange, handleTypeChange, handleFlightChange,handleOriginalChange,handleClassChange,handleSalesChange}
};
