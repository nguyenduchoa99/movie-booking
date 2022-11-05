import api from "../constants/api";
const quanLyRapService = {
    getMovieSchedule: () => {
		return api.get("QuanLyRap/LayThongTinLichChieuHeThongRap", {
			params: {
				maNhom: "GP02",
			},
		});
	},

	getMovieScheduleDetails: (movieId) => {
		return api.get("QuanLyRap/LayThongTinLichChieuPhim", {
			params: {
				MaPhim: movieId,
			},
		});
	},

	getCinemaSystem: () => {
		return api.get("QuanLyRap/LayThongTinHeThongRap");
	},

	getCinemaTheater: (theaterName) => {
		return api.get("QuanLyRap/LayThongTinCumRapTheoHeThong", {
			params: {
				maHeThongRap: theaterName,
			},
		});
	},
};
export default quanLyRapService;