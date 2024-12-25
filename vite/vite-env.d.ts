/// <reference types="vite/client" />

declare module "dayjs" {
  interface Dayjs {
    format(formatStr?: string): string;
    add(
      value: number,
      unit: "day" | "month" | "year" | "hour" | "minute" | "second"
    ): Dayjs;
    subtract(
      value: number,
      unit: "day" | "month" | "year" | "hour" | "minute" | "second"
    ): Dayjs;
    diff(
      date: Dayjs,
      unit?: "day" | "month" | "year" | "hour" | "minute" | "second"
    ): number;
    isBefore(date: Dayjs): boolean;
    isAfter(date: Dayjs): boolean;
    clone(): Dayjs;
  }

  function dayjs(date?: string | number | Date): Dayjs;

  export default dayjs;
}
