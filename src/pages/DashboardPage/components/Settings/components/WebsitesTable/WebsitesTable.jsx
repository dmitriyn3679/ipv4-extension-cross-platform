import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "../../../../../../components/ui/Checkbox";
import { IconSvg } from "../../../../../../utils/iconSvg";
import { AddSiteModal } from "./components/AddSiteModal";
import { errorToast } from "../../../../../../utils/helpers/customToast";
import { ApiService } from "../../../../../../api/ApiService";
import { fetchWebsites } from "../../../../../../features/asyncActions/fetchWebsites";
import { removeWebsite, setWebsites } from "../../../../../../features/content";
import { Pagination } from "../../../../../../components/common/Pagination/Pagination";
import { useTranslation } from "../../../../../../hooks/useTranslation";
import { TableRow } from "./components/TableRow/TableRow";
import { RowSkeleton } from "./components/RowSkeleton/RowSkeleton";
import { classNames } from "../../../../../../utils/helpers/classNames";
import { enableProxy } from "../../../../../../utils/helpers/enableProxy";
import { updateTimezone } from "../../../../../../utils/helpers/updateTimezone";
import { getLangHeader } from "../../../../../../utils/helpers/getLangHeader";
import { updateDynamicRule } from "../../../../../../utils/helpers/updateDynamicRule";
import { LANG_RULE_ID, USER_AGENT_RULE_ID } from "../../../../../../utils/helpers/ruleIds";
import "./WebsitesTable.scss";

