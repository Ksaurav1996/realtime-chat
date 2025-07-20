// import React, { useState } from 'react'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { searchUsers, validUser } from '../apis/auth'
// import { setActiveUser } from '../redux/activeUserSlice'
// import { RiNotificationBadgeFill } from "react-icons/ri"
// import { BsSearch } from "react-icons/bs"
// import { BiNotification } from "react-icons/bi"
// import { IoIosArrowDown } from "react-icons/io"
// import { setShowNotifications, setShowProfile } from '../redux/profileSlice'
// import Chat from './Chat'
// import Profile from "../components/Profile"
// import { acessCreate } from "../apis/chat.js"
// import "./home.css"
// import { fetchChats, setNotifications } from '../redux/chatsSlice'
// import { getSender } from '../utils/logics'
// import { setActiveChat } from '../redux/chatsSlice'
// import Group from '../components/Group'
// import Contacts from '../components/Contacts'
// import { Effect } from "react-notification-badge"
// // import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge';
// import NotificationBadge from 'react-notification-badge';
// import Search from '../components/group/Search'
// function Home() {
//   const dispatch = useDispatch()
//   const { showProfile, showNotifications } = useSelector((state) => state.profile)
//   const { notifications } = useSelector((state) => state.chats)
//   const { activeUser } = useSelector((state) => state)
//   const [searchResults, setSearchResults] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [search, setSearch] = useState("")

//   const handleSearch = async (e) => {
//     setSearch(e.target.value)
//   }
//   const handleClick = async (e) => {
//     await acessCreate({ userId: e._id })
//     dispatch(fetchChats())
//     setSearch("")
//   }
//   useEffect(() => {
//     const searchChange = async () => {
//       setIsLoading(true)
//       const { data } = await searchUsers(search)
//       setSearchResults(data)
//       setIsLoading(false)
//     }
//     searchChange()
//   }, [search])
//   useEffect(() => {
//     const isValid = async () => {
//       const data = await validUser()

//       const user = {
//         id: data?.user?._id,
//         email: data?.user?.email,
//         profilePic: data?.user?.profilePic,
//         bio: data?.user?.bio,
//         name: data?.user?.name
//       }
//       dispatch(setActiveUser(user))
//     }
//     isValid()

//   }, [dispatch, activeUser])


//   return (
//     <>

//       <div className="bg-[#282C35!] scrollbar-hide z-10 h-[100vh]  lg:w-[90%] lg:mx-auto overflow-y-hidden shadow-2xl">

//         <div className='flex'>
//           {
//             !showProfile ?
//               <div className="md:flex md:flex-col min-w-[360px] h-[100vh] md:h-[98.6vh] bg-[#ffff] relative">

//                 <div className='h-[61px] px-4'>
//                   <div className='flex'>
//                     <a className='flex items-center relative  -top-4 block h-[90px]' href='/'>

//                       <h3 className='text-[20px] text-[#1f2228] font-body font-extrabold tracking-wider'>Messages</h3>
//                     </a>
//                   </div>
//                   <div className='absolute top-4 right-5 flex items-center gap-x-3'>
//                     <button onClick={() => dispatch(setShowNotifications(!showNotifications))}>
//                       <NotificationBadge
//                         count={notifications.length}
//                         effect={Effect.SCALE}
//                         style={{ width: "15px", height: "15px", fontSize: "9px", padding: "4px 2px 2px 2px" }}
//                       />
//                       {
//                         showNotifications ? <RiNotificationBadgeFill style={{ width: "25px", height: "25px", color: "#319268" }} /> : <BiNotification style={{ color: "#319268", width: "25px", height: "25px" }} />
//                       }

//                     </button>
//                     <div className={`${showNotifications ? "overflow-y-scroll scrollbar-hide tracking-wide absolute top-10 -left-32 z-10 w-[240px] bg-[#fafafa] px-4 py-2 shadow-2xl" : "hidden"}`}>
//                       <div className='text-[13px]'>

//                         {!notifications.length && "No new messages"}
//                       </div>
//                       {
//                         notifications.map((e, index) => {
//                           return (
//                             <div onClick={() => {
//                               dispatch(setActiveChat(e.chatId))
//                               dispatch(setNotifications(notifications.filter((data) => data !== e)))

