export default function JsonTexarea({ treeData }: { treeData: any }) {
  let prettyText = JSON.stringify(treeData, undefined, 7);
  return (
    <div className="relative mb-3" data-twe-input-wrapper-init>
      <textarea
        className="resize-none peer block min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
        id="jsonTextarea"
        rows={25}
        value={prettyText}
        readOnly={true}
      />
    </div>
  );
}
