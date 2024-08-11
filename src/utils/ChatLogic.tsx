import { userDataTypes } from "./types";

export const getSender = (loggedUser:string|null|undefined, users:userDataTypes[]) => {


    const result= users[0]?._id ==loggedUser ? users[1] : users[0];
    
    return result
  };


  export const chatSeen = (loggedUser:string|null|undefined, users:string[],readUser:string[]) => {
    

    if (users.length !== readUser.length) {
      console.log(false);
      
      return false;
  }
  for (let i = 0; i < users.length; i++) {
      if ( !readUser.includes(users[i])) {
   return false
      }
  }

  return true;

    
    
   
      };


  
export const isSameSender = (messages:any, m:any, i:number, userId:string | null | undefined) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  
  export const isLastMessage = (messages:any, i:number, userId:string | null | undefined) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };



  export const isSameSenderMargin = (messages:any, m:any, i:number, userId:string | null | undefined) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };

  export const isSameUser = (messages:any, m:any, i:number,) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };