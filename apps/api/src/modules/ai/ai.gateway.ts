import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AiGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(Client connected: );
  }

  handleDisconnect(client: Socket) {
    console.log(Client disconnected: );
  }

  // O Worker Python (ou outro webhook interno) chamará uma rota na API ou publicará no Redis
  // e o NestJS vai transmitir o progresso por aqui
  sendJobProgress(generationId: string, progress: number, status: string, fullText: string = '') {
    this.server.emit(generation-progress-, {
      progress,
      status,
      fullText,
    });
  }

  sendJobComplete(generationId: string, modelUrl: string) {
    this.server.emit(generation-complete-, {
      modelUrl,
    });
  }
}

