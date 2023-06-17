import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCaretUp, RxCaretDown } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";
import { SlCheck, SlClose, SlPencil } from "react-icons/sl";
import styled from "styled-components";
import { uiSliceActions } from "../store/ui_slice";
import { userSliceActions } from "../store/user_slice";

/**
 * USES REDUX STORE TO ACCESS AND MANAGE CELEBRITY DATA
 * @returns REACT ELEMENT WHICH DISPLAYS A PARTICULAR CELEBRITY DATA
*/

const genders = ["Male", "Female", "Transgender", "Rather not say", "Other"];

const Celebrity = ({ id, first, last, dob, gender, picture, country, description, activeId }: any) => {
    const [user, setUser] = useState({
        name: `${first} ${last}`, age: `${new Date().getFullYear() - Number(dob.slice(0, 4))}`, gender,
        country, description
    });
    const [enableSubmit, setEnableSubmit] = useState<boolean>(false);

    const { isEditable } = useSelector((store: any) => store.ui);
    const dispatch = useDispatch();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const isActive: boolean = id === activeId;

    useEffect(() => {
        if (textareaRef.current && isActive) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px"
        }
    }, [user.description, isActive]);


    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setEnableSubmit(true);
    }

    const onKeyDown = (e: any) => {
        if (!e.key.match(/[A-Za-z ]/)) {
            e.preventDefault();
        }
    }

    const handleEdit = () => {
        if (Number(user.age) > 18) {
            dispatch(uiSliceActions.toggleEdit(true));
        }
    }

    const handleDelete = () => {
        dispatch(uiSliceActions.openModal());
    }

    const handleCancel = () => {
        dispatch(uiSliceActions.toggleEdit(false));
        setEnableSubmit(false);
        setUser({
            ...user, name: `${first} ${last}`, age: `${new Date().getFullYear() - Number(dob.slice(0, 4))}`, gender,
            country, description
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { age, country, description, gender, name } = Object.fromEntries([...formData.entries()])
        setEnableSubmit(false);
        dispatch(userSliceActions.updateUser({ id, age, country, description, gender, name }));
        dispatch(uiSliceActions.toggleEdit(false));
    }

    return (
        <Wrapper className="question">
            <form onSubmit={handleSubmit}>
                <header>
                    <div className="img-container">
                        <img src={picture} alt={user.name} className="img" />
                    </div>
                    <div className="user-name">
                        <input type="text" value={user.name} name="name" onChange={handleChange} readOnly={isEditable ? false : true}
                            className={`${isEditable ? 'editable' : ''}`} required />
                    </div>
                    <button type="button" className="dropdown-btn" onClick={() => { dispatch(userSliceActions.toggleList({ id })) }}
                        disabled={isEditable ? true : false}>
                        {isActive ? <RxCaretUp /> : <RxCaretDown />}
                    </button>
                </header>
                {
                    isActive && (<>
                        <div className="user-details">
                            <div className="form-row">
                                <label htmlFor="age" className="form-label">Age</label>
                                <input type="number" min={1} max={200} id="age" name="age" value={user.age} onChange={handleChange} readOnly={isEditable ? false : true}
                                    className={`${isEditable ? 'editable' : ''}`} required />
                                {!isEditable && <span>years</span>}
                            </div>
                            <div className="form-row">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select name="gender" value={user.gender} onChange={handleChange} className={`${isEditable ? 'editable' : ''}`}>
                                    {genders.map((gender, index) => {
                                        return <option key={index} value={gender}>{gender}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-row">
                                <label htmlFor="country" className="form-label">Country</label>
                                <input type="text" id="country" name="country" value={user.country} onChange={handleChange} onKeyDown={onKeyDown}
                                    readOnly={isEditable ? false : true} className={`${isEditable ? 'editable' : ''}`} required />
                            </div>
                        </div>
                        <div className="user-description">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea name="description" value={user.description} onChange={handleChange} ref={textareaRef}
                                id="description" readOnly={isEditable ? false : true} className={`${isEditable ? 'editable' : ''}`} required />
                        </div>
                        <div className="btn-container">
                            {isEditable ? (<>
                                <button type="button" onClick={handleCancel} className="btn-danger"><SlClose /></button>
                                <button type="submit" className="btn-edit" disabled={enableSubmit ? false : true}><SlCheck /></button>
                            </>)
                                : (<>
                                    <button type="button" onClick={handleDelete} className="btn-danger"><RiDeleteBinLine /></button>
                                    <button type="button" onClick={handleEdit} className="btn-edit"><SlPencil /></button>
                                </>)
                            }
                        </div>
                    </>
                    )
                }
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.article`
header{
    display: grid;
    grid-template-columns: 60px 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
}

header input{
    justify-self: end;
    font-weight: 600;
    line-height: 1.5;
    color: var(--grey-700);
    border: transparent;
    font-size: clamp(14px, 4vw, 20px);
    outline: none;
    background: transparent;
    width: 100%;
}

.img-container{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid var(--grey-300);
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 100%;
        display: block;
        border-radius: 50%;
        filter: grayscale(100%);
        object-fit: cover;
        padding: 0.2rem;
    }
}

.user-details{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
    margin-top: 1rem;
}

.form-label{
    color: var(--grey-500);
    display: block;
    margin-bottom: 0.4rem;
    font-size: var(--small-text);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
}

.user-details input, .user-details select{
    background: transparent;
    width: 100%;
    border: transparent;
    outline: none;
}
.user-details select{
    appearance: none;
    pointer-events: none;
}

.user-details .form-row:first-child{
    position: relative;
    span{
        position: absolute;
        left: 1.7rem;
        down: 0;
    }
}

.user-description{
    margin-top: 1rem;
}

textarea{
    line-height: 1.7;
    resize: none;
    overflow: auto;
    height: auto;
    min-width: 100%;
    outline: none;
    border: transparent;
    background: transparent;
}
textarea::-webkit-scrollbar{
    height: 0;
    width: 0;
}

.user-details .editable, .user-description .editable, header .editable{
    padding: 0.35rem 0.45rem;
    border: 1px solid var(--grey-300);
    border-radius: 8px;
}
.user-details select.editable{
    appearance: auto;
    pointer-events: initial;
}
  
.dropdown-btn{
    justify-self: end;
    background-color: transparent;
    border-color: transparent;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        width: 1.5rem;
        height: 1.5rem;
        color: var(--grey-500);
    }
}

.btn-container{
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
}
.btn-edit, .btn-danger{
    background: transparent;
    border: transparent;
    cursor: pointer;
    transition: var(--transition);
    svg{
        width: 1.2rem;
        height: 1.2rem;
    }
}
.btn-danger{ color: var(--btn-danger-light); }
.btn-edit{ color: var(--btn-success-light); }
.btn-danger:hover{ color: var(--btn-danger-dark); }
.btn-edit:hover{ color: var(--btn-success-dark); }

.btn-container button[disabled]{
    color: var(--grey-400);
    cursor: default;
}

@media (max-width: 480px) {
    .user-details{
        column-gap: 1rem;
    }
}
`;

export default Celebrity;