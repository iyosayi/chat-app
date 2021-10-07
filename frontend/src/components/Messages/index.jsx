import { useContext, useEffect, useRef } from "react";

import { channelMessages } from "../../api/messages";
import { SidebarDetailContext } from "../../context/sidebar";
import { dateHandler } from "../../utils/dateHandler";

const Message = ({ name, image, message, createdAt, keyProp }) => (
  <div className="flex gap-4 md:gap-7 my-5" key={keyProp}>
    <img className="w-10 h-10 object-cover rounded-lg" src={image} />
    <div className="flex flex-col gap-2">
      <div className="text-content-secondaryText">
        <span className="mr-5 font-bold">{name}</span>
        <span>{dateHandler(createdAt)}</span>
      </div>
      <div>{message}</div>
    </div>
  </div>
);

const Messages = () => {
  const { sidebarDetails } = useContext(SidebarDetailContext);
  const channelId = sidebarDetails ? sidebarDetails["_id"] : 0;

  const anchorRef = useRef();

  const { data, error } = channelMessages(channelId);

  useEffect(() => {
    anchorRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <section className="overflow-y-scroll h-full text-white px-10">
      {data &&
        !error &&
        data.map((message, index) => {
          return (
            <Message
              key={index}
              keyProp={`${message.name}causeIcan${message.time}`}
              name={`${message.postedBy.firstName} ${message.postedBy.lastName}`}
              image={message.postedBy.imageUrl}
              message={message.message}
              createdAt={message.createdAt}
            />
          );
        })}
      <div className="w-0 h-0" ref={anchorRef} />
    </section>
  );
};

export default Messages;
