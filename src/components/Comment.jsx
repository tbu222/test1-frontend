import {
    Container,
    Avatar,
    Details,
    Name,
    Date,
    Text,
    Button,
  } from "../styles/Comment.styled.js";
  import moment from "moment";
  
  import userAvatar from '../assets/avatar.jpg';
  
  const Comment = ({ data, isOwner, handleDelete }) => {
  
  
    return (
      <Container>
        <Avatar
          src={data.userId.img || userAvatar}
        />
        <Details>
          <Name>
            {data?.userId.name}
            <Date>{moment(data?.createdAt).fromNow()}</Date>
          </Name>
          <Text>
            {data?.desc}
          </Text>
        </Details>
  
        {isOwner && <Button onClick={(e)=> handleDelete(e, data._id)}> delete </Button>}
      </Container>
    );
  };
  
  export default Comment;
  