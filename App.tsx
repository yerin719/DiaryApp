import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;  

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #666;
`;

function App(): React.JSX.Element {
  return (

    <Container>
      <Title>Welcome to My Diary App</Title>
      <Subtitle>Start writing your story</Subtitle>
    </Container>
  );
}

export default App;
