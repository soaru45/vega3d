'use client';

import * as React from 'react';
import { GenerationPanel } from '@/shared/components/workspace/GenerationPanel';
import { Viewport3D } from '@/shared/components/workspace/Viewport3D';
import { AssetsPanel } from '@/shared/components/workspace/AssetsPanel';

export default function DashboardWorkspacePage() {
  return (
    <div className="flex flex-1 w-full h-full bg-[#141414] overflow-hidden">
      <GenerationPanel />
      <Viewport3D />
      <AssetsPanel />
    </div>
  );
}
