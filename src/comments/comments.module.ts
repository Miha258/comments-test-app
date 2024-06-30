import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaClient } from '@prisma/client';
import { CommentsGateway } from './comments.gateway';


@Module({
  providers: [CommentsService, PrismaClient, CommentsGateway],
  controllers: [CommentsController]
})
export class CommentsModule {}
