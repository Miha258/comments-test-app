import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsGateway } from './comments.gateway';
import { CaptchaGuard } from '../captcha/guards/captcha.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';

describe('CommentsController', () => {
  let controller: CommentsController;
  let commentsService: CommentsService;
  let commentsGateway: CommentsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: {
            create: jest.fn(),
            getComments: jest.fn(),
          },
        },
        {
          provide: CommentsGateway,
          useValue: {
            notifyClients: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(CaptchaGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
    commentsGateway = module.get<CommentsGateway>(CommentsGateway);
  });

  describe('createComment', () => {
    it('should create a comment and notify clients', async () => {
      const createCommentDto: CreateCommentDto = {
        "username": "testuser",
        "email": "testuser@example.com",
        "homepage": "https://example.com",
        "text": "This is a test comment.",
        "captcha": "65rXHK"
      };
      const session = {};
      const result = {
        "id": 1,
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "username": "testuser",
        "email": "testuser@example.com",
        "homepage": "https://example.com",
        "text": "This is a test comment.",
        "captcha": "gTDnJU",
        "parentId": null
        };

      jest.spyOn(commentsService, 'create').mockResolvedValue(result);

      expect(await controller.createComment(createCommentDto, session)).toBe(result);
      expect(commentsService.create).toHaveBeenCalledWith(createCommentDto, session);
      expect(commentsGateway.notifyClients).toHaveBeenCalledWith('commentPosted', result);
    });
  });

  describe('getComments', () => {
    it('should return a list of comments with metadata', async () => {
      const getCommentsDto: GetCommentsDto = { page: 1, limit: 10 };
      const result = {
        data: [
          {
            id: 13,
            createdAt: new Date("2024-06-30T23:34:11.005Z"),
            updatedAt: new Date("2024-06-30T23:34:11.005Z"),
            username: 'testuser',
            email: 'testuser@example.com',
            homepage: 'https://example.com',
            text: 'This is a test comment.',
            captcha: 'gTDnJU',
            parentId: null,
            replies: [],
          },
          {
            id: 12,
            createdAt: new Date("2024-06-30T18:25:04.323Z"),
            updatedAt: new Date("2024-06-30T18:25:04.323Z"),
            username: 'testuser',
            email: 'testuser@example.com',
            homepage: 'https://example.com',
            text: 'This is a test comment.',
            captcha: '65rXHK',
            parentId: null,
            replies: [],
          },
          {
            id: 11,
            createdAt: new Date("2024-06-30T18:21:47.096Z"),
            updatedAt: new Date("2024-06-30T18:21:47.096Z"),
            username: 'testuser',
            email: 'testuser@example.com',
            homepage: 'https://example.com',
            text: 'This is a test comment.',
            captcha: 'EjwxEd',
            parentId: null,
            replies: [],
          },
          {
            id: 10,
            createdAt: new Date("2024-06-30T18:17:06.211Z"),
            updatedAt: new Date("2024-06-30T18:17:06.211Z"),
            username: 'testuser',
            email: 'testuser@example.com',
            homepage: 'https://example.com',
            text: 'This is a test comment.',
            captcha: 'awBWb7',
            parentId: null,
            replies: [],
          },
          {
            id: 9,
            createdAt: new Date("2024-06-30T16:03:45.458Z"),
            updatedAt: new Date("2024-06-30T16:03:45.458Z"),
            username: 'testuser',
            email: 'testuser@example.com',
            homepage: 'https://example.com',
            text: 'This is a test comment.',
            captcha: 'JCOACe',
            parentId: null,
            replies: [],
          },
          {
            id: 8,
            createdAt: new Date("2024-06-30T16:01:42.985Z"),
            updatedAt: new Date("2024-06-30T16:01:42.985Z"),
            username: 'testuser',
            email: 'testuser@example.com',
            homepage: 'https://example.com',
            text: 'This is a test comment.',
            captcha: 'YoOXQ9',
            parentId: null,
            replies: [],
          },
          {
            id: 7,
            createdAt: new Date("2024-06-30T16:00:42.547Z"),
            updatedAt: new Date("2024-06-30T16:00:42.547Z"),
            username: 'testuser',
            email: 'testuser@example.com',
            homepage: 'https://example.com',
            text: 'This is a test comment.',
            captcha: '42oxip',
            parentId: null,
            replies: [],
          },
          {
            id: 6,
            createdAt: new Date("2024-06-30T15:55:00.243Z"),
            updatedAt: new Date("2024-06-30T15:55:00.243Z"),
            username: 'testuser',
            email: 'testuser@example.com',
            homepage: 'https://example.com',
            text: 'This is a test comment.',
            captcha: 'JPF7L3',
            parentId: null,
            replies: [],
          },
          {
            id: 5,
            createdAt: new Date("2024-06-30T15:48:50.549Z"),
            updatedAt: new Date("2024-06-30T15:48:50.549Z"),
            username: 'testuser',
            email: 'testuser@example.com',
            homepage: 'https://example.com',
            text: 'This is a test comment.',
            captcha: 'hpQgMV',
            parentId: null,
            replies: [],
          },
          {
            id: 4,
            createdAt: new Date("2024-06-30T15:46:04.265Z"),
            updatedAt: new Date("2024-06-30T15:46:04.265Z"),
            username: 'testuser',
            email: 'testuser@example.com',
            homepage: 'https://example.com',
            text: 'This is a test comment.',
            captcha: '08ET4e',
            parentId: null,
            replies: [],
          },
        ],
        total: 13,
        page: 1,
        lastPage: 2,
      };

      jest.spyOn(commentsService, 'getComments').mockResolvedValue(result);

      expect(await controller.getComments(getCommentsDto)).toBe(result);
      expect(commentsService.getComments).toHaveBeenCalledWith(getCommentsDto);
    });
  });
});
