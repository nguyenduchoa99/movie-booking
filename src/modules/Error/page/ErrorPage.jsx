import React from "react";
import { NavLink } from "react-router-dom";


import "./errorPage.scss";

const ErrorPage = () => {
	
	return (
		<div className='error'>
		<div className='err-bg'>
			<div className='err'>
				<h1 className='text-err text-center'>404</h1>
				<p className='text-white text-center text-p-err'>Page not found</p>
				<p className=' text-white text-center'>Trở về <NavLink className='text-link-home' to='/'>TRANG CHỦ</NavLink></p>
			</div>
		</div>
	</div>
	);
};

export default ErrorPage;
