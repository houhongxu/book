import dayjs from "dayjs";

const time = dayjs().format("YYYY-MM-DD");

export function App() {
  return <div>im react {time}</div>;
}