export const WebsitesTable = () => {
  const [selectedSites, setSelectedSites] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, size: 10 })
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isRowLoading, setIsRowLoading] = useState(false);
  const [isMainCheckboxLoading, setIsMainCheckboxLoading] = useState(false);
  
  const dispatch = useDispatch();
  const { settings: { url, proxy, addSite } } = useTranslation();
  const {
    websites: { data: websites, dataCount },
    selectedProxy,
    isProxyEnabled
  } = useSelector((state) => state.content)

  const {
    isSpoofTimezoneActive,
    isSpoofLangActive,
    selectedUserAgentParams,
    ignoredHosts
  } = useSelector((state) => state.settings);
  
  useEffect(() => {
    (async () => {
      setIsTableLoading(true);
      await dispatch(fetchWebsites(
        { page: pagination.page - 1, size: pagination.size }
      ))
      setIsTableLoading(false);
    })()
  }, [pagination.page, pagination.size]);
  
  const isPagination = dataCount > 10;
  const pagesCount = dataCount / 10;
  
  const handleModal = (e) => {
    e.stopPropagation();
    setModalIsOpen(true);
  };
  
  const selectHandler = (id) => {
    if (selectedSites.includes(id)) {
      setSelectedSites((current) => current.filter((siteId) => siteId !== id));
      return;
    }
  
    setSelectedSites((current) => [...current, id]);
  };
  
  const getSelectedHosts = async () => {
    try {
      const { data, status } = await ApiService.getHostsById({ ids: selectedSites })
      
      if (status !== 200) {
        throw new Error();
      }

      return data;
    } catch {
      errorToast("Something went wrong")
    }
  };
  
  const setProxySettings = (hosts) => {
    if (isSpoofTimezoneActive) {
      updateTimezone();
    }
    
    if (isSpoofLangActive) {
      const langHeader = getLangHeader(selectedProxy);
      updateDynamicRule(LANG_RULE_ID, {
        "Accept-Language": langHeader || "en;q=1.0"
      }, hosts)
    }
    
    if (selectedUserAgentParams) {
      updateDynamicRule(USER_AGENT_RULE_ID, selectedUserAgentParams.headers, hosts);
    }
  };
  
  const restartConfig = (selectedHosts = []) => {
    if (!isProxyEnabled || !selectedHosts.length) {
      return;
    }
    
    const selectedDomains = selectedHosts.map((siteUrl) => siteUrl.split('/')[2]);
    const hosts = ["stage.proxy-ipv4.com", "proxy-ipv4.com", ...ignoredHosts]
      .filter((domain) => !selectedDomains.includes(domain));
    
    enableProxy(
      selectedProxy?.innerIp,
      selectedProxy?.proxyPort,
      selectedProxy?.authLogin,
      selectedProxy?.authPassword,
      hosts,
      () => setProxySettings(hosts)
    )
  };
  
  const removeWebsites = async () => {
    if (!selectedSites.length) {
      return;
    }
    
    setIsMainCheckboxLoading(true);
    try {
      const { data, status: getStatus } = await ApiService.getHostsById({ ids: selectedSites })
      const { status: removeStatus } = await ApiService.removeWebsites({ ids: selectedSites })
      
      if (getStatus !== 200 || removeStatus !== 200) {
        throw new Error();
      }
   
      dispatch(removeWebsite(selectedSites));
      setSelectedSites([]);
  
      restartConfig(data);
    } catch (e) {
      errorToast("Something went wrong")
    } finally {
      setIsMainCheckboxLoading(false);
    }
  };
  
  const selectAll = async ({ target: { checked } }) => {
    if (checked) {
      setIsMainCheckboxLoading(true);
      try {
        const { data, status } = await ApiService.getAllWebsiteIds();
    
        if (status !== 200) {
          throw new Error();
        }
    
        setSelectedSites(data);
      } catch (e) {
        errorToast("Something went wrong")
      } finally {
        setIsMainCheckboxLoading(false);
      }
    } else {
      setSelectedSites([]);
    }
  };
  
  const handlePageChange = (page) => {
    setPagination((current) => {
      return { ...current, page };
    })
  };

  return (
    <>
      <div className="websites-table">
        <div className="websites-table__actions">
          <button
            className="websites-table__icon websites-table__trash-icon"
            onClick={removeWebsites}
            disabled={!selectedSites.length || isMainCheckboxLoading}
          >
            <IconSvg tag="trash" />
          </button>
          <button
            className="websites-table__icon websites-table__plus-icon"
            onClick={handleModal}
          >
            <IconSvg tag="plus" />
            <span>{addSite}</span>
          </button>
        </div>
        <div className={classNames(
          "dashboard-content-container websites-table__container",
          { "websites-table__container--pagination": !isPagination }
        )}
        >
          <div className="websites-table__head-container">
            <table className="websites-table__table">
              <thead className="websites-table__head">
                <tr>
                  <th className="websites-table__heading">
                    <div className="websites-table__ip-label">
                      <Checkbox
                        checked={dataCount > 0 && dataCount === selectedSites.length}
                        partly={selectedSites.length > 0 && selectedSites.length !== dataCount}
                        onChange={selectAll}
                        isLoading={isMainCheckboxLoading}
                      />
                    </div>
                  </th>
                  <th className="websites-table__heading websites-table__heading--url">
                    <div className="websites-table__ip-label">{url}</div>
                  </th>
                  <th className="websites-table__heading">
                    <div className="websites-table__type-label">{proxy}</div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className={classNames(
            "websites-table__body-container",
            { "websites-table__body-container--pagination": isPagination }
          )}
          >
            <table className="websites-table__table">
              <tbody>
                {isTableLoading ? (
                  <>
                    {Array(10).fill("_").map(() => (
                      <RowSkeleton />
                    ))}
                  </>
                ) : (
                  <>
                    {websites.map(({ id, site, enabled }) => (
                      <TableRow
                        key={id}
                        id={id}
                        site={site}
                        enabled={enabled}
                        selectedSites={selectedSites}
                        selectHandler={selectHandler}
                        isCheckboxLoading={isMainCheckboxLoading}
                      />
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
          { modalIsOpen && (
            <AddSiteModal
              setModalIsOpen={setModalIsOpen}
              setWebsites={setWebsites}
            />
          )}
        </div>
      </div>
      {isPagination && (
        <Pagination
          totalPages={pagesCount}
          currentPage={pagination.page}
          onPageChange={handlePageChange}
          hideOnSinglePage={false}
        />
      )}
    </>
  );
};
