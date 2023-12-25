import {AiOutlineArrowRight} from "react-icons/ai";
import {useNavigate, useParams} from "react-router-dom";
import {bookingDetail} from "../service/ticketAdminService.js";
import {useEffect, useState} from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import Admin from "./Navbar.jsx";

const OrderDetail = () => {
    const navigate = useNavigate();
    let { id } = useParams();

    const [BookingDetails, setBookingDetail] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        bookingDetail(id)
            .then(res => {
                if (isMounted) {
                    setLoading(false);
                    setBookingDetail(res.data);
                }
            })
            .catch(error => {
                if (isMounted) {
                    console.error("Error fetching booking details:", error);
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

    const navigateToSuggestion = (id,direction,date) => {
        navigate(`/order/detail/suggestion/${id}`, {
            state: {
                direction: direction,
                date: date,
            },
        });
    };

    const prints = () => {
        console.log(BookingDetails)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        };
        return date.toLocaleDateString('id-ID', options)
    };

    function FormatMoney(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    }

    return (
        <div className="h-screen flex flex-col bg-[#F7F9FA]">
            <Admin/>
            <div className="h-full w-full flex flex-col bg-[#F7F9FA] items-center">
                <div className="px-[7.25rem] pt-9">
                    <div className="flex">
                        <div className="flex flex-col w-[55vw]">
                            <div className="flex flex-col items-start">
                                <h1 className="font-montserrat font-semibold text-primaryText text-lg mb-3">
                                    Passenger Details
                                </h1>
                                {
                                    BookingDetails.TicketBookingDetail.length === 0
                                        ? <div className={`bg-white rounded-md p-6 shadow-md text-red-500 justify-center flex w-full`}>
                                        Pengguna Belum Mengisi Data Pessanger.
                                        </div>
                                        :<div className="bg-white rounded-md p-6 shadow-md">
                                            {BookingDetails.TicketBookingDetail.map((BookingDetail) => (
                                                <div className="bg-white w-[55vw] rounded-md p-6 shadow-md mb-10" key={BookingDetail.ticket_booking_detail_id}>
                                                    <div>
                                                        <div className="flex flex-row">
                                                            <div className={`w-full flex flex-col justify-center`}>
                                                                <h1 onClick={prints} className='font-montserrat font-semibold text-[30px] mb-2'>{BookingDetail.nama}</h1>
                                                                <div className="flex items-center mb-3">
                                                                    <h1 className="font-montserrat font-semibold text-[15px] ">Jenis Kelamin</h1>
                                                                    <div className="mx-2 text-[20px]">•</div>
                                                                    <h1 className="font-montserrat font-normal text-[15px] text-primary">
                                                                        {BookingDetail.gender}
                                                                    </h1>
                                                                </div>
                                                                <div className="flex items-center mb-3">
                                                                    <h1 className="font-montserrat font-semibold text-[15px] ">Alamat</h1>
                                                                    <div className="mx-2 text-[20px]">•</div>
                                                                    <h1 className="font-montserrat font-normal text-[15px] text-primary">
                                                                        {BookingDetail.alamat}
                                                                    </h1>
                                                                </div>
                                                                <div className="flex items-center mb-3">
                                                                    <h1 className="font-montserrat font-semibold text-[15px] ">NIK</h1>
                                                                    <div className="mx-2 text-[20px]">•</div>
                                                                    <h1 className="font-montserrat font-normal text-[15px] text-primary">
                                                                        {BookingDetail.nik}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                                <div className={`w-full`}>
                                                                    {BookingDetail.BookingDetailFlight.map((BookingDetailFlight) => (
                                                                        <div key={BookingDetailFlight.booking_detail_flight_id} className={`rounded-lg border-[1px] items-center justify-between overflow-hidden mb-4`}>
                                                                            <div className={BookingDetail.selected ? `flex justify-around bg-red-600 text-white py-2` : `flex justify-around bg-blue-600 text-white py-2`}>
                                                                                <h1 className="text-center font-montserrat font-medium text-[18px]">{BookingDetailFlight.type}</h1>
                                                                                <h1 className="text-center font-montserrat font-medium text-[18px]">{BookingDetailFlight.class}</h1>
                                                                            </div>
                                                                            <div className="flex justify-around my-2 text-center">
                                                                                <div>
                                                                                    <h1 className={`font-bold text-[18px]`}>Flight</h1>
                                                                                    <h3 className={`text-[16px]`}>{BookingDetailFlight.flight}</h3>
                                                                                </div>
                                                                                <div>
                                                                                    <h1 className={`font-bold text-[18px]`}>Direction</h1>
                                                                                    <h3 className={`text-[16px]`}>{BookingDetailFlight.direction}</h3>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex justify-around my-3 text-center">
                                                                                <div>
                                                                                    <h1 className={`font-bold text-[18px]`}>Date</h1>
                                                                                    <h3 className={`text-[16px]`}>{formatDate(BookingDetailFlight.tanggal)}</h3>
                                                                                </div>
                                                                                <div>
                                                                                    <h1 className={`font-bold text-[18px]`}>Price</h1>
                                                                                    <h3 className={`text-[16px]`}>{FormatMoney(BookingDetailFlight.sales_price)}</h3>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                        </div>
                                                    </div>
                                                    <div className="h-4"></div>
                                                    <button onClick={() => navigateToSuggestion(
                                                        BookingDetail.ticket_booking_detail_id,
                                                        'Pergi',
                                                        BookingDetails.booking_date
                                                    )} type="button" disabled={BookingDetail.selected} className="disabled:bg-gray-500 bg-blue-600 w-full rounded-md p-3 text-base font-montserrat font-semibold text-white">
                                                        Input Suggestion Pergi
                                                    </button>
                                                    <div className="h-4"></div>
                                                    {
                                                        BookingDetails.Direction.direction === 'Pergi' ? null : (
                                                            <button onClick={() => navigateToSuggestion(
                                                                BookingDetail.ticket_booking_detail_id,
                                                                'Pulang',
                                                                BookingDetails.return_date
                                                            )} type="button" disabled={BookingDetail.selected} className="disabled:bg-gray-500 bg-blue-600 w-full rounded-md p-3 text-base font-montserrat font-semibold text-white">
                                                                Input Suggestion Pulang
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                        }
                            </div>
                        </div>
                        <div className="w-10"></div>
                        <div className="flex flex-col items-start">
                            <div className="bg-white w-[25vw]  rounded-md p-6 mt-10 ms-4 shadow-md">
                                <div className="flex justify-start items-center w-full mb-4 ">
                                    <div className="flex items-center">
                                        <h1 className="font-montserrat font-medium text-xl text-primaryText line-clamp-1">
                                            {BookingDetails.HomeTown.place}
                                        </h1>
                                        <AiOutlineArrowRight className="mr-1 ml-1"></AiOutlineArrowRight>
                                        <h1 className="font-montserrat font-medium text-xl text-primaryText line-clamp-1">
                                            {BookingDetails.DestinationCity.place}
                                        </h1>
                                    </div>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200"></div>

                                <div className="flex items-center mb-3 mt-4">
                                    <h1 className="font-montserrat font-semibold text-sm ">Departure</h1>
                                    <div className="mx-1">•</div>
                                    <h1 className="font-montserrat font-normal text-sm text-primary">
                                        {formatDate(BookingDetails.booking_date)}
                                    </h1>
                                </div>

                                {
                                    BookingDetails.Direction.direction === 'Pergi' ? null : (
                                        <div className="flex items-center mb-3 mt-4">
                                            <h1 className="font-montserrat font-semibold text-sm ">Return</h1>
                                            <div className="mx-1">•</div>
                                            <h1 className="font-montserrat font-normal text-sm text-primary">
                                                {formatDate(BookingDetails.return_date)}
                                            </h1>
                                        </div>
                                    )
                                }

                                <div className="flex items-center mb-3 mt-4">
                                    <h1 className="font-montserrat font-semibold text-sm ">Quantity</h1>
                                    <div className="mx-1">•</div>
                                    <h1 className="font-montserrat font-normal text-sm text-primary">
                                        {BookingDetails.quantity}
                                    </h1>
                                </div>

                                <div className="flex items-center mb-3 mt-4">
                                    <h1 className="font-montserrat font-semibold text-sm ">Status</h1>
                                    <div className="mx-1">•</div>
                                    <h1 className="font-montserrat font-normal text-sm text-primary">
                                        {BookingDetails.Status.status}
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

export default OrderDetail;