//                             }} key={index} className='text-[12.5px] text-black px-2 cursor-pointer' >

//                               {e.chatId.isGroup ? `New Message in ${e.chatId.chatName}` : `New Message from ${getSender(activeUser, e.chatId.users)}`}
//                             </div>

//                           )

//                         })
//                       }
//                     </div>
//                     <button onClick={() => dispatch(setShowProfile(true))} className='flex items-center gap-x-1 relative'>
//                       <img className='w-[28px] h-[28px] rounded-[25px]' src={activeUser?.profilePic} alt="" />
//                       <IoIosArrowDown style={{ color: "#616c76", height: "14px", width: "14px" }} />
//                     </button>
//                   </div>
//                 </div>

//                 <div>

//                   <div className='-mt-6 relative pt-6 px-4'>
//                     <form onSubmit={(e) => e.preventDefault()}>

//                       <input onChange={handleSearch} className='w-[99.5%] bg-[#f6f6f6] text-[#111b21] tracking-wider pl-9 py-[8px] rounded-[9px] outline-0' type="text" name="search" placeholder="Search" />

//                     </form>

//                     <div className='absolute top-[36px] left-[27px]'>
//                       <BsSearch style={{ color: "#c4c4c5" }} />
//                     </div>
//                     <Group />

//                     <div style={{ display: search ? "" : "none" }} className='h-[100vh] absolute z-10 w-[100%] left-[0px] top-[70px] bg-[#fff] flex flex-col gap-y-3 pt-3 px-4'>
//                       <Search searchResults={searchResults} isLoading={isLoading} handleClick={handleClick} search={search} />

//                     </div>
//                   </div>


//                   <Contacts />


//                 </div>


//               </div> : <Profile className="min-w-[100%] sm:min-w-[360px] h-[100vh] bg-[#fafafa] shodow-xl relative" />
//           }
//           <Chat className="chat-page relative lg:w-[100%] h-[100vh] bg-[#fafafa]" />




//         </div>
//       </div >

//     </>
//   )
// }

// export default Home
// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { searchUsers, validUser } from '../apis/auth'
// import { setActiveUser } from '../redux/activeUserSlice'
// import { RiNotificationBadgeFill } from "react-icons/ri"
// import { BsSearch } from "react-icons/bs"
// import { BiNotification } from "react-icons/bi"
// import { IoIosArrowDown } from "react-icons/io"
// import { setShowNotifications, setShowProfile } from '../redux/profileSlice'
// import Chat from './Chat'
// import Profile from "../components/Profile"
// import { acessCreate } from "../apis/chat.js"
// import "./home.css"
// import { fetchChats, setNotifications } from '../redux/chatsSlice'
// import { getSender } from '../utils/logics'
// import { setActiveChat } from '../redux/chatsSlice'
// import Group from '../components/Group'
// import Contacts from '../components/Contacts'
// import NotificationBadge, { Effect } from 'react-notification-badge'
// import Search from '../components/group/Search'

// function Home() {
//   const dispatch = useDispatch()
//   const { showProfile, showNotifications } = useSelector((state) => state.profile)
//   const { notifications, activeChat } = useSelector((state) => state.chats)
//   const { activeUser } = useSelector((state) => state)
//   const [searchResults, setSearchResults] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [search, setSearch] = useState("")
//   const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)

//   const handleSearch = async (e) => {
//     setSearch(e.target.value)
//   }

//   const handleClick = async (e) => {
//     await acessCreate({ userId: e._id })
//     dispatch(fetchChats())
//     setSearch("")
//   }

//   useEffect(() => {
//     const isValid = async () => {
//       const data = await validUser()
//       const user = {
//         id: data?.user?._id,
//         email: data?.user?.email,
//         profilePic: data?.user?.profilePic,
//         bio: data?.user?.bio,
//         name: data?.user?.name
//       }
//       dispatch(setActiveUser(user))
//     }
//     isValid()
//   }, [dispatch])

//   useEffect(() => {
//     const searchChange = async () => {
//       setIsLoading(true)
//       const { data } = await searchUsers(search)
//       setSearchResults(data)
//       setIsLoading(false)
//     }
//     if (search) searchChange()
//   }, [search])

