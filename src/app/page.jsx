import Result from "@/components/Result";
import SearchBar from "@/components/SearchBar";
import SearchEngine from "@/components/SearchEngine";

export default function Home() {

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center px-5 overflow-hidden">
       
       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full w-full flex justify-center items-center blur-2xl">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-emerald-500 via-purple-500 to-transparent rounded-full opacity-10 animate-random-move-1 blur-3xl"></div>
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-pink-500 via-blue-500 to-transparent rounded-full opacity-10 animate-random-move-2 blur-3xl"></div>
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-tl from-yellow-500 via-orange-500 to-transparent rounded-full opacity-10 animate-random-move-3 blur-3xl"></div>
      </div>


      <div className="z-10 w-full h-full flex flex-col items-center justify-center px-5">
        <h1 className="text-white-80 text-6xl my-5 flex flex-row items-center text-center">
          Activity Finder
        </h1>
        <div className="mb-6 flex flex-row justify-center items-center">
          <span className="text-white-80 opacity-80 text-sm">You're looking around —</span>
          <span className="relative flex">
            <svg height="10" width="10" className="animate-ping absolute fill-emerald-300 ml-1 animate-ping">
              <circle r="5" cx="5" cy="5" />
            </svg>
            <svg height="10" width="10" className="relative inline-flex fill-emerald-300 ml-1">
              <circle r="5" cx="5" cy="5" />
            </svg>
          </span>
          
          <select className="text-emerald-300 opacity-80 text-sm bg-transparent outline-none">
            <option className="bg-transparent">Montpellier</option>
            <option className="bg-transparent line-through" disabled>
              Toulouse
            </option>
            <option className="bg-transparent line-through" disabled>
              Paris
            </option>
          </select>
        </div>

        <SearchEngine/>
        
      </div>
    </div>
  );
}