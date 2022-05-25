/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import List from './src/components/List';
import io from 'socket.io-client';

const App = () => {
  const [pageSize, setPageSize] = useState(10);
  const [pageData, setPageData] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [extraInfoData, setExtraInfoData] = useState([]);
  const [value, setValue] = useState('');
  const [extraInfo, setExtraInfo] = useState({});
  useEffect(() => {
    fetch('https://quotes.instaforex.com/api/quotesList')
      .then(res => res.json())
      .then(data => {
        setData(data.quotesList);
      });

    fetch('https://quotes.instaforex.com/api/quotesTick')
      .then(res => res.json())
      .then(data => {
        setExtraInfoData(data);
      });
  }, []);

  useEffect(() => {
    const getPaginatedData = () => {
      const startIndex = currentPage * pageSize - pageSize;
      const endIndex = startIndex + pageSize;
      setPaginated(data.slice(startIndex, endIndex));
    };

    const getPaginationGroup = () => {
      let start = Math.floor((currentPage - 1) / 1) * 10;
      setPageData(new Array(10).fill().map((_, idx) => start + idx + 1));
    };

    getPaginationGroup();

    getPaginatedData();
  }, [currentPage, data, value]);
  const getFilteredData = () => {
    let value = value?.toLowerCase();
    let result = [];
    result = paginated.filter(data => {
      return data.symbol.search(value) != -1;
    });
    console.log(result, 'dsdsa');
    setPaginated(result);
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.main}>
        <View style={styles.sectionContainer}>
          <TextInput
            style={styles.searchbar}
            value={value}
            onChangeText={e => {
              setValue(e);
            }}
            onSubmitEditing={() => {
              getFilteredData();
              console.log('submit');
            }}
            placeholder="search"
          />
          <List
            data={paginated}
            setInfo={setInfo}
            info={info}
            setExtraInfo={setExtraInfo}
            extraInfoData={extraInfoData}
          />
        </View>
        <View style={styles.pagination}>
          <TouchableOpacity onPress={() => setCurrentPage(currentPage - 1)}>
            <View style={styles.pageButtonLeft} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>
            {pageData.slice(-1).pop()} of {data.length}
          </Text>
          <TouchableOpacity onPress={() => setCurrentPage(currentPage + 1)}>
            <View style={styles.pageButtonRight} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.sectionContainer}>
          <Text style={styles.infoText}>Symbol: {info.symbol}</Text>
          <Text style={styles.infoText}>Description: {info.description}</Text>
          <Text style={styles.infoText}>Digits: {info.digits}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#eee',
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  main: {
    flex: 1,
    justifyContent: 'space-between',
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  pageButtonLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderRightWidth: 40,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'silver',
  },
  pageButtonRight: {
    width: 0,
    height: 0,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderLeftWidth: 40,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'silver',
  },
  searchbar: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'silver',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default App;
