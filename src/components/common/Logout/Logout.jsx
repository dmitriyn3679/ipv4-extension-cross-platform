import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconSvg } from "../../../utils/iconSvg";
import { errorToast } from "../../../utils/helpers/customToast";
import { ApiService } from "../../../api/ApiService";
import { setIsAuthUser } from "../../../features/auth";
import { useTranslation } from "../../../hooks/useTranslation";
import { resetProxyParams } from "../../../utils/helpers/resetProxyParams";
import "./Logout.scss";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications } = useTranslation();
  
  const logoutHandler = async () => {
    try {
      const { status } = await ApiService.logout();
      
      if (status !== 200) {
        throw new Error();
      }
      
      dispatch(setIsAuthUser({ isAuth: false, isLoaded: true }))
      resetProxyParams();
      navigate("/auth");
    } catch (e) {
      errorToast(notifications.error);
    }
  };
  
  return (
    <div className="logout" onClick={logoutHandler}>
      <IconSvg tag="logout" />
    </div>
  );
};