//   useEffect(() => {
//     // Open chat on mobile when a chat becomes active
//     if (window.innerWidth < 1024 && activeChat) {
//       setIsMobileChatOpen(true)
//     }
//   }, [activeChat])

//   return (
//     <div className="bg-[#f7f9fb] h-[100vh] lg:w-[90%] lg:mx-auto shadow-2xl overflow-hidden">
//       <div className="flex h-full">

//         {/* Sidebar */}
//         {!showProfile && (
//           <div className={`flex flex-col w-full md:w-[360px] bg-white h-[100vh] md:h-[98.6vh]
//            ${isMobileChatOpen ? 'hidden' : 'block'} lg:block bg-[#e6f0fa]`}>
            
//             {/* Header */}
//             <div className='h-[61px] px-4'>
//               <div className='flex justify-between items-center'>
//                 <a className="text-xl font-extrabold tracking-wide text-[#1f2228]" href="/">Messages</a>
//                 <div className="flex gap-3 items-center">
//                   <button onClick={() => dispatch(setShowNotifications(!showNotifications))}>
//                     <NotificationBadge
//                       count={notifications.length}
//                       effect={Effect.SCALE}
//                       style={{
//                         width: "15px",
//                         height: "15px",
//                         fontSize: "9px",
//                         padding: "4px 2px 2px 2px"
//                       }}
//                     />
//                     {
//                       showNotifications
//                         ? <RiNotificationBadgeFill className="text-[#319268] w-6 h-6" />
//                         : <BiNotification className="text-[#319268] w-6 h-6" />
//                     }
//                   </button>
//                   {/* Profile button */}
//                   <button onClick={() => dispatch(setShowProfile(true))} className="flex items-center gap-1">
//                     <img className="w-7 h-7 rounded-full" src={activeUser?.profilePic} alt="User" />
//                     <IoIosArrowDown className="text-gray-500 h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Notification Panel */}
//               {
//                 showNotifications &&
//                 <div className="absolute top-12 left-4 z-40 w-[240px] rounded bg-[#fafafa] px-4 py-3 shadow-2xl">
//                   {
//                     notifications.length === 0
//                       ? <p className="text-sm text-gray-600">No new messages</p>
//                       : notifications.map((e, i) => (
//                         <div key={i} onClick={() => {
//                           dispatch(setActiveChat(e.chatId))
//                           dispatch(setNotifications(notifications.filter((n) => n !== e)))
//                         }} className="cursor-pointer text-[13px] text-black mb-1 hover:underline">
//                           {e.chatId.isGroup
//                             ? `New message in ${e.chatId.chatName}`
//                             : `New message from ${getSender(activeUser, e.chatId.users)}`}
//                         </div>
//                       ))
//                   }
//                 </div>
//               }
//             </div>

//             {/* Search Bar */}
//             {/* <div className='px-4 pt-2'>
//               <form onSubmit={(e) => e.preventDefault()} className="relative">
//                 <input
//                   onChange={handleSearch}
//                   className='w-full bg-[#f6f6f6] text-[#111b21] pl-9 py-2 rounded-md focus:outline-none'
//                   type="text"
//                   placeholder="Search"
//                 />
//                 <BsSearch className="absolute top-2.5 left-3 text-gray-400" />
//               </form>
//               <Group />
//               {
//                 search &&
//                 <div className='absolute top-[70px] w-full h-full bg-white z-10 px-4 pt-3 overflow-y-auto'>
//                   <Search searchResults={searchResults} isLoading={isLoading} handleClick={handleClick} search={search} />
//                 </div>
//               }
//             </div> */}
//             {/* Search Bar */}
// <div className='px-4 pt-2 relative'>
//   <form onSubmit={(e) => e.preventDefault()} className="relative">
//     <input
//       onChange={handleSearch}
//       value={search}
//       className='w-full bg-[#f6f6f6] text-[#111b21] pl-9 py-2 rounded-md focus:outline-none'
//       type="text"
//       placeholder="Search"
//     />
//     <BsSearch className="absolute top-2.5 left-3 text-gray-400" />
//   </form>

//   <Group />

