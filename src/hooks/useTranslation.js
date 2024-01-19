import {useSelector} from "react-redux";
import {selectTranslations} from "../features/translation";

export const useTranslation = () => {
  return useSelector(selectTranslations);
};
