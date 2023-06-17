import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceActions } from "../store/ui_slice";
import styled from "styled-components";
import { userSliceActions } from "../store/user_slice";

/*
 * DISPLAYS THE MODAL/POPUP
 */

const Modal = () => {
    const { isModalOpen } = useSelector((store: any) => store.ui);
    const { activeId } = useSelector((store: any) => store.user);
    const dispatch = useDispatch();
    const closeBtnHandler = () => {
        dispatch(uiSliceActions.closeModal());
    }
    return (
        <>
            {isModalOpen &&
                <Wrapper>
                    <div className="modal-overlay" onClick={closeBtnHandler}>
                        <div className="modal-container">
                            <p>Are you sure you want to delete?</p>
                            <button type="button" className="close-modal-btn" onClick={closeBtnHandler}>
                                <IoCloseOutline /> </button>
                            <div className="btn-container">
                                <button type="button" onClick={closeBtnHandler} className="btn-cancel">Cancel</button>
                                <button type="button" onClick={() => { dispatch(userSliceActions.deleteUser({ id: activeId })); }} className="btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            }
        </>
    );
}

const Wrapper = styled.div`
.modal-overlay{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
}
.modal-container{
  background-color: var(--backgroundColor);
  height: 25vh;
  width: 40vw;
  min-width: 300px;
  max-width: var(--max-width);
  border-radius: var(--borderRadius);
  border: 1px solid var(--grey-400);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 2rem 1.5rem;
  position: relative;
  margin: 5rem auto;
  display: grid;
  grid-template-rows: 1fr 1fr;
}
.modal-container p{
    font-size: clamp(14px, 3vw, 16px);
}
/* ================= BUTTON STYLES ==================*/
.close-modal-btn{
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 2rem;
    background-color: transparent;
    border-color: transparent;
    color: var(--grey-500);
    cursor: pointer;
    transition: var(--transition);
}
.close-modal-btn:hover{
    color: var(--grey-700);
}
.btn-container{
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    align-self: end;
}
.btn-cancel, .btn-danger{
    border: transparent; 
    height: 40px;
    padding: 1rem 2rem;
    border-radius: var(--borderRadius);
    transition: var(--transition);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-danger{ 
    color: var(--grey-100);
    background: var(--btn-danger-light);
    border: transparent;
}
.btn-cancel{ 
    background: transparent;
    border: 1px solid var(--grey-300);
 }
.btn-danger:hover{ background: var(--btn-danger-dark); }
.btn-cancel:hover{ border-color: var(--grey-900); }

/* ============ MEDIA QUERIES ========= */
@media (max-width: 1080px) {
    .modal-container{
        width: 50vw;
    }
}
@media (max-width: 640px) {
    .modal-container{
        width: 70vw;
    }
}
@media (max-width: 480px) {
    .modal-container{
        width: 80vw;
    }
}
`;

export default Modal;