//   {/* SEARCH RESULTS OVERLAY */}
//   {
//     search && (
//       <div
//         className="absolute left-0 right-0 top-[48px] bg-white shadow-lg rounded-b-md border border-gray-200 z-30 max-h-[240px] overflow-y-auto"
//         style={{ minWidth: "100%" }}
//       >
//         <Search
//           searchResults={searchResults}
//           isLoading={isLoading}
//           search={search}
//           handleClick={async (user) => {
//             await handleClick(user)
//             setSearch("") // clear after selection
//           }}
//         />
//       </div>
//     )
//   }
// </div>



//             {/* Contact List */}
//             <div className="flex-grow overflow-y-auto px-4 pb-4">
//               <Contacts />
//             </div>

//           </div>
//         )}

//         {/* Profile View */}
//         {showProfile && (
//           <Profile className="w-full sm:w-[360px] h-[100vh] bg-[#fafafa] relative" />
//         )}

//         {/* Chat View */}
//         <div className={`${isMobileChatOpen ? 'block' : 'hidden'} lg:block w-full h-full`}>
//           <Chat
//             className="chat-page w-full h-[100vh] bg-[#f6fafb]"
//             onBack={() => setIsMobileChatOpen(false)}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home
// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { searchUsers, validUser } from '../apis/auth'
// import { setActiveUser } from '../redux/activeUserSlice'
// import { RiNotificationBadgeFill } from "react-icons/ri"
// import { BsSearch } from "react-icons/bs"
// import { BiNotification } from "react-icons/bi"
// import { IoIosArrowDown } from "react-icons/io"
// import { setShowNotifications, setShowProfile } from '../redux/profileSlice'
// import Chat from './Chat'
// import Profile from "../components/Profile"
// import { acessCreate } from "../apis/chat.js"
// import "./home.css"
// import { fetchChats, setNotifications } from '../redux/chatsSlice'
// import { getSender } from '../utils/logics'
// import { setActiveChat } from '../redux/chatsSlice'
// import Group from '../components/Group'
// import Contacts from '../components/Contacts'
// // Removed NotificationBadge import
// import Badge from '@mui/material/Badge'
// import Search from '../components/group/Search'

// function Home() {
//   const dispatch = useDispatch()
//   const { showProfile, showNotifications } = useSelector((state) => state.profile)
//   const { notifications, activeChat } = useSelector((state) => state.chats)
//   const { activeUser } = useSelector((state) => state)
//   const [searchResults, setSearchResults] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [search, setSearch] = useState("")
//   const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)

//   const handleSearch = async (e) => {
//     setSearch(e.target.value)
//   }

//   const handleClick = async (e) => {
//     await acessCreate({ userId: e._id })
//     dispatch(fetchChats())
//     setSearch("")
//   }

//   useEffect(() => {
//     const isValid = async () => {
//       const data = await validUser()
//       const user = {
//         id: data?.user?._id,
//         email: data?.user?.email,
//         profilePic: data?.user?.profilePic,
//         bio: data?.user?.bio,
//         name: data?.user?.name
//       }
//       dispatch(setActiveUser(user))
//     }
//     isValid()
//   }, [dispatch])

//   useEffect(() => {
//     const searchChange = async () => {
//       setIsLoading(true)
//       const { data } = await searchUsers(search)
//       setSearchResults(data)
//       setIsLoading(false)
//     }
//     if (search) searchChange()
//   }, [search])

//   useEffect(() => {
//     // Open chat on mobile when a chat becomes active
//     if (window.innerWidth < 1024 && activeChat) {
//       setIsMobileChatOpen(true)
//     }
//   }, [activeChat])

//   return (
//     <div className="bg-[#f7f9fb] h-[100vh] lg:w-[90%] lg:mx-auto shadow-2xl overflow-hidden">
//       <div className="flex h-full">

//         {/* Sidebar */}
//         {!showProfile && (
//           <div className={`flex flex-col w-full md:w-[360px] bg-white h-[100vh] md:h-[98.6vh]
//            ${isMobileChatOpen ? 'hidden' : 'block'} lg:block bg-[#e6f0fa]`}>

