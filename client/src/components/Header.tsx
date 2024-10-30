import React from "react"

interface HeaderProps {
  onClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
  return (
    <nav className="w-full z-30 py-1 bg-white shadow-lg fixed">
        <div className="w-full flex flex-wrap items-center justify-end mr-0 md:mr-4 px-6 py-2">
          <button onClick={onClick} className="w-[150px] bg-red-500 h-[50px] rounded-xl cursor-pointer shadow-md hover:scale-105 hover:shadow-lg text-[#fff]">
            Logout
          </button>
        </div>
    </nav>
  )
}

export default Header
