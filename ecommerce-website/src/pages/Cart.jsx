import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile, tablet } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const KEY =
  "pk_test_51N8R5uSA5cBdjVnyWYYT8swO5Y4xFMjMxRM7psSee4zBpZHtzpXkt2ZIDaNxGhiMw1eYKus9OqtMeAT43cX8FGp000tTHdRKIC";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  const history = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        history.push("/success", {
          stripeData: res.data,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  const dispatch = useDispatch();

  const trashProduct = (product) => {
    dispatch(removeProduct(product));
  };

  const handleQuantity = (type, index, product) => {
    if (type === "inc") dispatch(increaseQuantity(index));
    else if (type === "dec") dispatch(decreaseQuantity(index));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>
            <Link
              to="/product"
              style={{ textDecoration: "none", color: "black" }}
            >
              CONTINUE SHOPPING
            </Link>
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, key) => {
              return (
                <>
                  <Product>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.title}
                        </ProductName>
                        <ProductID>
                          <b>ID:</b> {product._id}
                        </ProductID>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size:</b> {product.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <i
                          className="fa-solid fa-add"
                          onClick={() => handleQuantity("inc", key, product)}
                        />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <i
                          className="fa-solid fa-minus"
                          onClick={() => handleQuantity("dec", key, product)}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        $ {product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                    <Trash>
                      <TrashButton onClick={() => trashProduct(product)}>
                        <i className="fa-solid fa-trash"></i>
                      </TrashButton>
                    </Trash>
                  </Product>
                  <Hr />
                </>
              );
            })}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Krish Shop"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>Pay Now</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: "10px" })};
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  letter-spacing: 3px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  ${mobile({ padding: "10px" })};
`;

const TopTexts = styled.div`
  ${tablet({ display: "none" })};
  ${mobile({ display: "none" })};
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "black")};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${tablet({ flexDirection: "column" })};
  ${mobile({ flexDirection: "column" })};
`;

const Info = styled.div`
  flex: 3;

  ${mobile({ flexDirection: "column" })};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${tablet({ flexDirection: "column" })};
  ${mobile({ flexDirection: "column" })};
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;

  ${tablet({
    display: "flex",
    flexDirection: "column",
  })}
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;

  ${tablet({
    width: "80%",
    margin: "auto",
    paddingTop: "10px",
    objectFit: "cover",
    height: "380px",
  })};
  ${mobile({ width: "100%" })};
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${tablet({
    margin: "auto",
  })};
`;

const ProductName = styled.span`
  ${tablet({
    marginBottom: "10px",
  })};
`;

const ProductID = styled.span`
  ${tablet({
    marginBottom: "10px",
  })};
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  ${tablet({
    marginBottom: "10px",
  })};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  i {
    cursor: pointer;
  }
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ margin: "5px 15px" })};
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${tablet({ marginBottom: "20px" })};
  ${mobile({ marginBottom: "20px" })};
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  letter-spacing: 3px;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const Trash = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TrashButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  font-size: 20px;
  cursor: pointer;
`;
export default Cart;
