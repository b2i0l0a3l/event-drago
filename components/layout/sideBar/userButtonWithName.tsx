import { UserButton } from "@clerk/nextjs";

export default function UserButtonWithName() {
  return (
    <div className="w-full">
      <UserButton
        showName
        appearance={{
          elements: {
            userButtonBox: "flex-row-reverse w-full justify-start",
          },
        }}
      />
    </div>
  );
}
