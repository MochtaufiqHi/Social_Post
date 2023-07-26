import "./index.css"
import {AiOutlinePlus} from "react-icons/ai"

const FloatingButton = ({show, handleClose, handleShow}) => {
  const handleButtonClick = () => {
    handleShow(true)
    console.log('Floating button clicked!');
  };

  return (
    <button className="floating-button" onClick={handleButtonClick}>
      <i className="fas fa-plus">
        <AiOutlinePlus style={{fontSize:"42px"}} />
        </i> 
    </button>
  );
};

export default FloatingButton;