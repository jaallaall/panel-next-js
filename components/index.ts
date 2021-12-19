import dynamic from "next/dynamic";

export const nextDynamic = (file: string) =>
  dynamic(() =>
    import(`./${file}`).catch(() => console.log("Error in importing"))
  );
