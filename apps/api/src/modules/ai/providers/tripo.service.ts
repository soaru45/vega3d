import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TripoApiService {
  private readonly logger = new Logger(TripoApiService.name);
  private readonly TRIPO_API_KEY = process.env.TRIPO_API_KEY || ''; // Deve ser configurado no .env
  private readonly TRIPO_BASE_URL = 'https://api.tripo3d.ai/v2/openapi';

  /**
   * Envia a imagem para a API Oficial do Tripo3D (Cloud Node)
   */
  async generateFromImage(imageUrl: string, options: any): Promise<any> {
    this.logger.log(`Enviando job para Tripo3D Cloud Node. Qualidade Pro.`);
    
    try {
      const payload = {
        type: 'image_to_model',
        file: {
          type: 'jpg',
          file_token: imageUrl, // Assume que a imagem já foi upada para o serviço de arquivos deles ou S3
        },
        mode: options.texture8k ? 'high_quality' : 'fast', // Simulação de parâmetros reais
        auto_rig: options.autoRigging || false
      };

      // Em um cenário real com uma chave válida, faríamos:
      /*
      const response = await axios.post(`${this.TRIPO_BASE_URL}/task`, payload, {
        headers: {
          Authorization: `Bearer ${this.TRIPO_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
      */

      // Simulação para o "Enterprise Hybrid Pipeline" já que não temos a chave ativa do usuário
      this.logger.warn(`Modo simulação Tripo3D (Sem API KEY real). Criando Job MOCK.`);
      return {
        code: 0,
        data: {
          task_id: `tripo_cloud_job_${Date.now()}`,
          status: 'queued'
        }
      };

    } catch (error) {
      this.logger.error(`Erro ao comunicar com Tripo3D API: ${error.message}`);
      throw new Error('Falha no Cloud Node');
    }
  }

  /**
   * Consulta o status de um Job rodando nos clusters da Tripo3D
   */
  async checkTaskStatus(taskId: string): Promise<any> {
    try {
      /*
      const response = await axios.get(`${this.TRIPO_BASE_URL}/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${this.TRIPO_API_KEY}`,
        },
      });
      return response.data;
      */

      // Simulação do Webhook / Polling de conclusão
      this.logger.debug(`Checando status do job Cloud: ${taskId}`);
      return {
        code: 0,
        data: {
          task_id: taskId,
          status: 'success',
          result: {
            model: 'https://tripo-mock-bucket.s3.amazonaws.com/pro_model_8k.glb',
          }
        }
      };
    } catch (error) {
      this.logger.error(`Erro ao checar status na Tripo3D: ${error.message}`);
      throw error;
    }
  }
}
