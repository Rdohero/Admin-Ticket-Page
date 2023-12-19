import {AiOutlineArrowRight} from "react-icons/ai";
import {useParams} from "react-router-dom";
import {bookingDetail} from "../service/ticketAdminService.js";
import {useEffect, useState} from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import Admin from "./Navbar.jsx";

const OrderDetail = () => {
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('en-US', options).replace(/\//g, '-')
    };

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
                                <div className="bg-white rounded-md p-6 shadow-md">
                                    {BookingDetails.TicketBookingDetail.map((BookingDetail) => (
                                        <div className="bg-white w-[55vw] rounded-md p-6 shadow-md mb-10" key={BookingDetail.ticket_booking_detail_id}>
                                            <h1 className='font-montserrat font-semibold text-[25px] mb-4'>{BookingDetail.nama}</h1>
                                            <div className="flex items-center mb-3 mt-4">
                                                <h1 className="font-montserrat font-semibold text-[15px] ">Jenis Kelamin</h1>
                                                <div className="mx-2 text-[20px]">•</div>
                                                <h1 className="font-montserrat font-normal text-[15px] text-primary">
                                                    {BookingDetail.gender}
                                                </h1>
                                            </div>
                                            <div className="flex items-center mb-3 mt-4">
                                                <h1 className="font-montserrat font-semibold text-[15px] ">Alamat</h1>
                                                <div className="mx-2 text-[20px]">•</div>
                                                <h1 className="font-montserrat font-normal text-[15px] text-primary">
                                                    {BookingDetail.alamat}
                                                </h1>
                                            </div>
                                            <div className="flex items-center mb-3 mt-4">
                                                <h1 className="font-montserrat font-semibold text-[15px] ">Nik</h1>
                                                <div className="mx-2 text-[20px]">•</div>
                                                <h1 className="font-montserrat font-normal text-[15px] text-primary">
                                                    {BookingDetail.nik}
                                                </h1>
                                            </div>
                                            <div className="h-4"></div>
                                            <a href={`/order/detail/suggestion/` + BookingDetail.ticket_booking_detail_id + `/Pergi`}>
                                                <button type="button" className="bg-blue-600 w-full rounded-md p-3 text-base font-montserrat font-semibold text-white">
                                                    Input Suggestion Pergi
                                                </button>
                                            </a>
                                            <div className="h-4"></div>
                                            {
                                                BookingDetails.Direction.direction === 'Pergi' ? null : (
                                                    <a href={`/order/detail/suggestion/` + BookingDetail.ticket_booking_detail_id + `/Pulang`}>
                                                        <button type="button" className="bg-blue-600 w-full rounded-md p-3 text-base font-montserrat font-semibold text-white">
                                                            Input Suggestion Pulang
                                                        </button>
                                                    </a>
                                                )
                                            }
                                        </div>
                                    ))}
                                </div>
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

