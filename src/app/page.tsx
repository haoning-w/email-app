import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import EmailList from "@/components/ThreadList";
import { FilterProvider } from "@/context/FilterContext";

export default function Home() {
  return (
    <FilterProvider>
      <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <EmailList />
        </div>
      </div>
    </FilterProvider>
  );
}
