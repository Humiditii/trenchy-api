import {Body, Controller, Get, HttpCode, Param, ParseFloatPipe, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {Response} from 'express';
import {Res} from '@nestjs/common';


@Controller()
export class AppController {

  constructor(private readonly appService: AppService){}

  @Get('')
  @HttpCode(200)
  appEntry(@Res() res: Response): Response{
    return res.json({msg:this.appService.returnEntryMsg()})
  }
  // getAllReports(): [] {
  //   return []
  // }

  // @Get('one')
  // getOne(){
  //   return 'this is one response'
  // }

  // @Get(':id')
  // getById(
  //   @Param('id', ParseFloatPipe) userId: String
  // ){
  //   return userId
  // }

  // @HttpCode(201)
  // @Post('create')
  // createOne(
  //   @Body() {name,school} : {name: string, school: string}
  // ){
  //   return this.appService.create(name,school)
  // }

}