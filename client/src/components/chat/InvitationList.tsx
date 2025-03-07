import { cn } from "../../lib/utils";
import nopic from "../../assets/nopic.jpg";

const mockPendingList = [
  {
    id: "1",
    name: "Raja Das",
    username: "rajadas123",
    status: "Pending",
  },
  {
    id: "2",
    name: "Partha Das",
    username: "parthadas123",
    status: "Pending",
  },
  {
    id: "3",
    name: "Akash Sarkar",
    username: "aku123",
    status: "Pending",
  },
];

function InvitationList() {
  return (
    mockPendingList &&
    mockPendingList.map((pending) => (
      <div
        key={pending.id}
        className={cn(
          "w-[95%] mx-auto mb-1.5 rounded-md flex items-center p-3 cursor-pointer"
        )}
      >
        <div className="relative">
          <img
            src={nopic}
            alt="pending-1"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="ml-4 flex-1 min-w-0">
          <div className="flex-col justify-center items-start">
            <h3 className="font-semibold dark:text-white text-gray-800 truncate">
              {pending.name}
            </h3>
            <span className="dark:text-gray-400 text-gray-800 text-sm">
              @{pending.username}
            </span>
          </div>
        </div>
      </div>
    ))
  );
}

export default InvitationList;
