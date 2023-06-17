import { useSelector } from "react-redux";
import Celebrity from "./Celebrity";
import styled from "styled-components";
import { celebritiesDataType } from "../store/user_slice";

/*
 * DISPLAYS THE LIST OF CELEBRITIES
 */
const CelebrityList = () => {
    const { celebritiesData, activeId } = useSelector((store: any) => store.user);
    const { searchInput } = useSelector((store: any) => store.ui);

    return (
        <Wrapper>
            {celebritiesData.filter((item: celebritiesDataType) => `${item.first} ${item.last}`.toLowerCase()
                .match(searchInput.toLowerCase().trim()))
                .map((data: any) => {
                    return <Celebrity key={data.id} {...data} activeId={activeId} />
                })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
margin-top: 1.5rem;
`;

export default CelebrityList;