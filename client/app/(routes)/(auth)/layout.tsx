export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex w-full h-screen justify-center items-center text-2xl">
            {children}
        </div>
    );
  }
  