import { connectionFromArray } from "graphql-relay";

import { Person } from "../../model";

export class PersonLoader {
  constructor(data) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.url = data.url;
    this.createdAt = data.createdAt;
  }

  static async load(id) {
    const data = {
      id,
    };

    return new PersonLoader(data);
  }

  static async loadById(id) {
    return Person.findById(id, (err, Person) => {
      if (err) return err;

      return Person;
    });
  }

  static async loadAll() {
    return Person.find({}, (err, Persons) => {
      if (err) return err;

      return Persons;
    });
  }

  static async counter() {
    return Person.count({});
  }

  static async loadWithConnection(args) {
    const Persons = await Person.find({}).sort({ createdAt: -1 });

    return connectionFromArray(Persons, args);
  }
}
