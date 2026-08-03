'use client';

import * as React from 'react';
import { Canvas3D } from './viewer/Canvas3D';
import { AiGenerationProgress } from '../ai/AiGenerationProgress';

export function WorkspaceMainArea() {
  return (
    <div className="h-full w-full bg-slate-50 dark:bg-slate-950 flex flex-col relative overflow-hidden">
      <AiGenerationProgress />
      <Canvas3D />
    </div>
  );
}
