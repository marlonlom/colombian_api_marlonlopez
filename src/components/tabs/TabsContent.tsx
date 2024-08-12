"use client";
import React from "react";
import { ApplicationTabContent } from "@/app/page";
import DataTable from "@/components/tables/DataTable";
import JsonTexarea from "../textareas/JsonTexarea";

const TabTreeOrTable = ({ tabb }: { tabb: ApplicationTabContent }) => {
  if (tabb.tree) {
    return <JsonTexarea treeData={tabb.tree} />;
  }
  return <DataTable columns={tabb.columns} list={tabb.list} />;
};

const TabsContent = ({
  activeTab,
  tabsInfo,
}: {
  activeTab: number;
  tabsInfo: ApplicationTabContent[];
}) => (
  <>
    <div className="mb-6">
      {tabsInfo.map((tabb, index) => (
        <div
          key={`tabc-${tabb.key}`}
          className={`${
            index !== activeTab ? "hidden" : ""
          } opacity-100 transition-opacity duration-150 ease-linear`}
          id={tabb.key}
          role="tabpanel"
          aria-labelledby={tabb.key}
          data-twe-tab-active={index === activeTab ? "" : undefined}
        >
          <h6 className="font-semibold">{tabb.about}</h6>
          <br />
          <hr />
          <br />
          <TabTreeOrTable tabb={tabb} />
        </div>
      ))}
    </div>
  </>
);

export default TabsContent;
