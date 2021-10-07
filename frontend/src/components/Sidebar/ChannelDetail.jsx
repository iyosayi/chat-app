import { useContext } from "react";
import { SidebarDetailContext } from "../../context/sidebar";

const ChannelDetails = () => {
  const { sidebarDetails, setSidebarDetails } =
    useContext(SidebarDetailContext);

  const { name, description, users } = sidebarDetails;

  console.log("sidebar", users);

  return (
    <div className="px-2">
      <h5 className="font-bold mb-4 break-words">{name.toUpperCase()}</h5>
      <p>{description}</p>

      {users.length > 0 && (
        <>
          <h5 className="font-bold mt-6 mb-4">MEMBERS</h5>

          <div>
            {users.map((user, index) => {
              if (user["firstName"]) {
                return (
                  <div key={index} className="flex gap-4 items-center">
                    <img
                      src={user.imageUrl}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ChannelDetails;
