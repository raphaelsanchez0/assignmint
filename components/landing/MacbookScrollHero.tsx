import Image from "next/image";
import { MacbookScroll } from "../ui/macbook-scroll";
import macScreenImage from "@/public/images/hero_image.png";

export function MacbookScrollHero() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
        title={<span>The Assignment Tracker that works for you.</span>}
        src={"/macbook_image.png"}
      />
    </div>
  );
}

function MacbookImage() {
  return <Image src={"/macbook_image.png"} alt={"Macbook Image"} />;
}
