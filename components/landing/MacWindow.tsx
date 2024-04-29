import Image from "next/image";

export default function MacWindow() {
  return (
    <div className="flex-col rounded-xl overflow-hidden shadow-2xl hidden md:block w-4/5">
      <div className="bg-gray-300 dark:bg-[#1E1E1E] p-2 w-full flex items-center gap-1.5">
        <div className="bg-[#FF5E57] h-3 w-3 rounded-full"></div>
        <div className="bg-[#FFBB2E] h-3 w-3 rounded-full"></div>
        <div className="bg-[#38C149] h-3 w-3 rounded-full"></div>
      </div>
      <div className="dark:bg-[#282828]">
        <div className="hidden dark:block">
          <Image
            src="/images/macbook_img_dark.PNG"
            width={2541}
            height={1309}
            quality={100}
            alt="ui"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="dark:hidden">
          <Image
            src="/images/macbook_img_light.PNG"
            width={2542}
            height={1311}
            alt="ui"
            quality={100}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}
{
  /* 
</div><div className="bg-white border-2 border-black rounded-lg shadow-lg p-2 w-96 h-64"></div> */
}
