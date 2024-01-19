import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTranslations } from "../../../../../../features/translation";
import { RowSkeleton } from "./components/RowSkeleton/RowSkeleton";
import { IP } from "./components/IP/IP";
import { NoIps } from "./components/NoIps";
import { setSelectedProxy } from "../../../../../../features/content";
import { resetProxyParams } from "../../../../../../utils/helpers/resetProxyParams";
import { setSelectedUserAgent } from "../../../../../../features/settings";
import "./Table.scss";
import { classNames } from "../../../../../../utils/helpers/classNames";

export const Table = ({ isLoading, ips, isLoaded, isPagination }) => {
  const { proxies: { mobile, ip, proxyType } } = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const tableIsEmpty = !ips.length && isLoaded;
  
  const moveHome = () => {
    searchParams.set("tab", "");
    setSearchParams(searchParams);
  };
  
  const selectProxy = (proxy) => {
    dispatch(setSelectedProxy(proxy));
    resetProxyParams();
    moveHome();
  };
  
  return (
    <>
      <div className="table__head-container">
        <table className="table">
          <thead className="table__head">
            <tr className="table__head-container">
              <th className="table__heading">
                <div className="table__ip-label">{ip}</div>
              </th>
              <th className="table__heading">
                <div className="table__type-label">{proxyType}</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className={classNames(
        "table__body-container",
        { "table__body-container--pagination": isPagination }
      )}
      >
        <table className="table">
          <tbody>
            {isLoading ? (
              <>
                {Array(5).fill("_").map((_, idx) => (
                  <RowSkeleton />
                ))}
              </>
            ) : (
              <>
                {!tableIsEmpty ? (
                  <>
                    {ips.map((item) => (
                      <tr className="table__row" onClick={() => selectProxy(item)}>
                        <td className="table__data">
                          <IP ip={item} />
                        </td>
                        <td className="table__data table__proxy-type">{item.proxyType}</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={2}>
                      <NoIps />
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
    
  // <table className="table">
  //   <thead className="table__head">
  //     <tr className="table__head-container">
  //       <th className="table__heading">
  //         <div className="table__ip-label">{ip}</div>
  //       </th>
  //       <th className="table__heading">
  //         <div className="table__type-label">{proxyType}</div>
  //       </th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {isLoading ? (
  //       <>
  //         {Array(5).fill("_").map((_, idx) => (
  //           <RowSkeleton />
  //         ))}
  //       </>
  //     ) : (
  //       <>
  //         {!tableIsEmpty ? (
  //           <>
  //             {ips.map((item) => (
  //               <tr className="table__row" onClick={() => selectProxy(item)}>
  //                 <td className="table__data">
  //                   <IP ip={item} />
  //                 </td>
  //                 <td className="table__data table__proxy-type">{item.proxyType}</td>
  //               </tr>
  //             ))}
  //           </>
  //         ) : (
  //           <tr>
  //             <td colSpan={2}>
  //               <NoIps />
  //             </td>
  //           </tr>
  //         )}
  //       </>
  //     )}
  //   </tbody>
  // </table>
  );
};
