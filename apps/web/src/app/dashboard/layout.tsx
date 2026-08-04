import * as React from 'react';
import { Topbar } from '@/shared/components/Topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#141414] text-white">
      <Topbar />
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
}
