import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const { isLoaded: isAuthDataLoaded } = useSelector((state) => state.auth)
  
  const logoutHandler = async () => {
    if (!isAuthDataLoaded) {
      return;
    }
    
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
