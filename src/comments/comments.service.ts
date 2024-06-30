import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { PrismaClient } from '@prisma/client';
import * as DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaClient) {}

  async create(createCommentDto: CreateCommentDto, session: Record<string, any>) {
    const { username, email, homepage, parentId, text, captcha } = createCommentDto;
    const allowedTags = ['a', 'code', 'i', 'strong'];
    const allowedAttributes = {
      a: ['href', 'title'],
    };

    const sanitizedText = purify.sanitize(text, {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: allowedAttributes,
    });
    return this.prisma.comment.create({
      data: {
        username,
        email,
        homepage,
        text: sanitizedText,
        captcha,
        parentId,
      },
    })
  }

  async getComments(getCommentsDto: GetCommentsDto) {
    console.log(process.env.DATABASE_URL)
    const { page = 1, limit = 25, sortBy = 'createdAt', sortOrder = 'desc' } = getCommentsDto;

    const skip = (page - 1) * limit;

    const comments = await this.prisma.comment.findMany({
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        replies: true,
      },
    });

    const totalComments = await this.prisma.comment.count();

    return {
      data: comments,
      total: totalComments,
      page,
      lastPage: Math.ceil(totalComments / limit),
    };
  }
}
