import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLoggerService } from '../../common/logger/logger.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { GenerationTaskPayload } from '@vega3d/ai-contracts';

@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
  private client: ClientProxy;

  constructor(
    private configService: ConfigService,
    private logger: AppLoggerService,
  ) {}

  onModuleInit() {
    const rmqUrl = this.configService.get<string>('RABBITMQ_URL');
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl || 'amqp://guest:guest@localhost:5672'],
        queue: 'generation_tasks',
        queueOptions: {
          durable: true,
        },
      },
    });
    this.logger.log('RabbitMQ Client Initialized', 'QueueService');
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async publishGenerationTask(payload: GenerationTaskPayload): Promise<void> {
    this.logger.log(`Publishing task ${payload.jobId} to generation_tasks`, 'QueueService');
    // Utilizamos emit() pois não aguardaremos resposta instantânea (Event-Driven Async)
    this.client.emit('generation.started', payload);
  }
}
