import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightblue;
  }
`;

const TitleText = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const Button = styled.button`
  float: right;
  padding: 2px 5px;
`;

function PostListItem({ post, conClick }) {
  return (
    <Wrapper>
      <TitleText>{post.title}</TitleText>
      <Button title="삭제" onClick={handleDelete}>
        삭제
      </Button>
    </Wrapper>
  );
}
export default PostListItem;
