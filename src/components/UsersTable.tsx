import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fromUnixTime, format } from "date-fns";
import type { User } from "@/App";
import { Button } from "./ui/button";

interface UsersTableProps {
  users: User[];
  removeUser: (uid: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, removeUser }) => {
  return (
    <div className="w-full rounded-lg flex flex-col gap-8">
      <div className="p-4 border border-border rounded-md">
        <Table className="text-center">
          <TableCaption>A list of your followers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead className="text-center">Twubric Score</TableHead>
              <TableHead className="text-center">Friends</TableHead>
              <TableHead className="text-center">Influence</TableHead>
              <TableHead className="text-center">Chirpiness</TableHead>
              <TableHead className="text-center">Join Date</TableHead>
              <TableHead className="text-center">Operations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.uid}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <img
                      className="w-8 aspect-square rounded-full object-cover"
                      src={user.image}
                      alt={user.username}
                    />
                    <span>{user.username}</span>
                  </TableCell>
                  {Object.entries(user.twubric).map(([key, value]) => (
                    <TableCell key={key}>{value}</TableCell>
                  ))}
                  <TableCell>
                    {format(fromUnixTime(user.join_date), "dd MMM - yyyy")}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeUser(user.uid)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;
