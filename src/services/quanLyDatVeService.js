import api from "../constants/api";
const quanLyDatVeService = {
    getTicketDetails: (ticketId) => {
		return api.get("QuanLyDatVe/LayDanhSachPhongVe", {
			params: {
				MaLichChieu: ticketId,
			},
		});
	},

	addTheater: (showtimes) => {
		return api.post("QuanLyDatVe/TaoLichChieu", showtimes);
	},

	bookingTicket: (infoBooking) => {
		return api.post("QuanLyDatVe/DatVe", infoBooking);
	},
};
export default quanLyDatVeService;