import { Button, Form, Input} from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { login } from "../slices/authSlice";

import "./login.scss";

const Login = () => {
	

	const navigate = useNavigate();
	const { handleSubmit, control } = useForm({
		defaultValues: {
			taiKhoan: "",
			matKhau: "",
		},
		mode: "onTouched",
	});

	const dispatch = useDispatch();
	const { user, isLoading } = useSelector((state) => state.auth);

	const onSubmit = async (values) => {
		try {
			await dispatch(login(values)).unwrap();
			await Swal.fire({
				icon:'success',
				title:'Đăng Nhập thành công'
			})

			navigate("/");
		} catch (error) {
			Swal.fire({
				icon:'error',
				title:'Đăng nhập thất bại',
				text:error
			})
		}
		setTimeout(() => {
			if (user) {
				return <Navigate to="/" />;
			}
		}, 300);
	};

	return (
		<div className="login">
			<h1 className="login-title">Đăng nhập</h1>
			<Form
				onFinish={handleSubmit(onSubmit)}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
			>
				<Controller
					name="taiKhoan"
					control={control}
					rules={{
						required: {
							value: true,
							message: "Vui lòng nhập tài khoản",
						},
					}}
					render={({ field, fieldState: { error } }) => (
						<Form.Item
							label="Tài Khoản"
							validateStatus={error ? "error" : ""}
							help={error?.message}
						>
							<Input type="text" {...field} />
						</Form.Item>
					)}
				/>

				<Controller
					name="matKhau"
					control={control}
					rules={{
						required: {
							value: true,
							message: "Vui lòng nhập mật khẩu",
						}		
					}}
					render={({ field, fieldState: { error } }) => (
						<Form.Item
							label="Mật Khẩu"
							validateStatus={error ? "error" : ""}
							help={error?.message}
						>
							<Input.Password type="password" {...field} />
						</Form.Item>
					)}
				/>

				<Form.Item>
					<button
						className="log-button"
						type="primary"
						htmlType="submit"
						disabled={isLoading}
						loading={isLoading}
					>
						Đăng Nhập
					</button>
					<div>
						<p className="text-center text-white">Bạn chưa có tài khoản? <NavLink className='text-title' to="/register">Đăng ký ngay!</NavLink></p>
						<p className="text-center"><NavLink className='text-title' to='/'>Back to Home</NavLink></p>
					</div>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
