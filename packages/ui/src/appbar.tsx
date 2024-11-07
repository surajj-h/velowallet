import { Button } from "./button";
import Link from "next/link";

interface AppBarProps {
  user?: {
    name?: String | null;
  },
  onSignin: any,
  onSignout: any
  isScrolled: boolean
}

export const Appbar = ({
  user,
  onSignin,
  onSignout,
  isScrolled
}: AppBarProps) => {

  const userName = user?.name;

  return (
    <div className={`max-w-8xl mx-auto px-4 min-[400px]:px-12 min-[550px]:px-16 min-[750]:px-24 py-5 flex justify-between items-center bg-[#FBF5FF] ${isScrolled ? "bg-white shadow-lg" : "bg-[#FBF5FF]"}`}>
      <Link href="/">
        <h1 className="text-4xl font-bold text-[#470368] tracking-normal">
          Velowallet
        </h1>
      </Link>

      {userName ? (
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium text-[#803ead]">
            Welcome, <span className="font-semibold">{userName[0]?.toUpperCase() + userName.slice(1, 100).toLowerCase()}</span>
          </span>
          <Button onClick={onSignout}>
            Logout
          </Button>
        </div>
      ) : (
        <Button onClick={onSignin}>
          Signin
        </Button>
      )}
    </div>);
}
