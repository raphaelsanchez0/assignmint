"use client";
import Image from "next/image";
import defaultImage from "@/public/icons/default-image.jpg";
import iconEdit from "@/public/icons/blackEdit.svg";
import supabase from "@/server/supabase";

export default function Account() {
  async function handleLogout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
  }
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="card-title ">Account</h3>
        <Image src={iconEdit} alt="edit" width={20} />
      </div>

      <div className="flex flex-col">
        <div className="self-center rounded-full overflow-hidden my-12">
          <Image src={defaultImage} alt="Profle image" width={120} />
        </div>
        <div>
          <h3 className=" text-xl">First Name: </h3>
          <h3 className=" text-xl">Last Name: </h3>
          <h3 className=" text-xl">Email: </h3>
          <h3 className="text-xl">Password: </h3>
        </div>
      </div>
      <form action="/auth/signout" method="post">
        <button className="btn w-full mt-2" type="submit">
          Logout
        </button>
      </form>
    </div>
  );
}
