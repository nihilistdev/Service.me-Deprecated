import * as React from "react";

interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  data?: string[];
  setTab: () => void;
  tab: string;
}

export const Tabs = ({ data, tab, setTab }: TabsProps) => {
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-600 px-4">
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center"
        role="tablist"
      >
        {data?.map((e) => (
          <li className="mr-2" role="presentation">
            <button
              onClick={setTab}
              className={`inline-block p-4 rounded-t-lg border-b-2 ${
                tab === e && "border-blue-700"
              } dark:text-white active:border-blue-700`}
              type="button"
            >
              {e}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
