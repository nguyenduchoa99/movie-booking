import { Table, Tooltip } from "antd";
import Search from "antd/lib/input/Search";
import {
	changeSearch,
	deleteMovie,
	getMovieDetails,
	getMovies,
} from "modules/Admin/slices/adminSlice";
import React from "react";
import { useEffect } from "react";
import {
	AiOutlineCalendar,
	AiOutlineDelete,
	AiOutlineEdit,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import "./movieList.scss";

const MovieList = () => {
	

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { movies, search } = useSelector((state) => state.admin);

	useEffect(() => {
		dispatch(getMovies());
	}, [search]);

	const handleDelete = async (movieId) => {
		try {
			await dispatch(deleteMovie(movieId));
			Swal.fire({
				icon:'success',
				title:'Xóa phim thành công'
			})
		} catch (error) {
			Swal.fire({
				icon:'error',
				title:'Xóa phim thất bại',
				text:error
			})
		}
	};

	const handleEdit = async (movieId) => {
		try {
			await dispatch(getMovieDetails(movieId));
			navigate(`/admin/editMovie/${movieId}`);
		} catch (error) {}
	};

	const handleSearch = (value) => {
		dispatch(changeSearch(value));
	};

	const handleCalender = (movieId) => {
		navigate(`/admin/showtimes/${movieId}`);
	};

	const columns = [
		{
			title: "Mã Phim",
			dataIndex: "maPhim",
		},
		{
			title: "Hình Ảnh",
			dataIndex: "hinhAnh",
		},
		{
			title: "Tên Phim",
			dataIndex: "tenPhim",
		},
		{
			title: "Mô Tả",
			dataIndex: "moTa",
		},
		{
			title: "Hành Động",
			dataIndex: "chinhSua",
		},
	];
	const data = [];

	for (let i = 0; i < movies?.length; i++) {
		let movie = movies[i];
		data.push({
			key: i,
			maPhim: <p>{movie.maPhim}</p>,
			hinhAnh: (
				<div>
					<img width={80} height={100} src={movie.hinhAnh} alt={movie.maPhim} />
				</div>
			),
			tenPhim: <h3 className="fs-5 text-danger">{movie.tenPhim}</h3>,
			moTa: <p>{movie.moTa}</p>,
			chinhSua: (
				<>
					<Tooltip title="Sửa">
						<button
							className="movie-list-btn edit"
							onClick={() => handleEdit(movie.maPhim)}
						>
							<AiOutlineEdit />
						</button>
					</Tooltip>

					<Tooltip title="Xóa">
						<button
							className="movie-list-btn delete"
							onClick={() => handleDelete(movie.maPhim)}
						>
							<AiOutlineDelete />
						</button>
					</Tooltip>

					<Tooltip title="Thêm Lịch Chiếu">
						<button
							className="movie-list-btn calendar"
							onClick={() => handleCalender(movie.maPhim)}
						>
							<AiOutlineCalendar />
						</button>
					</Tooltip>
				</>
			),
		});
	}

	return (
		<div className="movie-list">
			<Search
				placeholder="Nhập tên phim"
				allowClear
				enterButton="Tìm Kiếm"
				size="large"
				onSearch={handleSearch}
			/>
			<h1 className="text-danger mb-5 fs-2">Danh Sách Phim</h1>

			<div>
				<Table columns={columns} dataSource={data} />
			</div>
		</div>
	);
};

export default MovieList;
