import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/model/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schema/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const { _id } = await this.postModel.create(createPostDto);
      const user = await this.userModel.findOne({
        _id: createPostDto.create_by,
      });
      user.posts.push(_id);
      await user.save();
      return 'Post created successfully';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.postModel.find({}).populate('create_by').exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(_id: string) {
    try {
      const { description, fileName, create_by } = await this.postModel.findOne(
        {
          _id,
        },
      );
      return {
        fileURL: `${process.env.APP_URL}/api/uploads/${fileName}`,
        description,
        create_by,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserPost(_id: string) {
    try {
      return this.postModel.find({ create_by: _id }).exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(_id: string, updatePostDto: UpdatePostDto) {
    try {
      this.postModel.updateOne({ _id }, updatePostDto).exec();
      return 'Post updated successfully';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(_id: string) {
    try {
      this.postModel.deleteOne({ _id }).exec();
      return 'Post deleted successfully';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
