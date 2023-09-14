import { useState } from "react";
import API from "../../api/api.js";
import {
  Container,
  Wrapper,
  Title,
  SubTitle,
  Input,
  Button,
  More,
  Links,
  Link,
  Form,
} from "./SignIn.styled.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/userSlice.js";
import {signInWithPopup} from "firebase/auth"
import {auth, provider} from "../../firebase/firebase.js";

const SignIn = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const signInWithGoogle = async()=>{
        dispatch(loginStart())
        signInWithPopup(auth, provider).then((result)=>{
            API.post(`/auth/google`,{
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL,
            }).then((res)=>{
                dispatch(loginSuccess(res.data));
                navigate('/');
            })
        }).catch((error)=>{
            dispatch(loginFailure())
        });
    };
    const handleLogin = async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res = await API.post(`/auth/signin`, { name, password });
            dispatch(loginSuccess(res.data));
            navigate('/');
        }catch(err){
            dispatch(loginFailure());
        }
    };
    const handleSignUp = async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res = await API.post(`/auth/signup`, { name, email, password });
            dispatch(loginSuccess(res.data));
            navigate('/');
        }catch(err){
            dispatch(loginFailure());
        }
    };

  return (
    <Container>
        <Wrapper>
            <Title>Sign in</Title>
            <SubTitle>to continue to Youtube</SubTitle>
            <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
            <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
            <Button onClick={handleLogin}>Sign in</Button>
            <Title> or </Title>
            <Button onClick={signInWithGoogle}>Google Signin</Button>
            <Title> or </Title>
            <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
            <Input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
            <Button onClick={handleSignUp}>Sign up</Button>
        </Wrapper>
        <More>
            English(USA)
            <Links>
                <Link>Help</Link>
                <Link>Privacy</Link>
                <Link>Terms</Link>
            </Links>
        </More>
    </Container>
  );
};

export default SignIn;
