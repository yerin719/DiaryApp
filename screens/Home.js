import React from "react";
import { Text, FlatList } from "react-native";
import { useRealm, useQuery } from "@realm/react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import { useState, useEffect } from "react";

const Container = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  font-weight: 500;
  margin-bottom: 100px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  elevation: 5;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const EmotionContainer = styled.View`
  background-color: white;
  margin-bottom: 10px;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const EmotionText = styled.Text`
  font-size: 24px;
  margin-bottom: 5px;
`;

const MessageText = styled.Text`
  font-size: 16px;
  color: ${colors.textColor};
`;

const Home = ({ navigation: { navigate } }) => {
    const realm = useRealm();
  const [feelings, setFeelings] = useState([]);
  useEffect(() => {
    const feelings = realm.objects("Feeling");
    setFeelings(feelings);
    feelings.addListener(() => {
      const feelings = realm.objects("Feeling");
      setFeelings(feelings);
    });
    return () => {
      feelings.removeAllListeners();
    };
  }, []);

  return (
    <Container>
      <Title>My journal</Title>
      <FlatList
        data={feelings}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <EmotionContainer>
            <EmotionText>{item.emotion}</EmotionText>
            <MessageText>{item.message}</MessageText>
          </EmotionContainer>
        )}
      />
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </Container>
  );
};

export default Home;