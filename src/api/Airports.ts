type AirportModel = {
  id: number;
  name: string;
  iataCode: string;
  oaciCode: string;
  type: string;
  deparmentId: number;
  department: {
    id: number;
    name: string;
    description: string;
    cityCapitalId: number;
    municipalities: number;
    surface: number;
    population: number;
    phonePrefix: string;
    countryId: number;
    regionId: number;
    region: string;
  };
  cityId: number;
  city: {
    id: number;
    name: string;
    description: string;
    surface: number;
    population: number;
    postalCode: string;
    departmentId: number;
    department: string;
  };
  latitude: number;
  longitude: number;
};

type AirportGroup = {
  [key: string]:
    | AirportsByDeptAndCityGroup
    | AirportsByRegionDeptCityAndTypeGroup;
};

export type AirportsByDeptAndCityGroup = {
  departmentName: string;
  cityName: string;
  airportsCount: number;
};
export type AirportsByRegionDeptCityAndTypeGroup = {
  regionName: string;
  departmentName: string;
  cityName: string;
  airportType: string;
  airportsCount: number;
};

function groupAirportsDataByDeptAndCity(
  airports: AirportModel[]
): AirportsByDeptAndCityGroup[] {
  let grouped = airports.reduce((acc: AirportGroup, row: AirportModel) => {
    let rowKey = `${row.department.name}/${row.city.name}`;
    if (!acc[rowKey]) {
      acc[rowKey] = {
        departmentName: row.department.name,
        cityName: row.city.name,
        airportsCount: 1,
      };
    } else {
      acc[rowKey].airportsCount++;
    }
    return acc;
  }, {} as AirportGroup);

  return Object.keys(grouped).map(
    (k) => grouped[k] as AirportsByDeptAndCityGroup
  );
}

function groupAirportsDataByRegionDeptCityAndType(
  airports: AirportModel[]
): AirportsByRegionDeptCityAndTypeGroup[] {
  let grouped = airports.reduce((acc: AirportGroup, row: AirportModel) => {
    let rowKey = `${row.department.region}/${row.department.name}/${row.city.name}/${row.type}`;
    if (!acc[rowKey]) {
      acc[rowKey] = {
        regionName: row.department.region,
        departmentName: row.department.name,
        cityName: row.city.name,
        airportType: row.type,
        airportsCount: 1,
      };
    } else {
      acc[rowKey].airportsCount++;
    }
    return acc;
  }, {} as AirportGroup);

  return Object.keys(grouped).map(
    (k) => grouped[k] as AirportsByRegionDeptCityAndTypeGroup
  );
}

function groupTreeAirportsDataByRegionDeptCityAndType(
  tableData: AirportsByRegionDeptCityAndTypeGroup[]
) {
  let resultData = tableData.reduce(
    (treeData: any, row: AirportsByRegionDeptCityAndTypeGroup) => {
      if (!treeData["region"]) {
        treeData["region"] = {};
      }
      if (!treeData["region"][row.regionName ?? ""]) {
        treeData["region"][row.regionName ?? ""] = { ["departamento"]: {} };
      }
      if (
        !treeData["region"][row.regionName ?? ""]["departamento"][
          row.departmentName
        ]
      ) {
        treeData["region"][row.regionName ?? ""]["departamento"][
          row.departmentName
        ] = { ["ciudad"]: {} };
      }
      if (
        !treeData["region"][row.regionName ?? ""]["departamento"][
          row.departmentName
        ]["ciudad"][row.cityName]
      ) {
        treeData["region"][row.regionName ?? ""]["departamento"][
          row.departmentName
        ]["ciudad"][row.cityName] = { ["tipo"]: {} };
      }
      treeData["region"][row.regionName ?? ""]["departamento"][
        row.departmentName
      ]["ciudad"][row.cityName]["tipo"][row.airportType] = row.airportsCount;

      return treeData;
    },
    {}
  );
  return resultData;
}

export default async function getAirports() {
  let results = await fetch("https://api-colombia.com/api/v1/Airport").then(
    (res) => res.json()
  );

  let groupedAirportsDataByRegionDeptCityAndType =
    groupAirportsDataByRegionDeptCityAndType(results);

  return [
    groupAirportsDataByDeptAndCity(results),
    groupedAirportsDataByRegionDeptCityAndType,
    groupTreeAirportsDataByRegionDeptCityAndType(
      groupedAirportsDataByRegionDeptCityAndType
    ),
  ];
}
