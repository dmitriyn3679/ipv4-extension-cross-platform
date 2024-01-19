export const getCountryFlag = (code) => {
  return (
    <img className="flag" src={`/assets/flags/${code}.svg`} loading="lazy" width="28" height="19" alt={code} style={{ objectFit: "cover", borderRadius: "4px", marginRight: "12px"}} />
  )
};
