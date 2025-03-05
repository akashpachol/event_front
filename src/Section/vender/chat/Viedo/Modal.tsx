import { IoVideocamOutline } from 'react-icons/io5';
import { Modal } from "@mui/material";

type makeCall = {
  open: boolean; 
  onHide: () => void; 
  onAccept: () => void; 
  onReject: () => void; 
};
const ModalViedo:React.FC<makeCall> = ({open,onHide,onAccept,onReject}) => {
  return (

    <>
{
  open &&(<Modal
              open={open}
              onClose={onHide}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div>
                <div className="min-h-screen flex  justify-center items-center">
                  <div className="bg-white flex w-1/3  flex-col justify-center items-center p-6">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <IoVideocamOutline className="text-primary w-12 h-12" />
                      <h2 className="text-2xl font-bold">
                        Incoming Video Call
                      </h2>
                      <div className="flex items-center gap-4">
                        <div className="border-2 border-primary">
                          <img
                            className="w-10 h-10 rounded-full border-0"
                            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                            alt="Rounded avatar"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium">John Doe</p>
                          <p className="text-muted-foreground">Calling...</p>
                        </div>
                      </div>
                      <div className="flex gap-4 w-full">
                        <button
                         onClick={onReject}
                          className="flex-1 bg-gradient-to-r text-white from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Reject
                        </button>
                        <button
                      onClick={onAccept}
                          className="flex-1 bg-gradient-to-r  text-white from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>)
}

    </>
   
  );
}

export default ModalViedo;
