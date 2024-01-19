import ContentShimmer from "react-content-shimmer";

export const RowSkeleton = () => {
  const customColorFore = "#555555";
  const customColorBack = "#333333";
  
  return (
    <tr className="websites-table__row">
      <td className="websites-table__data">
        <ContentShimmer size={{ width: 20, height: 20 }} rounded="4px" foreground={customColorFore} background={customColorBack} />
      </td>
      <td className="websites-table__data websites-table__url">
        <ContentShimmer size={{ width: 250, height: 32 }} rounded="4px" foreground={customColorFore} background={customColorBack} />
      </td>
      <td className="websites-table__data websites-table__toggle">
        <ContentShimmer size={{ width: 42, height: 24 }} rounded="4px" foreground={customColorFore} background={customColorBack} />
      </td>
    </tr>
  );
};
