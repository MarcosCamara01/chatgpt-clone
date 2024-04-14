"use client";

export const Header = ({ sidebarOpen }: { sidebarOpen: any }) => {

  return (
    <header
      className={`bg-[#343541] border-b border-solid border-[#2A2B32] p-2 flex items-center justify-center h-[65px] fixed w-full top-0 right-0 transition-all ${sidebarOpen ? "lg:w-[calc(100%-260px)]" : "lg:w-full"}`}>
      <span className='text-[#D9D9E3] text-sm'>Default (GPT-3.5)</span>
    </header>
  );
};
