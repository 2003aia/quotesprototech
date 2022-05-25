import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  FlatList,
  TextInput,
} from 'react-native';

const List = ({data, setInfo, info, setExtraInfo, extraInfoData}) => {
  const renderItem = ({item}) => {
    const backgroundColor = item.symbol === info.symbol ? 'grey' : '#eee';
    const color = item === info ? 'white' : 'black';

    

    return (
      <TouchableOpacity
        onPress={() => {
          setInfo(item);
          extraInfoData.filter(d => {
            if (d.digits === item.digits) setExtraInfo(d);
          });
        }}>
        <View style={[styles.background, {backgroundColor: backgroundColor}]}>
          <Text style={[styles.text, {color: color}]}>{item.symbol}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.symbol}
      renderItem={renderItem}
    />
  );
};
const styles = StyleSheet.create({
  background: {
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
    borderWidth: 1,
    marginVertical: 2,
  },
  text: {
    fontSize: 18,
    /* color: 'black', */
  },
});

export default List;
