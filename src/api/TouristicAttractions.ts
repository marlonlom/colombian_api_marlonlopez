type TouristicAttractionModel = {
  id: number;
  name: string;
  description: string;
  images: string[];
  latitude: string;
  longitude: string;
  cityId: number;
  city: {
    id: number;
    name: string;
    description: string;
    departmentId: number;
    department: string;
  };
};

type TouristicAttractionGroup = {
  [key: string]: TouristicAttractionsByDeptoCityGroup;
};

export type TouristicAttractionsByDeptoCityGroup = {
  departmentName: string;
  cityName: string;
  attractionsCount: number;
};

function groupByDeptoAndCityData(attractions: TouristicAttractionModel[]) {
  let grouped = attractions.reduce(
    (acc: TouristicAttractionGroup, row: TouristicAttractionModel) => {
      let rowKey = `${row.city.department}/${row.city.name}`;
      if (!acc[rowKey]) {
        acc[rowKey] = {
          cityName: row.city.name,
          departmentName: row.city.department,
          attractionsCount: 1,
        };
      } else {
        acc[rowKey].attractionsCount++;
      }
      return acc;
    },
    {} as TouristicAttractionGroup
  );
  return Object.keys(grouped).map(
    (k) => grouped[k] as TouristicAttractionsByDeptoCityGroup
  );
}

export default async function getTouristicAttractions() {
  let results = await fetch(
    "https://api-colombia.com/api/v1/TouristicAttraction"
  ).then((res) => res.json());

  return groupByDeptoAndCityData(results);
}
