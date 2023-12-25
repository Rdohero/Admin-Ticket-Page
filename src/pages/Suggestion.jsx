import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {bookingDetailTicket, bookingSuggestion} from "../service/ticketAdminService.js";
import {Backdrop, CircularProgress} from "@mui/material";
import Datepicker from "react-tailwindcss-datepicker";
import {useSuggestionLogic} from '../service/suggestionLogic.js';
import CurrencyInput from "react-currency-input-field";
import Admin from "./Navbar.jsx";
import swalWithBootstrapButtons from "sweetalert2";

const Suggestion = () => {
    const location = useLocation();
    let direction = location.state.direction;
    let { id } = useParams();

    const {suggestion,date , handleDateChange, handleTypeChange, handleFlightChange,handleOriginalChange,handleClassChange,handleSalesChange} = useSuggestionLogic();
    const [BookingDetailsTicket, setBookingDetailTicket] = useState({});
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const navigate = useNavigate();

    let newDateString = location.state.date.replace("T00:00:00Z", "");

    const sugges = async (e) => {
        e.preventDefault();

        const validSuggestions = suggestion.filter(
            (item) =>
                item.type !== null && item.type !== "Choose a Type" &&
                item.flight !== null &&
                item.original !== null &&
                item.Class !== null && item.Class !== "Choose a Class" &&
                item.sales !== null
        );

        if (validSuggestions.length < 2) {
            swalWithBootstrapButtons.fire({
                buttonsStyling: true,
                title: "Error",
                text: "Harap isi setidaknya dua saran sebelum mengirimkan",
                icon: "error",
                confirmButtonColor: "#28a745",
                confirmButtonText: "Ok !",
            });
            return;
        }

        try {
            setLoading2(true);
            await bookingSuggestion(suggestion,id,direction,BookingDetailsTicket.ticket_booking_id, newDateString);
            setLoading2(false);
            navigate('/');
        } catch (error) {
            swalWithBootstrapButtons.fire({
                buttonsStyling: true,
                title: "Error",
                text: `${error.message}`,
                icon: "error",
                confirmButtonColor: "#28a745",
                confirmButtonText: "Ok !",
            });
            setLoading2(false);
        }
    };

    const prints = () => {
      console.log(suggestion);
    }

    useEffect(() => {
        let isMounted = true;

        handleDateChange({startDate: newDateString, endDate: newDateString})

        bookingDetailTicket(id)
            .then(res => {
                if (isMounted) {
                    setLoading(false);
                    setBookingDetailTicket(res.data);
                }
            })
            .catch(error => {
                if (isMounted) {
                    console.error("Error fetching Booking Details Ticket :", error);
                }
            });

        return () => {
            isMounted = false;
        };}, [id]);

    if (loading) {
        return <div className="h-screen flex items-center justify-center bg-white">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    }
    return (
        <div className="h-full flex flex-col bg-[#F7F9FA]">
            {
                loading2 === true
                    ?             <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    : null
            }
            <Admin/>
            <div className="h-full w-full flex flex-col bg-[#F7F9FA] items-center">
                <div className="px-[7.25rem] pt-9">
                    <div className="flex">
                        <div className="flex flex-col w-[55vw]">
                            <div className="flex flex-col items-start">
                                <div className="bg-white rounded-md p-6 shadow-md">
                                    <form onSubmit={sugges}>
                                        {suggestion.map((suggestionItem, index) => (
                                            <div key={index} className="flex flex-col items-start">
                                                <div className="bg-white w-[55vw] rounded-md p-6 shadow-md mb-8">
                                                    <div className="flex flex-col">
                                                        <h1 onClick={prints} className="text-[28px] text-center mb-5">Suggestion {index + 1}</h1>
                                                        <div className="flex flex-col gap-5">
                                                            <div className="flex flex-row gap-5">
                                                                <select id="type" name="type" className="block w-1/2 px-4 py-3 text-base text-black border border-[#BDCBD6] rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        onChange={(e) => handleTypeChange(index, e.target.value)}
                                                                >
                                                                    <option defaultValue>Choose a Type</option>
                                                                    <option value="Garuda">Garuda</option>
                                                                    <option value="Lion">Lion</option>
                                                                </select>
                                                                <input
                                                                    type="text"
                                                                    className={`h-[5vh] w-1/2 border-[#BDCBD6] border-[1px] rounded-lg ps-3 pe-3 font-montserrat font-medium text-base lg:text-sm text-primaryText placeholder-hintText focus:outline-blue-500 placeholder:text-center`}
                                                                    placeholder="Flight"
                                                                    onChange={(e) => handleFlightChange(index, e.target.value)}
                                                                ></input>
                                                            </div>
                                                            <div className="flex flex-row gap-5">
                                                                <select id="direction" disabled className="block focus:outline-blue-500 w-1/2 px-4 py-3 text-base text-black border border-[#BDCBD6] rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                    <option defaultValue>{direction}</option>
                                                                </select>
                                                                <CurrencyInput
                                                                    id="input-example"
                                                                    name="input-name"
                                                                    placeholder="Original Price"
                                                                    className={`h-[5vh] w-1/2 border-[#BDCBD6] border-[1px] rounded-lg ps-3 pe-3 font-montserrat font-medium text-base lg:text-sm text-primaryText placeholder-hintText focus:outline-blue-500 placeholder:text-center`}
                                                                    decimalsLimit={2}
                                                                    prefix="Rp. "
                                                                    onValueChange={(value) => handleOriginalChange(index, value)}
                                                                />
                                                            </div>
                                                            <div className="flex flex-row gap-5">
                                                                <select id="class" className="block focus:outline-blue-500 w-1/2 px-4 py-3 text-base text-black border border-[#BDCBD6] rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        onChange={(e) => handleClassChange(index, e.target.value)}
                                                                >
                                                                    <option defaultValue>Choose a Class</option>
                                                                    <option value="Business">Business</option>
                                                                    <option value="Ekonomi">Ekonomi</option>
                                                                </select>
                                                                <CurrencyInput
                                                                    id="sales"
                                                                    name="sales"
                                                                    placeholder="Sales Price"
                                                                    className={`h-[5vh] w-1/2 border-[#BDCBD6] border-[1px] rounded-lg ps-3 pe-3 font-montserrat font-medium text-base lg:text-sm text-primaryText placeholder-hintText focus:outline-blue-500 placeholder:text-center`}
                                                                    decimalsLimit={2}
                                                                    prefix="Rp. "
                                                                    onValueChange={(value) => handleSalesChange(index, value)}
                                                                />
                                                            </div>
                                                            <Datepicker
                                                                useRange={false}
                                                                primaryColor={"blue"}
                                                                asSingle={true}
                                                                disabled
                                                                value={date}
                                                                inputClassName="bg-white border border-[#BDCBD6] ps-3 pe-3 w-full rounded-lg h-[5vh] focus:outline-blue-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button type="submit" className="bg-blue-600 w-full rounded-md p-3 text-base font-montserrat font-semibold text-white">
                                            Make Suggestion
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="w-10"></div>
                        <div className="flex flex-col items-start">
                            <div className="bg-white w-[25vw] rounded-md p-6 ms-4 shadow-md">
                                <div className="flex items-center mb-3 mt-4">
                                    <h1 className="font-montserrat font-semibold text-[15px] ">Nama</h1>
                                    <div className="mx-1">•</div>
                                    <h1 className="font-montserrat font-normal text-[15px] text-primary">
                                        {BookingDetailsTicket.nama}
                                    </h1>
                                </div>

                                <div className="flex items-center mb-3 mt-4">
                                    <h1 className="font-montserrat font-semibold text-[15px] ">Gender</h1>
                                    <div className="mx-1">•</div>
                                    <h1 className="font-montserrat font-normal text-[15px] text-primary">
                                        {BookingDetailsTicket.gender}
                                    </h1>
                                </div>

                                <div className="flex items-center mb-3 mt-4">
                                    <h1 className="font-montserrat font-semibold text-[15px] ">Alamat</h1>
                                    <div className="mx-1">•</div>
                                    <h1 className="font-montserrat font-normal text-[15px] text-primary">
                                        {BookingDetailsTicket.alamat}
                                    </h1>
                                </div>

                                <div className="flex items-center mb-3 mt-4">
                                    <h1 className="font-montserrat font-semibold text-[15px] ">NIK</h1>
                                    <div className="mx-1">•</div>
                                    <h1 className="font-montserrat font-normal text-[15px] text-primary">
                                        {BookingDetailsTicket.nik}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Suggestion;