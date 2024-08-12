type PresidentModel = {
  id: number;
  image: string;
  name: string;
  lastName: string;
  startPeriodDate: Date;
  endPeriodDate: Date;
  politicalParty: string;
  description: string;
};

type PresidentsGroup = {
  [key: string]: { count: number };
};

export type PresidentsBypoliticalPartyGroup = {
  politicalParty: string;
  presidentsCount: number;
};

function groupPresidentsData(
  presidents: PresidentModel[]
): PresidentsBypoliticalPartyGroup[] {
  let grouped = presidents.reduce(
    (acc: PresidentsGroup, row: PresidentModel) => {
      if (!acc[row.politicalParty]) {
        acc[row.politicalParty] = { count: 1 };
      } else {
        acc[row.politicalParty].count++;
      }
      return acc;
    },
    {} as PresidentsGroup
  );
  return Object.keys(grouped)
    .map(
      (k) =>
        ({
          politicalParty: k,
          presidentsCount: grouped[k].count,
        } as PresidentsBypoliticalPartyGroup)
    )
    .sort((a, b) => b.presidentsCount - a.presidentsCount);
}

export default async function getPresidents() {
  let results = await fetch("https://api-colombia.com/api/v1/President").then(
    (res) => res.json()
  );

  return groupPresidentsData(results);
}
