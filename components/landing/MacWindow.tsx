import Image from "next/image";

export default function MacWindow() {
  return (
    <div className="flex-col rounded-xl overflow-hidden shadow-2xl hidden md:block">
      <div className="bg-[#F6F6F6] dark:bg-[#1E1E1E] p-2 w-full flex items-center gap-1.5">
        <div className="bg-[#FF5E57] h-3 w-3 rounded-full"></div>
        <div className="bg-[#FFBB2E] h-3 w-3 rounded-full"></div>
        <div className="bg-[#38C149] h-3 w-3 rounded-full"></div>
      </div>
      <div className="dark:bg-[#282828]">
        <Image src="/images/ui-image.png" width={1000} height={50} alt="ui" />
      </div>
    </div>
  );
}
{
  /* 
</div><div className="bg-white border-2 border-black rounded-lg shadow-lg p-2 w-96 h-64"></div> */
}
