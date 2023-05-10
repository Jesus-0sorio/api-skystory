import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schema/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto) {
    this.postModel.create({ id: uuid(), ...createPostDto });
    console.log(createPostDto);
    return 'This action adds a new post';
  }

  findAll() {
    return this.postModel.find({}, { id: 0, __v: 0, _id: 0 });
  }

  async findOne(id: string) {
    const { description, fileName, create_by } = await this.postModel.findOne(
      {
        id,
      },
      { id: 0, __v: 0, _id: 0 },
    );
    return {
      fileURL: `${process.env.APP_URL}/uploads/${fileName}`,
      description,
      create_by,
    };
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
