import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
const CheckoutRoute = ({ children }) => {
	const { user } = useSelector((state) => state.auth);

	if (!user) {
		Swal.fire({
			icon:'warning',
			title:'Vui lòng đăng nhập trước khi đặt vé!'
		})
		return <Navigate to="/login" />;
	}

	return children;
};

export default CheckoutRoute;
