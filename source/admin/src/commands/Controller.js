export default function NewController(){

    this.commandMap = new Map();
    this.c = null;

    this.setConnector = function(con){
      this.c = con;
    }

    this.addCommand = function (name, command) {
        if(this.commandMap.has(name)) return;
        this.commandMap.set(name, command);
    }

    this.execute = function (name, obj){
        if(this.commandMap.has(name)) return this.commandMap.get(name).execute(obj);
    }

    this.printCommands = function(){
        if(this.commandMap.size>0){
          console.log("total commands: "+this.commandMap.size);
          let keys = this.commandMap.keys();
          for(let key of keys) console.log(key);
    
        }
        else console.log('total commands: 0');
      }
}