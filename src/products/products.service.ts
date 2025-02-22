import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/common/dto/pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async create(createProductDto: CreateProductDto) {
    const data = await this.product.create({
      data: createProductDto,
    });
    return data;
  }

  async findAll(paginationDto: PaginationDto) {
    console.log(paginationDto);
    const data = await this.product.findMany({
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit,
    });
    console.log(data);
    return {
      page: paginationDto.page,
      limit: paginationDto.limit,
      products: data,
    };
  }

  async findOne(id: number) {
    const data = await this.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!data) throw new NotFoundException(`Product with id ${id} not found`);

    return data;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    console.log(updateProductDto);
    const data = await this.product.update({
      where: {
        id: id,
      },
      data: updateProductDto,
    });
    console.log(data);
    return data;
  }

  async remove(id: number) {
    await this.findOne(id);

    const data = await this.product.delete({
      where: {
        id: id,
      },
    });
    return data;
  }
}
