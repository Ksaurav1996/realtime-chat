// import React from 'react'
// import { useSelector } from 'react-redux'
// import ScrollableFeed from "react-scrollable-feed"
// import { isSameSender, isSameSenderMargin, isSameUser, isLastMessage } from '../utils/logics'
// // import { Tooltip } from "@chakra-ui/tooltip";
// // import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip, Avatar } from "@chakra-ui/react";
// import "../pages/home.css"
// function MessageHistory({ messages }) {
//   const activeUser = useSelector((state) => state.activeUser)

//   return (
//     <>
//       <ScrollableFeed className='scrollbar-hide'>
//         {messages &&
//           messages.map((m, i) => (

//             <div className='flex items-center gap-x-[6px]' key={m._id} >
//               {(isSameSender(messages, m, i, activeUser.id) ||
//                 isLastMessage(messages, i, activeUser.id)) && (
//                   <Tooltip label={m.sender?.name} placement="bottom-start" hasArrow>
//                     <Avatar
//                       style={{ width: "32px", height: "32px" }}
//                       mt="43px"
//                       mr={1}

//                       cursor="pointer"
//                       name={m.sender?.name}
//                       src={m.sender?.profilePic}
//                       borderRadius="25px"
//                     />
//                   </Tooltip>

//                 )}
//               <span className='tracking-wider text-[15px]  font-medium'
//                 style={{
//                   backgroundColor: `${m.sender._id === activeUser.id ? "#268d61" : "#f0f0f0"
//                     }`,
//                   marginLeft: isSameSenderMargin(messages, m, i, activeUser.id),
//                   marginTop: isSameUser(messages, m, i, activeUser.id) ? 3 : 10,
//                   borderRadius: `${m.sender._id === activeUser.id ? "10px 10px 0px 10px" : "10px 10px 10px 0"}`,
//                   padding: "10px 18px",
//                   maxWidth: "460px",
//                   color: `${m.sender._id === activeUser.id ? "#ffff" : "#848587"}`
//                 }}
//               >
//                 {m.message}
//               </span>
//             </div>
//           ))
//         }

//       </ScrollableFeed >
//     </>
//   )
// }

// export default MessageHistory
import React from 'react'
import { useSelector } from 'react-redux'
import ScrollableFeed from "react-scrollable-feed"
import { isSameSender, isSameSenderMargin, isSameUser, isLastMessage } from '../utils/logics'
import "../pages/home.css"

function MessageHistory({ messages }) {
  const activeUser = useSelector((state) => state.activeUser)

  return (
    <>
      <ScrollableFeed className='scrollbar-hide'>
        {messages && messages.map((m, i) => (
          <div className='flex items-center gap-x-[6px]' key={m._id}>
            {(isSameSender(messages, m, i, activeUser.id) || isLastMessage(messages, i, activeUser.id)) && (
              <div className="relative group flex flex-col items-center mr-2">
                <img
                  src={m.sender?.profilePic}
                  alt={m.sender?.name}
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <span className="absolute bottom-[-24px] text-xs bg-black text-white px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {m.sender?.name}
                </span>
              </div>
            )}
            <span className='tracking-wider text-[15px] font-medium'
              style={{
                backgroundColor: `${m.sender._id === activeUser.id ? "#268d61" : "#f0f0f0"}`,
                marginLeft: isSameSenderMargin(messages, m, i, activeUser.id),
                marginTop: isSameUser(messages, m, i, activeUser.id) ? 3 : 10,
                borderRadius: `${m.sender._id === activeUser.id ? "10px 10px 0px 10px" : "10px 10px 10px 0"}`,
                padding: "10px 18px",
                maxWidth: "460px",
                color: `${m.sender._id === activeUser.id ? "#fff" : "#848587"}`
              }}
            >
              {m.message}
            </span>
          </div>
        ))}
      </ScrollableFeed>
    </>
  )
}

export default MessageHistory

