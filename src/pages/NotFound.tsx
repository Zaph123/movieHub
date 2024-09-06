//6100C2
//7900C2
const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center gap-[10px]">
        <h1 className="text-[5rem]">404</h1>
        <h2 className="text-[.9rem]">Ooops, Page Not Found</h2>
        <a href="/movieHub/" className="bg-[#6100C2] hover:bg-[#7900C2] py-[10px] px-[15px] rounded-full">Back to Homepage</a>
      </div>
    </div>
  )
}

export default NotFound
