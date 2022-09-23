import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('MarketBuy Api')
  .setDescription('API REST del e-commerce MarketBuy')
  .setVersion('1.0')
  .addBasicAuth({
    type:'http',
    scheme:'bearer',
    bearerFormat:'JWT',
    name:'JWT',
    description:'Enter JWT token',
    in:'header'
  },'JWT-auth')
  .build();

  const document = SwaggerModule.createDocument(app,options);

  SwaggerModule.setup('docs',app,document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
