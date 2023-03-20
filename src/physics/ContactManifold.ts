import { m3, v3 } from "romanpppmath";
import { ContactConstraint } from "./Constraints";
import IRigidBody from "./models/IRigidBody";




import config from "./config";
const {CONTACT_MANIFOLD_KEEP_TRESHOLD} = config

export default class ContactManifold {
  contacts : ContactConstraint[]
  keep : boolean
  
  constructor(contacts : ContactConstraint[]) {
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
      const {deltaPA, deltaPB} = contact.update()
 
      if (v3.norm(deltaPA) > CONTACT_MANIFOLD_KEEP_TRESHOLD || v3.norm(deltaPB) > CONTACT_MANIFOLD_KEEP_TRESHOLD) {
        this.keep = false;
        return;
      }

      
    }
  }
}
