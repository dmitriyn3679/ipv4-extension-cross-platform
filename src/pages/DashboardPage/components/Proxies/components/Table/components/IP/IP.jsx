/* eslint-disable max-len */
import { getCountryFlag } from "../../../../../../../../utils/helpers/getCountryFlag";
import { getCorrectDate } from "../../../../../../../../utils/helpers/getCorrectDate";
import { classNames } from "../../../../../../../../utils/helpers/classNames";
import "./IP.scss";
/* eslint-enable max-len */

export const IP = ({ ip }) => {
  return (
    <div className="ip">
      <span className={classNames(
        "ip__status",
        { "ip__status--runningOut": ip.runningOut }
      )}
      />
      <span className="ip__flag">{getCountryFlag(ip.countryInfo.code)}</span>
      <div className="ip__info">
        <span className="ip__ip">{ip.innerIp}</span>
        <div className="ip__date">
          {getCorrectDate(ip.dateStart)}
          &nbsp;
          —
          &nbsp;
          {getCorrectDate(ip.deadLine)}
        </div>
      </div>
    </div>
  );
};
