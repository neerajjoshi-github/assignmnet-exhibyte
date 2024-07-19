import { User } from "@/App";
import { fromUnixTime, format } from "date-fns";
import { Button } from "./ui/button";

interface GridViewProps {
  users: User[];
  removeUser: (uid: number) => void;
}

const GridView: React.FC<GridViewProps> = ({ users, removeUser }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => {
        return (
          <div
            key={user.uid}
            className="border border-border rounded-md flex flex-col gap-2 p-2"
          >
            <div className="flex items-center justify-between px-4">
              <img
                src={user.image}
                alt={user.username}
                className="object-cover rounded-md w-14"
              />
              <div className="flex flex-col">
                <span className="text-sm">{user.fullname}</span>
                <span className="text-xs text-foreground/50">
                  @{user.username}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-2 border-t border-border py-2">
              {Object.entries(user.twubric).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col items-center first:col-span-3"
                >
                  <span className="text-lg font-semibold">{value}</span>
                  <span className="text-foreground/80 capitalize">{key}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border flex items-center justify-between py-2">
              <span>
                {format(fromUnixTime(user.join_date), "dd MMM - yyyy")}
              </span>
              <Button
                onClick={() => removeUser(user.uid)}
                variant="destructive"
                size="sm"
              >
                Remove
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridView;
