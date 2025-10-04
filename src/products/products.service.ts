import {
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.prisma.product.create({
      data: createProductDto,
    });

    if (!createdProduct)
      throw new NotAcceptableException('Product could not be created');

    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    const foundProducts = await this.prisma.product.findMany({
      where: { isActive: true },
    });

    if (!foundProducts) throw new NotFoundException('No products found');

    return foundProducts;
  }

  async findOne(id: number): Promise<Product> {
    const foundProduct = await this.prisma.product.findUnique({
      where: { id, isActive: true },
    });

    if (!foundProduct)
      throw new RpcException({
        message: `Product with ID ${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });

    return foundProduct;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { id: __, ...data } = updateProductDto;
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: data,
    });

    if (!updatedProduct)
      throw new NotFoundException(`Product with ID ${id} not found`);

    return updatedProduct;
  }

  async remove(id: number): Promise<Product> {
    const deletedProduct = await this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    if (!deletedProduct)
      throw new NotFoundException(`Product with ID ${id} not found`);

    return deletedProduct;
  }
}
