import { z } from 'zod';

// Esquema de mensagem enviada do Monólito Node para o Worker Python
export const GenerationTaskPayloadSchema = z.object({
  jobId: z.string().uuid(),
  prompt: z.string(),
  modelType: z.enum(['text-to-3d', 'image-to-3d']),
  userId: z.string().uuid(),
  callbackUrl: z.string().url(),
});

export type GenerationTaskPayload = z.infer<typeof GenerationTaskPayloadSchema>;

// Esquema de mensagem retornada do Worker Python
export const GenerationTaskResultSchema = z.object({
  jobId: z.string().uuid(),
  status: z.enum(['success', 'failed']),
  assetUrl: z.string().url().optional(),
  errorReason: z.string().optional(),
});

export type GenerationTaskResult = z.infer<typeof GenerationTaskResultSchema>;
