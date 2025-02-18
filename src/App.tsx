import { useEffect, useState } from "react";
import UsersTable from "./components/UsersTable";
import type { DateRange } from "react-day-picker";
import Filters from "./components/Filters";
import { isDateWithinRange } from "./lib/isDateWithinRange";
import GridView from "./components/GridView";

export interface User {
  uid: number;
  username: string;
  image: string;
  fullname: string;
  twubric: Twubric;
  join_date: number;
}

export interface Twubric {
  total: number;
  friends: number;
  influence: number;
  chirpiness: number;
}

const App = () => {
  window.document.documentElement.classList.add("dark");

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");
  const [date, setDate] = useState<DateRange>({
    from: new Date(2008, 0, 1),
    to: new Date(),
  });

  const removeUser = (uid: number) => {
    const newUsers = users.filter((user) => {
      return uid !== user.uid;
    });

    setUsers(newUsers);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json"
      );
      const data = (await response.json()) as User[];
      setUsers(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (users.length <= 0) return setFilteredUsers(users);
    const [sortCategory, type] = sortBy.split(":") as [keyof Twubric, string];

    const filtered = users.filter((user) => {
      return isDateWithinRange(user.join_date, date.from!, date.to!);
    });

    filtered.sort((a, b) => {
      return type === "asc"
        ? a.twubric[sortCategory] - b.twubric[sortCategory]
        : b.twubric[sortCategory] - a.twubric[sortCategory];
    });

    setFilteredUsers(filtered);
  }, [date, sortBy, users]);

  return (
    <div className="flex flex-col gap-10 items-center py-10 px-4 md:px-5 lg:px-10">
      <h1 className="text-6xl font-black">Twubric!</h1>
      <div className="h-10 flex border border-border rounded-md overflow-hidden">
        <input
          value="grid"
          type="radio"
          name="view"
          id="grid"
          checked={view === "grid"}
          className="sr-only peer/grid"
          onChange={() => setView("grid")}
        />
        <label
          htmlFor="grid"
          className="peer-checked/grid:bg-secondary h-full flex items-center justify-center px-6 cursor-pointer"
        >
          Grid
        </label>
        <input
          value="table"
          type="radio"
          name="view"
          id="table"
          checked={view === "table"}
          className="sr-only peer/table"
          onChange={() => setView("table")}
        />
        <label
          htmlFor="table"
          className="peer-checked/table:bg-secondary  h-full flex items-center justify-center px-6 cursor-pointer"
        >
          Table
        </label>
      </div>
      <div className="max-w-[1080px] w-full flex flex-col gap-8 items-center">
        <Filters
          sortBy={sortBy}
          date={date}
          setDate={setDate}
          setSortBy={setSortBy}
        />
        {view === "table" ? (
          <UsersTable removeUser={removeUser} users={filteredUsers} />
        ) : (
          <GridView removeUser={removeUser} users={filteredUsers} />
        )}
      </div>
    </div>
  );
};

export default App;
