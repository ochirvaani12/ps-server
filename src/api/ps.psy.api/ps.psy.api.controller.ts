import { Controller, Get, Post, Patch } from '@nestjs/common';

@Controller('psy')
export class PsPsyApiController {
  @Post('register')
  async register() {
    return 'TODO';
  }

  @Get('detailCust')
  async detailCust() {
    return 'TODO';
  }

  @Get('selectCustAttr')
  async selectCustAttr() {
    return 'TODO';
  }

  @Patch('updateCustAttr')
  async updateCustAttr() {
    return 'TODO';
  }

  @Get('selectServiceReq')
  async selectServiceReq() {
    return 'TODO';
  }

  @Post('startServiceReq')
  async startServiceReq() {
    return 'TODO';
  }

  @Post('finishServiceReq')
  async finishServiceReq() {
    return 'TODO';
  }
}
