import { MockModel } from '../../../users/database/test/support/mock.model';
import { User } from '../../../users/entities/user.entity';
import { userStub } from '../stubs/user.stub';

export class UserModel extends MockModel<User> {
  protected entityStub = userStub();
}
