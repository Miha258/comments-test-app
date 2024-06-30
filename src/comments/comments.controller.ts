import { Controller, Post, Body, UseGuards, Session, Get, Query } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { CaptchaGuard } from '../captcha/guards/captcha.guard';
import { GetCommentsDto } from './dto/get-comments.dto';
import { CommentsGateway } from './comments.gateway';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly commentsGateway: CommentsGateway
  ) {}

  @Post()
  @UseGuards(CaptchaGuard)
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: 'Comment created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Session() session: Record<string, any>
  ) {
    const comment = await this.commentsService.create(createCommentDto, session);
    this.commentsGateway.notifyClients('commentPosted', comment);
    return comment;
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of comments per page' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Field to sort by' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Sort order' })
  @ApiResponse({ status: 200, description: 'Return all comments.' })
  async getComments(@Query() getCommentsDto: GetCommentsDto) {
    return this.commentsService.getComments(getCommentsDto);
  }
}
