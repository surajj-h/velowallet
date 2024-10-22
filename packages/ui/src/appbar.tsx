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
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-3xl font-bold text-[#3B1E54]">Velowallet</div>
        <Button color="#9B7EBD"
          onClick={user ? onSignout : onSignin}
        >
          {user ? 'Logout' : 'Login'}
        </Button>
      </div>
    </div>
  );
}
