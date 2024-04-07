"use client";

export const Header = ({ sidebarOpen, isMobile }: { sidebarOpen: any, isMobile: boolean }) => {

  return (
    <header
      className={`bg-[#343541] border-b border-solid border-[#2A2B32] p-2 flex items-center justify-center h-[65px] fixed top-0 right-0
        ${sidebarOpen && !isMobile ? "small" : "big"}`}>
      <span className='text-[#D9D9E3] text-sm'>Default (GPT-3.5)</span>
    </header>
  );
};
