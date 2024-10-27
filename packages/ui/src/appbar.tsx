import { Button } from "./button";

interface AppBarProps {
  user?: {
    name?: String | null;
  },
  onSignin: any,
  onSignout: any

}

export const Appbar = ({
  user,
  onSignin,
  onSignout
}: AppBarProps) => {

  const userName = user?.name;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 bg-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-3xl font-bold text-[#5b21b6]">Velowallet</div>

        {userName ? (
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-[#803ead]">
              Welcome, <span className="font-semibold">{userName}</span>
            </span>
            <Button color="#803aed" onClick={onSignout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button color="#803ead" onClick={onSignin}>
            Login
          </Button>
        )}
      </div>
    </div>);
}