//             {/* Header */}
//             <div className='h-[61px] px-4'>
//               <div className='flex justify-between items-center'>
//                 <a className="text-xl font-extrabold tracking-wide text-[#1f2228]" href="/">Messages</a>
//                 <div className="flex gap-3 items-center">
//                   <button onClick={() => dispatch(setShowNotifications(!showNotifications))} className="relative">
//                     <Badge
//                       badgeContent={notifications.length}
//                       color="primary"
//                       overlap="circular"
//                       sx={{
//                         "& .MuiBadge-badge": {
//                           top: -6,
//                           right: -6,
//                           minWidth: 16, height: 16, fontSize: 10,
//                         }
//                       }}
//                       // Hide badge if there are no notifications:
//                       invisible={notifications.length === 0}
//                     >
//                       {showNotifications
//                         ? <RiNotificationBadgeFill className="text-[#319268] w-6 h-6" />
//                         : <BiNotification className="text-[#319268] w-6 h-6" />
//                       }
//                     </Badge>
//                   </button>
//                   {/* Profile button */}
//                   <button onClick={() => dispatch(setShowProfile(true))} className="flex items-center gap-1">
//                     <img className="w-7 h-7 rounded-full" src={activeUser?.profilePic} alt="User" />
//                     <IoIosArrowDown className="text-gray-500 h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Notification Panel */}
//               {
//                 showNotifications &&
//                 <div className="absolute top-12 left-4 z-40 w-[240px] rounded bg-[#fafafa] px-4 py-3 shadow-2xl">
//                   {
//                     notifications.length === 0
//                       ? <p className="text-sm text-gray-600">No new messages</p>
//                       : notifications.map((e, i) => (
//                         <div key={i} onClick={() => {
//                           dispatch(setActiveChat(e.chatId))
//                           dispatch(setNotifications(notifications.filter((n) => n !== e)))
//                         }} className="cursor-pointer text-[13px] text-black mb-1 hover:underline">
//                           {e.chatId.isGroup
//                             ? `New message in ${e.chatId.chatName}`
//                             : `New message from ${getSender(activeUser, e.chatId.users)}`}
//                         </div>
//                       ))
//                   }
//                 </div>
//               }
//             </div>

//             {/* Search Bar */}
//             <div className='px-4 pt-2 relative'>
//               <form onSubmit={(e) => e.preventDefault()} className="relative">
//                 <input
//                   onChange={handleSearch}
//                   value={search}
//                   className='w-full bg-[#f6f6f6] text-[#111b21] pl-9 py-2 rounded-md focus:outline-none'
//                   type="text"
//                   placeholder="Search"
//                 />
//                 <BsSearch className="absolute top-2.5 left-3 text-gray-400" />
//               </form>

//               <Group />

//               {/* SEARCH RESULTS OVERLAY */}
//               {
//                 search && (
//                   <div
//                     className="absolute left-0 right-0 top-[48px] bg-white shadow-lg rounded-b-md border border-gray-200 z-30 max-h-[240px] overflow-y-auto"
//                     style={{ minWidth: "100%" }}
//                   >
//                     <Search
//                       searchResults={searchResults}
//                       isLoading={isLoading}
//                       search={search}
//                       handleClick={async (user) => {
//                         await handleClick(user)
//                         setSearch("") // clear after selection
//                       }}
//                     />
//                   </div>
//                 )
//               }
//             </div>

//             {/* Contact List */}
//             <div className="flex-grow overflow-y-auto px-4 pb-4">
//               <Contacts />
//             </div>

//           </div>
//         )}

//         {/* Profile View */}
//         {showProfile && (
//           <Profile className="w-full sm:w-[360px] h-[100vh] bg-[#fafafa] relative" />
//         )}

//         {/* Chat View */}
//         <div className={`${isMobileChatOpen ? 'block' : 'hidden'} lg:block w-full h-full`}>
//           <Chat
//             className="chat-page w-full h-[100vh] bg-[#f6fafb]"
//             onBack={() => setIsMobileChatOpen(false)}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home
// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { searchUsers, validUser } from '../apis/auth'
// import { setActiveUser } from '../redux/activeUserSlice'
// import { RiNotificationBadgeFill } from "react-icons/ri"
// import { BsSearch } from "react-icons/bs"
// import { BiNotification } from "react-icons/bi"
// import { IoIosArrowDown } from "react-icons/io"
// import { setShowNotifications, setShowProfile } from '../redux/profileSlice'
// import Chat from './Chat'
// import Profile from "../components/Profile"
// import { acessCreate } from "../apis/chat.js"
// import "./home.css"
// import { fetchChats, setNotifications } from '../redux/chatsSlice'
// import { getSender } from '../utils/logics'
// import { setActiveChat } from '../redux/chatsSlice'
// import Group from '../components/Group'
// import Contacts from '../components/Contacts'
// import Search from '../components/group/Search'

