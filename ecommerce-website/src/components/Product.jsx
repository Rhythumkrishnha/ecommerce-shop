import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f5fbfd;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: center;
  margin: auto;
`;

const Info = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;

  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.div`
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  cursor: pointer;
  color: black;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Icon>
          <i className="fa-solid fa-shopping-cart" />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <i className="fa-solid fa-magnifying-glass" />
          </Link>
        </Icon>
        <Icon>
          <i className="fa-solid fa-heart" />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
