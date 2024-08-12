
const clientSocketListeners = (socket,typeOfCall:string,callStatus,
    updateCallStatus,peerConnection)=>{
        
    socket.on('answerResponse',entireOfferObj=>{
        console.log(entireOfferObj,'entireOfferObj',callStatus);
        const copyCallStatus = {...callStatus}
        copyCallStatus.answer = entireOfferObj.answer
        copyCallStatus.myRole = typeOfCall
        console.log('entireOfferObj',copyCallStatus);

        updateCallStatus(copyCallStatus)
    })

    socket.on('receivedIceCandidateFromServer',iceC=>{
        console.log("soket");
        
        if(iceC){
            peerConnection.addIceCandidate(iceC);
            console.log(iceC)
            console.log("Added an iceCandidate to existing page presence")
            // setShowCallInfo(false);
        }
    })
    
}

export default clientSocketListeners