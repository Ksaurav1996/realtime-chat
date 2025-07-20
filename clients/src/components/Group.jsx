// import React, { useState } from 'react'
// import { BsPlusLg } from "react-icons/bs"
// import { Modal, Box } from "@mui/material"
// import { searchUsers } from '../apis/auth';
// import { RxCross2 } from "react-icons/rx"
// import { useEffect } from 'react';
// import { createGroup } from '../apis/chat';
// import { fetchChats } from '../redux/chatsSlice';
// import { useDispatch } from 'react-redux';
// import Search from './group/Search';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   minWidth: 400,
//   bgcolor: 'background.paper',

//   boxShadow: 24,
//   p: 2

// };
// function Group() {
//   const dispatch = useDispatch()
//   const [open, setOpen] = useState(false);
//   const [chatName, setChatName] = useState("")
//   const [searchResults, setSearchResults] = useState([])
//   const [search, setSearch] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [selectedUser, setSelectedUsers] = useState([])
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false)
//     setSearch("")
//     setSelectedUsers([])
//   }
//   const handleFormSearch = async (e) => {
//     setSearch(e.target.value)
//   }
//   const handleClick = (e) => {
//     if (selectedUser.includes(e)) {
//       return
//     }
//     setSelectedUsers([...selectedUser, e])
//   }

//   const deleteSelected = (ele) => {
//     setSelectedUsers(selectedUser.filter((e) => e._id !== ele._id))
//   }
//   const handleSubmit = async () => {
//     if (selectedUser.length >= 2) {

//       await createGroup({
//         chatName,
//         users: JSON.stringify(selectedUser.map((e) => e._id))
//       })
//       dispatch(fetchChats())
//       handleClose()
//     }
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
//   }, [])
//   return (
//     <>
//       <button className='mt-1 transition duration-150 ease-in-out' onClick={handleOpen}>

//         <div className='flex justify-start border-r-2'>
//           <button className='text-[11px] font-normal tracking-wide flex items-center gap-x-1 bg-[#f6f6f6] text-[#1f2228] py-1 -mb-7 mt-2  px-2'>New Group <BsPlusLg /></button>
//         </div>
//       </button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <h5 className='text-[18px] text-[#111b21] font-medium text-center'>Create A Group</h5>

//           <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-y-3 mt-3'>

//             <input onChange={(e) => setChatName(e.target.value)} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="chatName" placeholder="Group Name" required />
//             <input onChange={handleFormSearch} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="users" placeholder="add users" />
//             <div className='flex -mt-2'>

//               {
//                 selectedUser?.map((e) => {
//                   return (
//                     <button key={e} onClick={() => deleteSelected(e)} className='flex items-center gap-x-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400'>
//                       <span >{e.name}</span>
//                       <RxCross2 />
//                     </button>
//                   )
//                 })
//               }
//             </div>


//             <Search isLoading={isLoading} handleClick={handleClick} search={search} searchResults={searchResults} />

//             <div className='flex justify-end mt-3'>
//               <button onClick={handleSubmit} className='bg-[#0086ea] text-[#fff] text-[15px] font-medium px-2 py-1 tracking-wide' type='submit'>Create</button>
//             </div>
//           </form>


//         </Box>
//       </Modal>
//     </>
//   )
// }

// export default Group
import React, { useState, useEffect } from 'react';
import { BsPlusLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { searchUsers } from '../apis/auth';
import { createGroup } from '../apis/chat';
import { fetchChats } from '../redux/chatsSlice';
import { useDispatch } from 'react-redux';
import Search from './group/Search';

function Group() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUsers] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearch("");
    setSelectedUsers([]);
  };

  const handleFormSearch = async (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    if (!selectedUser.find((user) => user._id === e._id)) {
      setSelectedUsers([...selectedUser, e]);
    }
  };

  const deleteSelected = (ele) => {
    setSelectedUsers(selectedUser.filter((e) => e._id !== ele._id));
  };

  const handleSubmit = async () => {
    if (selectedUser.length >= 2 && chatName.trim()) {
      await createGroup({
        chatName,
        users: JSON.stringify(selectedUser.map((e) => e._id)),
      });
      dispatch(fetchChats());
      handleClose();
    }
  };

  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true);
      const { data } = await searchUsers(search);
      setSearchResults(data);
      setIsLoading(false);
    };
    if (search) searchChange();
  }, [search]);

  return (
    <>
      <button onClick={handleOpen} className="transition duration-150 ease-in-out">
        <div className="flex justify-start border-r-2">
          <span className="text-[11px] font-normal tracking-wide flex items-center gap-x-1 bg-[#f6f6f6] text-[#1f2228] py-1 px-2">
            New Group <BsPlusLg />
          </span>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-[90%] max-w-md shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Create a Group</h2>
              <RxCross2 className="cursor-pointer" onClick={handleClose} />
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-y-3">
              <input
                onChange={(e) => setChatName(e.target.value)}
                value={chatName}
                className="border border-gray-300 text-sm p-2 rounded"
                type="text"
                name="chatName"
                placeholder="Group Name"
                required
              />

              <input
                onChange={handleFormSearch}
                value={search}
                className="border border-gray-300 text-sm p-2 rounded"
                type="text"
                name="users"
                placeholder="Add users"
              />

              <div className="flex flex-wrap gap-2">
                {selectedUser.map((e) => (
                  <div key={e._id} className="flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-400">
                    <span>{e.name}</span>
                    <RxCross2 className="cursor-pointer" onClick={() => deleteSelected(e)} />
                  </div>
                ))}
              </div>

              <Search isLoading={isLoading} handleClick={handleClick} search={search} searchResults={searchResults} />

              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white text-[14px] font-medium px-4 py-1.5 rounded"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Group;
