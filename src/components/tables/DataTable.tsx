"use client";
import {
  AirportsByDeptAndCityGroup,
  AirportsByRegionDeptCityAndTypeGroup,
} from "@/api/Airports";
import { PresidentsBypoliticalPartyGroup } from "@/api/Presidents";
import { TouristicAttractionsByDeptoCityGroup } from "@/api/TouristicAttractions";

function DataTableBody({
  index,
  row,
}: {
  index: number;
  row:
    | PresidentsBypoliticalPartyGroup
    | TouristicAttractionsByDeptoCityGroup
    | AirportsByDeptAndCityGroup
    | AirportsByRegionDeptCityAndTypeGroup;
}) {
  if ("presidentsCount" in row) {
    return (
      <>
        <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
        <td className="whitespace-nowrap px-6 py-4">{row.politicalParty}</td>
        <td className="whitespace-nowrap px-6 py-4">{row.presidentsCount}</td>
      </>
    );
  }
  if ("attractionsCount" in row) {
    return (
      <>
        <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
        <td className="whitespace-nowrap px-6 py-4">{row.departmentName}</td>
        <td className="whitespace-nowrap px-6 py-4">{row.cityName}</td>
        <td className="whitespace-nowrap px-6 py-4">{row.attractionsCount}</td>
      </>
    );
  }
  if ("airportType" in row && "regionName" in row && "airportsCount" in row) {
    return (
      <>
        <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
        <td className="whitespace-nowrap px-6 py-4">{row.regionName}</td>
        <td className="whitespace-nowrap px-6 py-4">{row.departmentName}</td>
        <td className="whitespace-nowrap px-6 py-4">{row.cityName}</td>
        <td className="whitespace-nowrap px-6 py-4">{row.airportType}</td>
        <td className="whitespace-nowrap px-6 py-4">{row.airportsCount}</td>
      </>
    );
  }
  return (
    <>
      <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
      <td className="whitespace-nowrap px-6 py-4">{row.departmentName}</td>
      <td className="whitespace-nowrap px-6 py-4">{row.cityName}</td>
      <td className="whitespace-nowrap px-6 py-4">{row.airportsCount}</td>
    </>
  );
}

const DataTable = ({
  columns,
  list,
}: {
  columns: { key: string; label: string }[];
  list:
    | PresidentsBypoliticalPartyGroup[]
    | TouristicAttractionsByDeptoCityGroup[]
    | AirportsByDeptAndCityGroup[]
    | AirportsByRegionDeptCityAndTypeGroup[];
}) => (
  <div className="flex flex-col h-dvh">
    <div
      className="overflow-x-auto sm:-mx-6 lg:-mx-8"
      style={{
        height: 600,
      }}
    >
      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-x">
          <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
            <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
              <tr>
                {columns.map((tc, index) => (
                  <th
                    key={`dtcol-${tc.key === "" ? index : tc.key}`}
                    scope="col"
                    className="px-6 py-4"
                  >
                    {tc.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((trow, index) => (
                <tr
                  key={`dtrow-${index}`}
                  className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"
                >
                  <DataTableBody row={trow} index={index + 1} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default DataTable;
