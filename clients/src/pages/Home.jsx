
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

