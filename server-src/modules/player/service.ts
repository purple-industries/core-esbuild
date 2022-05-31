import alt from 'alt-server';
import { injectable } from 'tsyringe';

@injectable()
export class TestService {
  constructor() {}

  public log() {
    alt.log('test');
  }
}
