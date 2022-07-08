import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly entryPoint:string = 'Welcome to the entry point of the app';

  returnEntryMsg():string{
    return this.entryPoint;
  }
}