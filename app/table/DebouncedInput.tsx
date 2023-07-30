import {useMemo, useState} from "react";
import {useDebouncedCallback} from "use-debounce";

export const DebouncedInput = (
  {
    value: initialValue,
    onChange,
    debounce = 500,
    leftIcon,
    ...props
  }) => {
  const [value, setValue] = useState(initialValue || "");
  const debouncedCallback = useDebouncedCallback(
    (value) => onChange(value),
    debounce
  );

  useMemo(() => setValue(initialValue), [initialValue]);

  return (
    <div className="py-3">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedCallback(e.target.value);
        }}
        className="mt-2 outline-0 focus:outline-1   placeholder-[#515151] text-gray-600 block w-full h-11  text-sm rounded p-2  border border-slate-300 px-4"
        {...props}
      />
    </div>
  );
};