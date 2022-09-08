import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
// import { Socket } from 'socket.io';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // const socket: Socket = context.switchToWs().getClient();
    // console.log(socket.handshake);
    return true;
  }
}
