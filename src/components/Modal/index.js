import {Modal, Button} from "react-bootstrap"


function ModalContent({show, handleClose ,data, viewId}) {
    return ( 
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Body Info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data.map(item => {
                        if(item.id === viewId){
                            return item.body
                        }
                    })}
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='second' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
     );
}

export default ModalContent;