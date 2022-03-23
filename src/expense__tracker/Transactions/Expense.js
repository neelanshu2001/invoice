import React,{useState} from "react";
import { View, StyleSheet,ScrollView } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Animated, { eq, interpolate } from "react-native-reanimated";

import { withTransition } from "react-native-redash";
import theme, { Box, Text } from "../../components/theme";
import { Delete } from "../Svgs";

const Expense = ({ index, transition, onTap, onDelete, item, allDates }) => {
  const [open,setOpen]=useState(false)
  const isActive = eq(transition, index);
  const activeTransition = withTransition(isActive, { duration: 200 });

  const toggle=()=>{
    setOpen(!open)
  }
  const delX = interpolate(activeTransition, {
    inputRange: [0, 1],
    outputRange: [-100, 20],
  });

  const hidePrice = interpolate(activeTransition, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          onTap();
        }}
      >
        <Animated.View>
          <Box
            overflow="visible"
            paddingHorizontal="l"
            borderBottomWidth={1}
            borderBottomColor="silver"
            height={50}
            position="relative"
          >
            <ScrollView style={[StyleSheet.absoluteFill, {}]}>
              <Animated.View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  padding: theme.spacing.l,
                }}
              >
                <Animated.View style={{flexDirection:"column"}}>
                <TouchableOpacity
                  onPress={() => {
                    toggle();
                  }}
                >
                <Animated.View style={{flexDirection: "row",justifyContent: "space-between"}}>
                  <Animated.View style={{paddingHorizontal:10, backgroundColor:item.autoDebit.valid?'#94F986':'',borderRadius:4}}>
                  <Animated.Text style={{fontWeight:'bold'}} >{item.title}</Animated.Text>
                  </Animated.View>
                  <Animated.View>
                  <Animated.Text style={{marginHorizontal:theme.spacing.l, backgroundColor:'#349A72',paddingHorizontal:10,color:'#fff'}}>{item.type}</Animated.Text>
                  </Animated.View>
                </Animated.View>
                </TouchableOpacity>
                {open?(<View><Animated.Text style={{fontSize:12,fontStyle:"italic",textAlign:"center"}}>{"Description : "} {item.description}</Animated.Text>{item.autoDebit.valid?<View><Animated.Text style={{fontSize:12,fontStyle:"italic",textAlign:"center"}}>{"Debt : "} {item.autoDebit.price}</Animated.Text><Animated.Text style={{fontSize:12,fontStyle:"italic",textAlign:"center"}}>{"Scheduled : "} {new Date(item.autoDebit.nextTime).toUTCString()}</Animated.Text></View>:null}</View>):null}
                </Animated.View>
                <Animated.Text
                  style={{
                    opacity: hidePrice,
                    color: item.price > 0 ? "#009BFC" : "#FF4500",
                  }}
                >
                  {item.price > 0
                    ? `Rs ${item.price}`
                    : `- Rs ${Math.abs(item.price)}`}
                </Animated.Text>
              </Animated.View>
            </ScrollView>

            <Animated.View
              style={{
                fontSize: 12,
                color: "white",
                fontWeight: "900",
                position: "absolute",
                height: 50,
                width: "14%",
                right: delX,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <Text>
                <TouchableOpacity
                  onPress={() => {
                    onDelete(index);
                  }}
                >
                  <Delete />
                </TouchableOpacity>
              </Text>
            </Animated.View>
          </Box>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flex: 1,
  },
});

export default Expense;
