import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Verifica se a API está online' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Vega3D API',
    };
  }
}
