// import React from 'react'
// import SkeletonLoading from '../ui/SkeletonLoading'
// import "../../pages/home.css"
// function Search({ type, isLoading, searchResults, handleClick, search }) {

//   return (
//     <div className={`${search ? "scrollbar-hide overflow-y-scroll h-[250px] mb-5 bg-[#fff] flex flex-col gap-y-3 pt-3" : "hidden"}`}>

//       {
//         isLoading ? <SkeletonLoading height={55} count={3} /> : (
//           searchResults.length > 0 ? searchResults?.map((e) => {
//             return (
//               <div key={e._id} className='flex items-center justify-between'>
//                 <div className='flex items-center gap-x-2'>

//                   <img className='w-[42px] h-[42px] rounded-[25px]' src={!e.profilePic ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" : e.profilePic} alt="" />
//                   <div className='flex flex-col gap-y-[1px]'>
//                     <h5 className='text-[15px] text-[#111b21] tracking-wide font-medium'>{e.name}</h5>
//                     <h5 className='text-[12px] text-[#68737c] tracking-wide font-normal'>{e.email}</h5>
//                   </div>
//                 </div>
//                 <button onClick={() => handleClick(e)} className='bg-[#0086ea] px-3 py-2 text-[10.6px] tracking-wide text-[#fff]'>Add</button>
//               </div>
//             )
//           }) : <span className='text-[13px]'>No results found</span>
//         )

//       }
//     </div>
//   )
// }

// export default Search
import React from 'react'
import SkeletonLoading from '../ui/SkeletonLoading'

function Search({ isLoading, searchResults, handleClick, search }) {
  if (!search) return null;

  return (
    <div className="flex flex-col gap-1 px-2 py-1">
      {isLoading ? (
        <SkeletonLoading height={40} count={3} />
      ) : searchResults.length > 0 ? (
        searchResults.map(user => (
          <div
            key={user._id}
            className="flex items-center justify-between hover:bg-[#f4f7fa] px-2 py-1 rounded"
          >
            <div className="flex items-center gap-2 min-w-0">
              <img
                className="w-9 h-9 rounded-full object-cover bg-[#ececec]"
                src={
                  user.profilePic ||
                  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt="user"
              />
              <div className="flex flex-col min-w-0">
                <h5 className="text-[14px] text-[#161b22] font-medium truncate">{user.name}</h5>
                <span className="text-[11px] text-[#68737c] truncate">{user.email}</span>
              </div>
            </div>
            <button
              onClick={() => handleClick(user)}
              className="bg-[#0086ea] hover:bg-[#0071c2] px-2 py-1 text-xs text-white rounded font-semibold"
            >
              Add
            </button>
          </div>
        ))
      ) : (
        <p className='text-[13px] text-center text-gray-500 my-1'>No results found</p>
      )}
    </div>
  )
}

export default Search

