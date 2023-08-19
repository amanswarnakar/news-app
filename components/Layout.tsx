import Navbar from "./Layout/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-full">
      <Navbar />
      <div className="min-h-full">{children}</div>
    </div>
  );
};

export default Layout;