// // ✅ Custom Badge component (Tailwind)
// const Badge = ({ count, children }) => (
//   <div className="relative inline-block">
//     {children}
//     {count > 0 && (
//       <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">
//         {count}
//       </span>
//     )}
//   </div>
// )

// function Home() {
//   const dispatch = useDispatch()
//   const { showProfile, showNotifications } = useSelector((state) => state.profile)
//   const { notifications, activeChat } = useSelector((state) => state.chats)
//   const { activeUser } = useSelector((state) => state)
//   const [searchResults, setSearchResults] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [search, setSearch] = useState("")
//   const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)

//   const handleSearch = async (e) => {
//     setSearch(e.target.value)
//   }

//   const handleClick = async (e) => {
//     await acessCreate({ userId: e._id })
//     dispatch(fetchChats())
//     setSearch("")
//   }

//   useEffect(() => {
//     const isValid = async () => {
//       const data = await validUser()
//       const user = {
//         id: data?.user?._id,
//         email: data?.user?.email,
//         profilePic: data?.user?.profilePic,
//         bio: data?.user?.bio,
//         name: data?.user?.name
//       }
//       dispatch(setActiveUser(user))
//     }
//     isValid()
//   }, [dispatch])

//   useEffect(() => {
//     const searchChange = async () => {
//       setIsLoading(true)
//       const { data } = await searchUsers(search)
//       setSearchResults(data)
//       setIsLoading(false)
//     }
//     if (search) searchChange()
//   }, [search])

//   useEffect(() => {
//     if (window.innerWidth < 1024 && activeChat) {
//       setIsMobileChatOpen(true)
//     }
//   }, [activeChat])

//   return (
//     <div className="bg-[#f7f9fb] h-[100vh] lg:w-[90%] lg:mx-auto shadow-2xl overflow-hidden">
//       <div className="flex h-full">

//         {/* Sidebar */}
//         {!showProfile && (
//           <div className={`flex flex-col w-full md:w-[360px] bg-white h-[100vh] md:h-[98.6vh]
//            ${isMobileChatOpen ? 'hidden' : 'block'} lg:block bg-[#e6f0fa]`}>

//             {/* Header */}
//             <div className='h-[61px] px-4'>
//               <div className='flex justify-between items-center'>
//                 <a className="text-xl font-extrabold tracking-wide text-[#1f2228]" href="/">Messages</a>
//                 <div className="flex gap-3 items-center">
//                   {/* Notification */}
//                   <button onClick={() => dispatch(setShowNotifications(!showNotifications))} className="relative">
//                     <Badge count={notifications.length}>
//                       {showNotifications
//                         ? <RiNotificationBadgeFill className="text-[#319268] w-6 h-6" />
//                         : <BiNotification className="text-[#319268] w-6 h-6" />
//                       }
//                     </Badge>
//                   </button>

//                   {/* Profile */}
//                   <button onClick={() => dispatch(setShowProfile(true))} className="flex items-center gap-1">
//                     <img className="w-7 h-7 rounded-full" src={activeUser?.profilePic} alt="User" />
//                     <IoIosArrowDown className="text-gray-500 h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Notification Panel */}
//               {
//                 showNotifications &&
//                 <div className="absolute top-12 left-4 z-40 w-[240px] rounded bg-[#fafafa] px-4 py-3 shadow-2xl">
//                   {
//                     notifications.length === 0
//                       ? <p className="text-sm text-gray-600">No new messages</p>
//                       : notifications.map((e, i) => (
//                         <div key={i} onClick={() => {
//                           dispatch(setActiveChat(e.chatId))
//                           dispatch(setNotifications(notifications.filter((n) => n !== e)))
//                         }} className="cursor-pointer text-[13px] text-black mb-1 hover:underline">
//                           {e.chatId.isGroup
//                             ? `New message in ${e.chatId.chatName}`
//                             : `New message from ${getSender(activeUser, e.chatId.users)}`}
//                         </div>
//                       ))
//                   }
//                 </div>
//               }
//             </div>

