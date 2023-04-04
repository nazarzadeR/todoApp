import { AuthGuard } from '@nestjs/passport';

export class ATGuard extends AuthGuard('at') {
    constructor() {
        super();
    }
}
