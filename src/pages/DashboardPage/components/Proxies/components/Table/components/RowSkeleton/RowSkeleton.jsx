import ContentShimmer from "react-content-shimmer";

export const RowSkeleton = () => {
  const customColorFore = "#555555";
  const customColorBack = "#333333";

  return (
    <tr className="table__row">
      <td className="table__data">
        <ContentShimmer size={{ width: 198.5, height: 32 }} rounded="4px" foreground={customColorFore} background={customColorBack} />
      </td>
      <td className="table__data table__proxy-type">
        <ContentShimmer size={{ width: 50, height: 32 }} rounded="4px" foreground={customColorFore} background={customColorBack} />
      </td>
    </tr>
  );
};