//             {/* Search Bar */}
//             <div className='px-4 pt-2 relative'>
//               <form onSubmit={(e) => e.preventDefault()} className="relative">
//                 <input
//                   onChange={handleSearch}
//                   value={search}
//                   className='w-full bg-[#f6f6f6] text-[#111b21] pl-9 py-2 rounded-md focus:outline-none'
//                   type="text"
//                   placeholder="Search"
//                 />
//                 <BsSearch className="absolute top-2.5 left-3 text-gray-400" />
//               </form>

//               <Group />

//               {/* Search Overlay */}
//               {
//                 search && (
//                   <div
//                     className="absolute left-0 right-0 top-[48px] bg-white shadow-lg rounded-b-md border border-gray-200 z-30 max-h-[240px] overflow-y-auto"
//                     style={{ minWidth: "100%" }}
//                   >
//                     <Search
//                       searchResults={searchResults}
//                       isLoading={isLoading}
//                       search={search}
//                       handleClick={async (user) => {
//                         await handleClick(user)
//                         setSearch("")
//                       }}
//                     />
//                   </div>
//                 )
//               }
//             </div>

//             {/* Contacts */}
//             <div className="flex-grow overflow-y-auto px-4 pb-4">
//               <Contacts />
//             </div>

//           </div>
//         )}

//         {/* Profile View */}
//         {showProfile && (
//           <Profile className="w-full sm:w-[360px] h-[100vh] bg-[#fafafa] relative" />
//         )}

//         {/* Chat View */}
//         <div className={`${isMobileChatOpen ? 'block' : 'hidden'} lg:block w-full h-full`}>
//           <Chat
//             className="chat-page w-full h-[100vh] bg-[#f6fafb]"
//             onBack={() => setIsMobileChatOpen(false)}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUsers, validUser } from '../apis/auth'
import { setActiveUser } from '../redux/activeUserSlice'
import { RiNotificationBadgeFill } from "react-icons/ri"
import { BsSearch } from "react-icons/bs"
import { BiNotification } from "react-icons/bi"
import { IoIosArrowDown } from "react-icons/io"
import { setShowNotifications, setShowProfile } from '../redux/profileSlice'
import Chat from './Chat'
import Profile from "../components/Profile"
import { acessCreate } from "../apis/chat.js"
import "./home.css"
import { fetchChats, setNotifications } from '../redux/chatsSlice'
import { getSender } from '../utils/logics'
import { setActiveChat } from '../redux/chatsSlice'
import Group from '../components/Group'
import Contacts from '../components/Contacts'
import Search from '../components/group/Search'

// ✅ Custom Badge component (Tailwind)
const Badge = ({ count, children }) => (
  <div className="relative inline-block">
    {children}
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">
        {count}
      </span>
    )}
  </div>
)

