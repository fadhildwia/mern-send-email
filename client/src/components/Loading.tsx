import React from "react"

interface LoadingProps {
  isShow: boolean
}

const Loading: React.FC<LoadingProps> = ({ isShow }) => {
  if (!isShow) return null
  return (
    <>
      <div
        className="fixed z-50 inset-0 transition-opacity bg-gray-500 opacity-75"
      ></div>
      <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center bg-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </>
  )
}

export default Loading
