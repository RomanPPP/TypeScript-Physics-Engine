import { m3, v3, vec3 } from "romanpppmath";
import { ContactConstraint } from "./Constraints";
import IRigidBody from "./models/IRigidBody";

import config from "./config";
const { CONTACT_MANIFOLD_KEEP_TRESHOLD } = config;

export default class ContactManifold {
  contacts: ContactConstraint[];
  keep: boolean;
  static fromFeaturesArray(
    body1: IRigidBody,
    body2: IRigidBody,
    features: {
      ra: vec3;
      rb: vec3;
      raLocal: vec3;
     rbLocal: vec3;
      PA: vec3;
      PB: vec3;
      positionError: number;
      n: vec3;
      i: vec3;
      j: vec3;
    }[]
  ) {
    return new ContactManifold(
      features.map(
        (c) =>
          new ContactConstraint(
            body1,
            body2,
            c.raLocal,
            c.rbLocal,
            c.ra,
            c.rb,
            c.PA,
            c.PB,
            c.n,
            c.positionError,
            c.i,
            c.j
          )
      )
    );
  }
  constructor(contacts: ContactConstraint[]) {
    this.contacts = contacts;
    this.keep = true;
  }
  update() {
    const contacts = this.contacts;

    if (contacts.length < 3) {
      this.keep = false;
      return;
    }
    for (let i = 0, n = contacts.length; i < n; i++) {
      const contact = contacts[i];
      const { deltaPA, deltaPB } = contact.update();

      if (
        v3.norm(deltaPA) > CONTACT_MANIFOLD_KEEP_TRESHOLD ||
        v3.norm(deltaPB) > CONTACT_MANIFOLD_KEEP_TRESHOLD
      ) {
        this.keep = false;
        return;
      }
    }
  }
}
