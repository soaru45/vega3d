import { z } from 'zod';

export const GenerationRequestSchema = z.object({
  prompt: z.string().min(3, "Prompt is too short").max(500, "Prompt is too long"),
  style: z.enum(["realistic", "lowpoly", "cyberpunk"]).optional().default("realistic"),
  resolution: z.enum(["1k", "2k", "4k"]).optional().default("1k"),
});

export type GenerationRequest = z.infer<typeof GenerationRequestSchema>;

export interface BaseResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
