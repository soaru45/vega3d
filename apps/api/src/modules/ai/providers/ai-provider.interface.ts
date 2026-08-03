export interface AiGenerationResult {
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number;
  modelUrl?: string;
  error?: string;
}

export interface IAiProvider {
  /** Inicia o job de geração no provedor e retorna um JobID interno deles */
  generateTextTo3D(prompt: string, negativePrompt?: string): Promise<string>;
  
  /** Inicia o job de geração por imagem */
  generateImageTo3D(imageUrl: string, prompt?: string): Promise<string>;
  
  /** Consulta o status atual do Job no provedor */
  checkStatus(providerJobId: string): Promise<AiGenerationResult>;
}
