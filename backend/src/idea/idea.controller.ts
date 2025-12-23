import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { IdeaService } from './idea.service';

// Define the expected input shape (DTO)
class CreateIdeaDto {
  idea: string;
}

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post('refine')
  @HttpCode(200) // Return 200 OK instead of default 201 Created
  async refine(@Body() body: CreateIdeaDto) {
    // Simple validation
    if (!body.idea || body.idea.length < 5) {
      return { error: 'Idea is too short' };
    }
    
    return await this.ideaService.generateRefinement(body.idea);
  }
}