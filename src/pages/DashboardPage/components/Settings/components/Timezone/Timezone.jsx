import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "../../../../../../components/ui/Toggle";
import { setTimezone } from "../../../../../../features/settings";
import { resetTimezone } from "../../../../../../utils/helpers/resetTimezone";
import { updateTimezone } from "../../../../../../utils/helpers/updateTimezone";
import "./Timezone.scss";

export const Timezone = ({ label, info, handler }) => {
  const { isSpoofTimezoneActive } = useSelector((state) => state.settings);
  const { isProxyEnabled } = useSelector((state) => state.content)
  const dispatch = useDispatch();
  
  const spoofTimezone = () => {
    dispatch(setTimezone(!isSpoofTimezoneActive))
    
    if (isProxyEnabled && !isSpoofTimezoneActive) {
      updateTimezone();
      return;
    }
    
    if (isSpoofTimezoneActive) {
      resetTimezone();
    }
  };
  
  return (
    <div className="parameter">
      <span className="parameter__label">{label}</span>
      <div className="parameter__container">
        <p className="parameter__info">{info}</p>
        <Toggle
          checked={isSpoofTimezoneActive}
          handleSwitch={spoofTimezone}
        />
      </div>
    </div>
  );
};
