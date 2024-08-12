"use client";
import { ApplicationTabContent } from "@/app/page";
import React from "react";

const TabsNavigation = ({
  activeTab,
  tabsInfo,
  onTabClicked,
}: {
  activeTab: number;
  tabsInfo: ApplicationTabContent[];
  onTabClicked: (tabIndex: number) => void;
}) => (
  <>
    <ul
      key={111}
      role="tablist"
      data-twe-nav-ref
      className="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0"
    >
      {tabsInfo.map((tabb, index) => (
        <li role="presentation" key={`tab-idx-${tabb.key}`}>
          <a
            className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
            role="tab"
            
            onClick={() => onTabClicked(index)}
            aria-controls={tabb.key}
            aria-selected={index === activeTab ? "true" : "false"}
            data-twe-toggle="pill"
            data-twe-target={`#${tabb.key}`}
            data-twe-nav-active={index === activeTab ? "" : undefined}
          >
            {tabb.title}
          </a>
        </li>
      ))}
    </ul>
  </>
);

export default TabsNavigation;
