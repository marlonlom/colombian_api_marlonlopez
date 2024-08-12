"use client";

import getAirports, {
  AirportsByDeptAndCityGroup,
  AirportsByRegionDeptCityAndTypeGroup,
} from "@/api/Airports";
import getPresidents, {
  PresidentsBypoliticalPartyGroup,
} from "@/api/Presidents";
import getTouristicAttractions, {
  TouristicAttractionsByDeptoCityGroup,
} from "@/api/TouristicAttractions";

import TabsContent from "@/components/tabs/TabsContent";
import TabsNavigation from "@/components/tabs/TabsNavigation";
import { useEffect, useState } from "react";

export type ApplicationTabContent = {
  key: string;
  title: string;
  about: string;
  list:
    | PresidentsBypoliticalPartyGroup[]
    | TouristicAttractionsByDeptoCityGroup[]
    | AirportsByDeptAndCityGroup[]
    | AirportsByRegionDeptCityAndTypeGroup[];
  columns: { key: string; label: string }[];
  tree?: any;
};

type ColombiaApiData = {
  presidents: PresidentsBypoliticalPartyGroup[];
  touristicAttractions: TouristicAttractionsByDeptoCityGroup[];
  airports: AirportsByDeptAndCityGroup[];
  airports2: AirportsByRegionDeptCityAndTypeGroup[];
  airports2Tree: any;
};

async function fetchColombiaApiData() {
  return await Promise.allSettled([
    getPresidents(),
    getTouristicAttractions(),
    getAirports(),
  ]).then((results) => {
    return Promise.resolve({
      presidents: results[0].status === "fulfilled" ? results[0].value : [],
      touristicAttractions:
        results[1].status === "fulfilled" ? results[1].value : [],
      airports: results[2].status === "fulfilled" ? results[2].value[0] : [],
      airports2: results[2].status === "fulfilled" ? results[2].value[1] : [],
      airports2Tree:
        results[2].status === "fulfilled" ? results[2].value[2] : {},
    } as ColombiaApiData);
  });
}

const Loading = () => (
  <>
    <main className="content-center bg-white dark:bg-slate-900 dark:text-white rounded-lg mx-4 p-4">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </main>
  </>
);

export default function Home() {
  let [activeTab, setActiveTab] = useState(0);
  let [loading, setLoading] = useState(true);
  let [tabsInformation, setTabsInformation] = useState<ApplicationTabContent[]>(
    []
  );

  useEffect(() => {
    fetchColombiaApiData().then((apiResults) => {
      setTabsInformation([
        {
          key: "tab01",
          title: "Presidents",
          about: "Presidents by political party",
          list: apiResults.presidents,
          columns: [
            { key: "", label: "#" },
            { key: "politicalParty", label: "Political party" },
            { key: "presidentsCount", label: "Presidents count" },
          ],
        },
        {
          key: "tab02",
          title: "Touristic attractions",
          about: "Touristic attractions by department and city",
          list: apiResults.touristicAttractions,
          columns: [
            { key: "", label: "#" },
            { key: "departmentName", label: "Department" },
            { key: "cityName", label: "City" },
            { key: "attractionsCount", label: "Attractions count" },
          ],
        },
        {
          key: "tab03",
          title: "Airports",
          about: "Airports by department and city",
          list: apiResults.airports,
          columns: [
            { key: "", label: "#" },
            { key: "departmentName", label: "Department" },
            { key: "cityName", label: "City" },
            { key: "airportsCount", label: "Airports count" },
          ],
        },
        {
          key: "tab04",
          title: "Airports 2",
          about: "Airports by region, department, city and airport type",
          list: apiResults.airports2,
          columns: [
            { key: "", label: "#" },
            { key: "regionName", label: "Region" },
            { key: "departmentName", label: "Department" },
            { key: "cityName", label: "City" },
            { key: "airportType", label: "Airport type" },
            { key: "airportsCount", label: "Airports count" },
          ],
          tree: apiResults.airports2Tree,
        },
      ] as ApplicationTabContent[]);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="bg-white dark:bg-slate-900 dark:text-white rounded-lg mx-4 p-4">
      <TabsNavigation
        tabsInfo={tabsInformation}
        activeTab={activeTab}
        onTabClicked={setActiveTab}
      />
      <TabsContent tabsInfo={tabsInformation} activeTab={activeTab} />
    </main>
  );
}
