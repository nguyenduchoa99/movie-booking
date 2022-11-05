import api from "../constants/api";
const quanLyNguoiDungService = {
    login: (values) => {
		return api.post("QuanLyNguoiDung/DangNhap", values);
	},

	register: (values) => {
		return api.post("QuanLyNguoiDung/DangKy", {
			...values,
			maNhom: "GP02",
		});
	},

	getUsers: () => {
		return api.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
			params: {
				maNhom: "GP02",
			},
		});
	},

	getUserType: () => {
		return api.get("QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
	},

	addUser: (values) => {
		return api.post("QuanLyNguoiDung/ThemNguoiDung", {
			...values,
			maNhom: "GP02",
		});
	},

	deleteUser: (account) => {
		return api.delete("QuanLyNguoiDung/XoaNguoiDung", {
			params: {
				taiKhoan: account,
			},
		});
	},

	getUserDetails: (account) => {
		return api.post(
			"/QuanLyNguoiDung/LayThongTinNguoiDung",
			{},
			{
				params: {
					taiKhoan: account,
				},
			}
		);
	},

	updateUser: (values) => {
		console.log(values);
		return api.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
			...values,
			maNhom: "GP02",
		});
	},

	updateUserClient: (values) => {
		console.log(values);
		return api.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
			...values,
			maNhom: "GP02",
		});
	},

	searchUser: (value) => {
		return api.get("QuanLyNguoiDung/TimKiemNguoiDung", {
			params: {
				maNhom: "GP02",
				tuKhoa: value,
			},
		});
	},

	getUserInfo: () => {
		return api.post("QuanLyNguoiDung/ThongTinTaiKhoan");
	},
};
export default quanLyNguoiDungService;