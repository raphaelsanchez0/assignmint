"use client";
import Image from "next/image";
import defaultImage from "@/public/icons/default-image.jpg";
import iconEdit from "@/public/icons/blackEdit.svg";
import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { Card } from "@/components/ui/card";
import { getUserInfo } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import LoadingItem from "@/components/Loading/LoadingItem";

export default function Account() {
  const supabase = createSupabaseFrontendClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => supabase.auth.getUser(),
  });

  const logoutRoute = "/auth/signout";

  const name = data?.data.user?.user_metadata.name;
  const email = data?.data.user?.email;

  if (isLoading)
    return (
      <Card>
        <LoadingItem />
      </Card>
    );
  return (
    <Card>
      <div className="flex justify-between">
        <h3 className="card-title ">Account</h3>
        <Image src={iconEdit} alt="edit" width={20} />
      </div>

      <div className="flex flex-col">
        <div className="self-center rounded-full overflow-hidden my-12">
          <Image src={defaultImage} alt="Profle image" width={120} />
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <h3 className="text-xl font-semibold">{name}</h3>
          <h3 className="text-sm">{email}</h3>
        </div>
      </div>
      <form action={logoutRoute} method="post">
        <button className="btn w-full mt-2" type="submit">
          Logout
        </button>
      </form>
    </Card>
  );
}
