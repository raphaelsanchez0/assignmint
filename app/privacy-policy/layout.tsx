export default function PrivacyPolicy({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-screen h-full flex items-center justify-center 
      bg-gradient-to-br from-green-400 to-green-950 "
    >
      {children}
    </div>
  );
}
