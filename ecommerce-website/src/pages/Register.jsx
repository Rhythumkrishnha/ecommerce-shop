import styled from "styled-components";
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";

const Container = styled.div`
  width: 100wh;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;

  ${tablet({ width: "80%" })};
  ${mobile({ width: "80%" })};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 3px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  padding: 15px 20px;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const registerUser = async () => {
      try {
        await publicRequest.post("/auth/register", {
          username,
          email,
          password,
        });
        login(dispatch, { username, password });
      } catch {}
    };
    registerUser();
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="First name"></Input>
          <Input placeholder="Last name"></Input>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Input type="password" placeholder="Confirm Password"></Input>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