function Home() {
  const dispatch = useDispatch()
  const { showProfile, showNotifications } = useSelector((state) => state.profile)
  const { notifications, activeChat } = useSelector((state) => state.chats)
  const { activeUser } = useSelector((state) => state)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)

  const handleSearch = async (e) => {
    setSearch(e.target.value)
  }

  const handleClick = async (e) => {
    await acessCreate({ userId: e._id })
    dispatch(fetchChats())
    setSearch("")
  }

  useEffect(() => {
    const isValid = async () => {
      const data = await validUser()
      const user = {
        id: data?.user?._id,
        email: data?.user?.email,
        profilePic: data?.user?.profilePic,
        bio: data?.user?.bio,
        name: data?.user?.name
      }
      dispatch(setActiveUser(user))
    }
    isValid()
  }, [dispatch])

  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true)
      const { data } = await searchUsers(search)
      setSearchResults(data)
      setIsLoading(false)
    }
    if (search) searchChange()
  }, [search])

  useEffect(() => {
    if (window.innerWidth < 1024 && activeChat) {
      setIsMobileChatOpen(true)
      window.history.pushState({ chatOpen: true }, "")
    }
  }, [activeChat])

  // ✅ Handle phone's back button (popstate)
  useEffect(() => {
    const handlePopState = (event) => {
      if (isMobileChatOpen) {
        setIsMobileChatOpen(false)
        window.history.pushState(null, "") // prevent going back multiple times
      }
    }
    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [isMobileChatOpen])

  return (
    <div className="bg-[#f7f9fb] h-[100vh] lg:w-[90%] lg:mx-auto shadow-2xl overflow-hidden">
      <div className="flex h-full">

        {/* Sidebar */}
        {!showProfile && (
          <div className={`flex flex-col w-full md:w-[360px] bg-white h-[100vh] md:h-[98.6vh]
           ${isMobileChatOpen ? 'hidden' : 'block'} lg:block bg-[#e6f0fa]`}>

            {/* Header */}
            <div className='h-[61px] px-4'>
              <div className='flex justify-between items-center'>
                <a className="text-xl font-extrabold tracking-wide text-[#1f2228]" href="/">Messages</a>
                <div className="flex gap-3 items-center">
                  {/* Notification */}
                  <button onClick={() => dispatch(setShowNotifications(!showNotifications))} className="relative">
                    <Badge count={notifications.length}>
                      {showNotifications
                        ? <RiNotificationBadgeFill className="text-[#319268] w-6 h-6" />
                        : <BiNotification className="text-[#319268] w-6 h-6" />
                      }
                    </Badge>
                  </button>

                  {/* Profile */}
                  <button onClick={() => dispatch(setShowProfile(true))} className="flex items-center gap-1">
                    <img className="w-7 h-7 rounded-full" src={activeUser?.profilePic} alt="User" />
                    <IoIosArrowDown className="text-gray-500 h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Notification Panel */}
              {
                showNotifications &&
                <div className="absolute top-12 left-4 z-40 w-[240px] rounded bg-[#fafafa] px-4 py-3 shadow-2xl">
                  {
                    notifications.length === 0
                      ? <p className="text-sm text-gray-600">No new messages</p>
                      : notifications.map((e, i) => (
                        <div key={i} onClick={() => {
                          dispatch(setActiveChat(e.chatId))
                          dispatch(setNotifications(notifications.filter((n) => n !== e)))
                        }} className="cursor-pointer text-[13px] text-black mb-1 hover:underline">
                          {e.chatId.isGroup
                            ? `New message in ${e.chatId.chatName}`
                            : `New message from ${getSender(activeUser, e.chatId.users)}`}
                        </div>
                      ))
                  }
                </div>
              }
            </div>

            {/* Search Bar */}
            <div className='px-4 pt-2 relative'>
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <input
                  onChange={handleSearch}
                  value={search}
                  className='w-full bg-[#f6f6f6] text-[#111b21] pl-9 py-2 rounded-md focus:outline-none'
                  type="text"
                  placeholder="Search"
                />
                <BsSearch className="absolute top-2.5 left-3 text-gray-400" />
              </form>

              <Group />

              {/* Search Overlay */}
              {
                search && (
                  <div
                    className="absolute left-0 right-0 top-[48px] bg-white shadow-lg rounded-b-md border border-gray-200 z-30 max-h-[240px] overflow-y-auto"
                    style={{ minWidth: "100%" }}
                  >
                    <Search
                      searchResults={searchResults}
                      isLoading={isLoading}
                      search={search}
                      handleClick={async (user) => {
                        await handleClick(user)
                        setSearch("")
                      }}
                    />
                  </div>
                )
              }
            </div>

            {/* Contacts */}
            <div className="flex-grow overflow-y-auto px-4 pb-4">
              <Contacts />
            </div>

          </div>
        )}

        {/* Profile View */}
        {showProfile && (
          <Profile className="w-full sm:w-[360px] h-[100vh] bg-[#fafafa] relative" />
        )}

        {/* Chat View */}
        <div className={`${isMobileChatOpen ? 'block' : 'hidden'} lg:block w-full h-full`}>
          <Chat
            className="chat-page w-full h-[100vh] bg-[#f6fafb]"
            onBack={() => setIsMobileChatOpen(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default Home

