
export default class GetUser {

  /**
   * @type {UserRepository}
   */
  userRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  execute(id: number) {
    return this.userRepository.getUser(id);
  }
}