import api from "../constants/api";
const quanLyPhimService = {
    getBanners: () => {
		return api.get("QuanLyPhim/LayDanhSachBanner");
	},

	getMovies: (search) => {
		if (search !== "") {
			return api.get("QuanLyPhim/LayDanhSachPhim", {
				params: {
					maNhom: "GP02",
					tenPhim: search,
				},
			});
		}
		return api.get("QuanLyPhim/LayDanhSachPhim", {
			params: {
				maNhom: "GP02",
			},
		});
	},

	getMovieDetails: (movieId) => {
		return api.get("QuanLyPhim/LayThongTinPhim", {
			params: {
				maPhim: movieId,
			},
		});
	},

	addMovie: (movie) => {
		const formData = new FormData();
		for (let key in movie) {
			formData.append(key, movie[key]);
		}
		formData.append("maNhom", "GP02");

		return api.post("QuanLyPhim/ThemPhimUploadHinh", formData);
	},

	deleteMovie: (movieId) => {
		return api.delete("QuanLyPhim/XoaPhim", {
			params: {
				maPhim: movieId,
			},
		});
	},

	updateMovie: (movie) => {
		const formData = new FormData();
		for (let key in movie) {
			formData.append(key, movie[key]);
		}
		formData.append("maNhom", "GP02");
		return api.post("QuanLyPhim/CapNhatPhimUpload", formData);
	},
};
export default quanLyPhimService;