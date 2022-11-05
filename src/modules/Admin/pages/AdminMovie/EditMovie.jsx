import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as dayjs from "dayjs";
import Swal from 'sweetalert2'
import "./addMovie.scss";
import { useEffect } from "react";
import quanLyPhimService from "services/quanLyPhimService";
import { updateMovie } from "modules/Admin/slices/adminSlice";
import useRequest from "hooks/useRequest";


const EditMovie = () => {
	

	const [imgPreview, setImgPreview] = useState("");
	const { movieId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data: movie } = useRequest(() => quanLyPhimService.getMovieDetails(movieId));

	useEffect(() => {
		reset({
			maPhim: movieId,
			tenPhim: movie?.tenPhim,
			biDanh: movie?.biDanh,
			moTa: movie?.moTa,
			trailer: movie?.trailer,
			hinhAnh: null,
			ngayKhoiChieu: dayjs(movie?.ngayKhoiChieu).format("DD/MM/YYYY"),
			hot: movie?.hot,
			dangChieu: movie?.dangChieu,
			sapChieu: movie?.sapChieu,
			danhGia: movie?.danhGia,
		});
	}, [movie]);

	const {
		reset,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			maPhim: "",
			tenPhim: "",
			biDanh: "",
			moTa: "",
			trailer: "",
			hinhAnh: "",
			ngayKhoiChieu: "",
			hot: "",
			dangChieu: "",
			sapChieu: "",
			danhGia: "",
		},
		mode: "onTouched",
	});

	const onSubmit = async (values) => {
		try {
			await dispatch(updateMovie(values));
			Swal.fire({
				icon:'success',
				title:'Cập nhật phim thành công'
			})
			navigate("/admin/movieList");
		} catch (error) {
			Swal.fire({
				icon:'error',
				title:'Cập nhật phim thất bại',
				text:error
			})
		}
	};

	const handleChangeImage = (evt) => {
		const file = evt.target.files[0];

		if (!file) return;

		setValue("hinhAnh", file);

		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = (evt) => {
			setImgPreview(evt.target.result);
		};
	};

	return (
		<div className="add-movie">
			<h1 className="text-danger fs-2">Cập Nhật Phim</h1>
			<form className="pt-4" onSubmit={handleSubmit(onSubmit)}>
				{/* tên phim */}
				<div>
					<label>Tên Phim</label>
					<input type="text" placeholder="Tên Phim" {...register("tenPhim")} />
					{errors.tenPhim && <p>{errors.tenPhim.message}</p>}
				</div>

				{/* bí danh */}
				<div>
					<label>Bí Danh</label>
					<input
						type="text"
						placeholder="Bí Danh"
						{...register("biDanh", {
							required: {
								value: true,
								message: "Vui lòng nhập bí danh",
							},
						})}
					/>
					{errors.biDanh && <p>{errors.biDanh.message}</p>}
				</div>

				{/* mô tả */}
				<div>
					<label>Mô Tả</label>

					<input
						type="text"
						placeholder="Mô Tả"
						{...register("moTa", {
							required: {
								value: true,
								message: "Vui lòng nhập mô tả",
							},
							minLength: {
								value: 10,
								message: "Mô tả ít nhất 10 ký tự",
							},
						})}
					/>
					{errors.moTa && <p>{errors.moTa.message}</p>}
				</div>

				{/* trailer */}
				<div>
					<label>Trailer</label>

					<input
						type="text"
						placeholder="Trailer"
						{...register("trailer", {
							required: {
								value: true,
								message: "Vui lòng thêm trailer",
							},
						})}
					/>
					{errors.trailer && <p>{errors.trailer.message}</p>}
				</div>

				{/* ngày khởi chiếu */}
				<div>
					<label>Ngày Khởi Chiếu</label>

					<input
						type="text"
						placeholder="Ngày Khởi Chiếu"
						{...register("ngayKhoiChieu", {
							required: {
								value: true,
								message: "Vui lòng nhập ngảy khởi chiếu",
							},
						})}
					/>
					{errors.ngayKhoiChieu && <p>{errors.ngayKhoiChieu.message}</p>}
				</div>

				{/* hot */}
				<div className="form-check form-switch">
					<label className="form-check-label">Hot</label>
					<input
						className="form-check-input"
						type="checkbox"
						role="switch"
						id="flexSwitchCheckDefault"
						{...register("hot")}
					/>
				</div>

				{/* đang chiếu */}
				<div className="form-check form-switch">
					<label className="form-check-label">Đang Chiếu</label>
					<input
						className="form-check-input"
						type="checkbox"
						role="switch"
						id="flexSwitchCheckDefault"
						{...register("dangChieu")}
					/>
				</div>

				{/* sắp chiếu */}
				<div className="form-check form-switch">
					<label className="form-check-label">Sắp Chiếu</label>
					<input
						className="form-check-input"
						type="checkbox"
						role="switch"
						id="flexSwitchCheckDefault"
						{...register("sapChieu")}
					/>
				</div>

				{/* hình ảnh */}
				<div className="div-image">
					<label>Hình Ảnh</label>
					<input
						className="input-image"
						type="file"
						placeholder="Hình Ảnh"
						onChange={handleChangeImage}
					/>

					<img
						width={70}
						height={100}
						src={imgPreview === "" ? movie?.hinhAnh : imgPreview}
						alt="preview"
					/>
				</div>

				{/* đánh giá */}
				<div>
					<label>Đánh Giá</label>

					<input
						type="text"
						placeholder="Đánh Giá"
						{...register("danhGia", {
							required: {
								value: true,
								message: "Vui lòng nhập đánh giá",
							},
							maxLength: {
								value: 2,
								message: "Tối đa 2 ký số",
							},
							pattern: {
								value: /^[0-9]+$/,
								message: "Vui lòng nhập số",
							},
						})}
					/>
					{errors.danhGia && <p>{errors.danhGia.message}</p>}
				</div>

				<div>
					<button className="btn-add">Cập Nhật</button>
				</div>
			</form>
		</div>
	);
};

export default EditMovie;
