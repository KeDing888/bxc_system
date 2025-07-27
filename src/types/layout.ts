// src/types/layout.ts
export interface ProcessLayout {
  id: string;
  name: string;
  passes: LayoutPass[];
  createdAt: string;
  updatedAt: string;
}

export interface LayoutPass {
  order: number;
  deviceId: string;
  startX: number;
  endX: number;
  attributes: Record<string, any>;
}