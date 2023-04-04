import { AuthGuard } from '@nestjs/passport';

export class RTGuard extends AuthGuard('rt') {
    constructor() {
        super();
    }
}
