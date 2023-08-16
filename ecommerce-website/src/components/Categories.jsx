import styled from "styled-components"
import { categories } from '../data';
import CategoriesItem from './CategoriesItem';
import { mobile, tablet } from '../responsive';

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;

    ${tablet({padding: "0px 10px", flexDirection: "column"})};
    ${mobile({padding: "0px", flexDirection: "column"})};
`

const Categories = () => {
  return (
    <Container> 
        {categories.map((item) =>(
            <CategoriesItem item={item} key={item.id} />
        ))}
    </Container>
  )
}

export default Categories
