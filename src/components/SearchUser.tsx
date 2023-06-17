import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { uiSliceActions } from "../store/ui_slice";

/*
 * ALLOWS THE USER TO SEARCH A PARTICULAR USER 
 */

const SearchUser = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const { searchInput } = useSelector((store: any) => store.ui);
    const dispatch = useDispatch();
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(uiSliceActions.setSearchInput({ value: e.target.value }))
        if (e.target.value.trim().length > 0) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }
    return (
        <Wrapper>
            {!isActive && <CiSearch />}
            <input type="search" placeholder="search user" value={searchInput} onChange={handleChange} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
position: relative;
display: flex;  
align-items: center;
width: 100%;
svg{
    position: absolute;
    left: 1rem;
    color: var(--grey-500);
}
input{
    padding: 0.5rem 1rem 0.5rem 1rem;
    width: 100%;
    font-size: 1rem;
    border-radius: var(--borderRadius);
    border: 1px solid var(--grey-300);
}
input::placeholder{
    font-family: inherit;
    color: var(--grey-500);
    font-weight: 100;
    padding-left: 1.5rem;
}
input:focus{
    outline: none;
}
`;

export default SearchUser;