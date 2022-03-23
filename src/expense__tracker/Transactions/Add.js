import React, { useRef, useState } from "react";
import { StyleSheet, Dimensions, TextInput,Picker } from "react-native";
import {
  BorderlessButton,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";

import theme, { Box, Text } from "../../components/theme";
import { BackArrow } from "../Svgs";
import { addTransaction } from "../../../store/actions/transactionActions";
import { useDispatch } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import Animated from "react-native-reanimated";

/* Dimension */
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 3,
    paddingTop: 40,
    padding: theme.spacing.l,
    bottom: 0,
  },
});

const Add = ({ navigation }) => {
  const dispatch = useDispatch();
  const { navigate } = navigation;
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [autoDebit, setautoDebit] = useState({valid:false,nextTime:null,price:"",type:"1 min"});
  const titleRef = useRef(null);

  const onPop = () => {
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
  };

  const onSubmit = () => {
    const transaction = {
      price,
      title,
      description,
      type,
      autoDebit,
    };

    if (!price || !title || !description || !type) return alert("Details Empty");

    dispatch(addTransaction(transaction));
    setPrice("");
    setTitle("");
    setDescription("");
    setType("");
    setautoDebit({valid:false,nextTime:null,price:"",type:"1 min"});
    navigate("Transactions");
  };

  return (
    <Box padding="l" flex={1}>
      <Box flexDirection="row" alignItems="center" paddingTop="l">
        <TouchableOpacity onPress={onPop}>
          <Box>
            <BackArrow />
          </Box>
        </TouchableOpacity>

        <Text
          variant="title1"
          color="primary2"
          style={{ marginLeft: 30, fontSize: 18 }}
        >
          Add Amount
        </Text>
      </Box>

      <Box  flexDirection="column" marginTop="xl">
        <Box
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          borderBottomWidth={2}
          paddingBottom="s"
          marginTop="m"
        >
          <Text variant="title" color="primary">
            
          </Text>

          <TextInput
            placeholderTextColor={theme.colors.primary}
            placeholder="Amount"
            keyboardType="number-pad"
            style={{
              padding: 10,
              fontSize: 30,
              fontFamily: "RRegular",
              width: "80%",
            }}
            onChangeText={(price) => setPrice(price)}
            autoFocus={true}
            onSubmitEditing={() => titleRef.current.focus()}
            defaultValue={price}
          />

          <Text variant="title" color="primary" style={{ fontSize: 20 }}>
            INR
          </Text>
        </Box>

        <Box marginTop="xl" borderBottomWidth={2}>
          <TextInput
            ref={titleRef}
            placeholderTextColor={theme.colors.primary}
            placeholder="Expenses made for"
            defaultValue={title}
            style={{
              fontSize: 30,
              fontFamily: "RRegular",
              width: "80%",
            }}
            onChangeText={(title) => setTitle(title)}
          />
        </Box>

        <Box marginTop="xl" borderBottomWidth={2}>
          <TextInput
            ref={titleRef}
            placeholderTextColor={theme.colors.primary}
            placeholder="Type"
            defaultValue={type}
            style={{
              fontSize: 12,
              fontFamily: "RRegular",
              width: "80%",
            }}
            onChangeText={(type) => setType(type)}
          />
        </Box>

        <Box marginTop="xl" borderBottomWidth={2}>
          <TextInput
            ref={titleRef}
            placeholderTextColor={theme.colors.primary}
            placeholder="Description"
            defaultValue={description}
            style={{
              fontSize: 12,
              fontFamily: "RRegular",
              width: "80%",
            }}
            onChangeText={(description) => setDescription(description)}
          />
        </Box>
        <Box  style={{flexDirection:'row',alignItems:'center',marginTop:2}}>
        <CheckBox
    disabled={false}
    value={autoDebit.valid}
    onValueChange={(newValue) => setautoDebit({...autoDebit,valid:newValue})}
  />
  <Text style={{color:'#000'}}>AutoDebit</Text>
  </Box>
  {autoDebit.valid?
      <Box>
        <Picker selectedValue={autoDebit.type} style={{}} onValueChange={(itemValue,itemIndex)=>{setautoDebit({...autoDebit,
        type:itemValue})}}>
          <Picker.Item label="1 min" value="1 min"/>
          <Picker.Item label="1 month" value="1 month"/>
          <Picker.Item label="half year" value="half year"/>
          <Picker.Item label="year" value="year"/>
        </Picker> 
        <Box
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          borderBottomWidth={2}
          paddingBottom="s"
          marginTop="m"
        >
        <TextInput
        placeholderTextColor={theme.colors.primary}
        placeholder="Debt"
        keyboardType="number-pad"
        style={{
          paddingVertical: 4,
          paddingLeft:10,
          fontSize: 15,
          fontFamily: "RRegular",
          width: "80%",
        }}
        onChangeText={(price) => setautoDebit({...autoDebit,price})}
        autoFocus={true}
        onSubmitEditing={() => titleRef.current.focus()}
        defaultValue={autoDebit.price}
      />

      <Text variant="title" color="primary" style={{ fontSize: 20 }}>
        INR
      </Text>
      </Box>
      </Box>:null}
        <Box marginTop="xl">
          <BorderlessButton onPress={onSubmit}>
            <Box
              borderRadius="l"
              height={55}
              backgroundColor="primary"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant="title1">Submit</Text>
            </Box>
          </BorderlessButton>
        </Box>
       
      </Box>
    </Box>
  );
};

export default Add;
