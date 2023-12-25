import axios from "axios";

const API_URL = "https://ticketapi-production.up.railway.app";

export const bookingSuggestion = async (suggestions, TicketBookingDetailID, Direction,TicketBookingID,date) => {
    try {
        const validSuggestions = suggestions.filter((suggestion) => {
            const {
                type,
                flight,
                sales,
                original,
                Class,
            } = suggestion;

            return (
                type !== null &&
                flight !== null &&
                sales !== null &&
                original !== null &&
                Class !== null
            );
        });

        const bookingPromises = validSuggestions.map(async (suggestion) => {
            const {
                type,
                flight,
                sales,
                original,
                Class,
            } = suggestion;

            const response = await axios.post(`${API_URL}/booking/detail/flight`, {
                TicketBookingDetail: parseInt(TicketBookingDetailID),
                TicketBooking: parseInt(TicketBookingID),
                Type: type,
                Flight: flight,
                SalesPrice: parseInt(sales),
                Direction: Direction,
                Tanggal: date,
                OriginalPrice: parseInt(original),
                Class: Class,
            });

            if (response.status === 200) {
                console.log(response.data);
                return response.data;
            }
        });

        const results = await Promise.all(bookingPromises);

        return results;
    } catch (error) {
        throw new Error(`Terjadi kesalahan saat melakukan Suggestions : ${error.message}`);
    }
};

export const bookingAll = async () => {
    try {
        const response = await axios.get(`${API_URL}/booking`);

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        throw new Error(`An error occurred during get Booking: ${error.message}`);
    }
}

export const bookingDraft = async () => {
    try {
        const response = await axios.get(`${API_URL}/booking/status/1`);

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        throw new Error(`An error occurred during get Booking: ${error.message}`);
    }
}

export const bookingOnProgress = async () => {
    try {
        const response = await axios.get(`${API_URL}/booking/status/2`);

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        throw new Error(`An error occurred during get Booking: ${error.message}`);
    }
}

export const bookingPaid = async () => {
    try {
        const response = await axios.get(`${API_URL}/booking/status/3`);

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        throw new Error(`An error occurred during get Booking: ${error.message}`);
    }
}

export const bookingDetail = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/booking/detail/${id}`);

        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        throw new Error(`An error occurred during get Booking Detail: ${error.message}`);
    }
}

export const bookingDetailTicket = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/booking/ticket/${id}`);

        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        throw new Error(`An error occurred during get Booking Detail Ticket: ${error.message}`);
    }
}