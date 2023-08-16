import styled from 'styled-components';
import { mobile } from '../responsive';
import { tablet } from '../responsive';

const Container = styled.div`
    display: flex;

    ${tablet({flexDirection: "column"})};
    ${mobile({flexDirection: "column"})};
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
    margin: 20px 0;
`;

const SocialContainer = styled.div`
    display: flex;
    
`;

const SocialIcon = styled.i`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #${(props) =>
    (props.bg)};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
    margin-right: 20px;
    transition: all .2s ease; 

    &:hover{
        transform: scale(1.1);
    }
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;        

    ${tablet({display: "none"})};
    ${mobile({display: "none"})};
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List= styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 20px;
    transition: all .2s ease;
    
    &:hover{
        padding-left: 10px;
    }
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;

    ${tablet({backgroundColor: "#fff8f8"})};
    ${mobile({backgroundColor: "#fff8f8"})};
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>KRISH.</Logo>
            <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem odio sapiente iusto aliquam corrupti dicta reiciendis? Quae similique fugit illum, libero harum neque. Perspiciatis, officiis. Amet expedita earum quidem aut.

            </Desc>
            <SocialContainer>
                <SocialIcon bg="3B5999">
                    <i className="fa-brands fa-facebook-square"></i>
                </SocialIcon>
                <SocialIcon bg="E4405F">
                    <i className="fa-brands fa-instagram-square"></i>
                </SocialIcon>
                <SocialIcon bg="55ACEE">
                    <i className="fa-brands fa-behance-square"></i>
                </SocialIcon>
                <SocialIcon bg="E60023">
                    <i className="fa-brands fa-twitter-square"></i>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Woman Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
                <i class="fa-solid fa-location-dot" style={{marginRight: "10px" }}></i>
                622 Mullai Nagar , South Karur 639117
            </ContactItem>
            <ContactItem>
                <i class="fa-solid fa-phone" style={{marginRight: "10px" }}></i>
                +91 96004 56773
            </ContactItem>
            <ContactItem>
                <i class="fa-solid fa-envelope" style={{marginRight: "10px" }}></i>
                contact@krish.com
            </ContactItem>
        </Right>
    </Container>
  )
}

export default Footer
