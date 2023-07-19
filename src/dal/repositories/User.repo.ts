


export default class UserRepository {

  idCounter ; 

  constructor() {
    console.log("User Respository initiated");
    this.idCounter = 1;
  }

  createUser(username: string) {
    console.log("User created", this.idCounter);
    const user = {
      username, 
      id: this.idCounter,
    };
    this.idCounter += 1;
    return user;
  }

  getUser(id: number) {
    return { id, user: "testUser" };
  }
} 