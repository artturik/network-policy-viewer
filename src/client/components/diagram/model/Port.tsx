import { v4 as uuidv4 } from 'uuid';

export class Port {
     id: string;
     type: string;
     name: string;

     constructor(name: string, type: string, id?: string) {
          this.name = name;
          this.type = type;
          if(!id){
               id = 'p' + uuidv4();
          }
          this.id = id;
     }
}