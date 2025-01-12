//~ Import module
import { CoreRepository } from "../core/coreRepository.js";
import { PGUserData } from "./datamapper.js";

class UserRepository extends CoreRepository {
  dataRepository = PGUserData;

  //& Find user by email
  findUserIdentity = async (username: string, email: string) => {
    const userIdentity = await this.dataRepository.findUserIdentity(
      username,
      email
    );

    return userIdentity;
  };
}

const UserData = new UserRepository();
export { UserData };
