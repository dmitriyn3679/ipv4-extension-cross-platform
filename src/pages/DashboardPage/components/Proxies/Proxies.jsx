import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "./components/Table";
import { Filter } from "./components/Filter";
import { selectTranslations } from "../../../../features/translation";
import { ApiService } from "../../../../api/ApiService";
import { Pagination } from "../../../../components/common/Pagination/Pagination";
import { errorToast } from "../../../../utils/helpers/customToast";
import "./Proxies.scss";
import { classNames } from "../../../../utils/helpers/classNames";

export const Proxies = () => {
  const { proxies: { title, mobile } } = useSelector(selectTranslations);

  const ITEMS_PER_PAGE = 10;
  const initialSelectedTypes = ["IPv4", "IPv6", "ISP", "MOBILE"];

  const [ips, setIps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataCount, setDataCount] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, size: ITEMS_PER_PAGE })
  const [selectedTypes, setSelectedTypes] = useState(initialSelectedTypes);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  useEffect(() => {
    const countryCode = selectedCountry ? {
      country: selectedCountry?.code
    } : {};
    
    (async () => {
      setIsLoading(true);
      try {
        const {
          data: { content, totalElements }, status
        } = await ApiService.getIps(
          {
            page: pagination.page - 1,
            size: pagination.size,
            params: {
              proxyType: selectedTypes, ...countryCode
            }
          }
        );
        
        if (status !== 200) {
          throw new Error();
        }
        
        setIps(content);
        setDataCount(totalElements);
      } catch (e) {
        errorToast("Something went wrong");
      } finally {
        if (!isLoaded) {
          setIsLoaded(true);
        }
        setIsLoading(false);
      }
    })()
  }, [pagination.size, pagination.page, selectedTypes, selectedCountry]);
  
  const handlePageChange = (page) => {
    setPagination((current) => {
      return { ...current, page }
    })
  };
  
  // const isPagination = dataCount > 10 && !isLoading;
  const isPagination = dataCount > 10;
  const pagesCount = dataCount / ITEMS_PER_PAGE;

  return (
    <div className="proxies">
      <div className="proxies__header">
        <div className="proxies__title">{title}</div>
        <Filter
          setSelectedTypes={setSelectedTypes}
          selectedTypes={selectedTypes}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </div>
      <div className={classNames(
        "proxies__table dashboard-content-container",
        { "proxies__table--pagination": !isPagination }
      )}
      >
        <Table isLoading={isLoading} isLoaded={isLoaded} ips={ips} isPagination={isPagination} />
      </div>
      {isPagination && (
        <Pagination
          totalPages={pagesCount}
          currentPage={pagination.page}
          onPageChange={handlePageChange}
          hideOnSinglePage={false}
        />
      )}
    </div>
  );
};
