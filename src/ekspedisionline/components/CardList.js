import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import Card from '../../general/components/UI/Card';
import Colors from '../../general/constants/Colors';

const CardList = props => {
  const formatDate = date => {
    const formattedDate = moment(new Date(date)).format('D MMM yyyy');
    return formattedDate;
  };

  const CardContent = () => {
    return (
      <Card style={styles.document}>
        <View style={styles.content}>
          <View style={styles.details}>
            <View style={styles.row}>
              <Text>Tanggal Dibuat</Text>
              <Text>{formatDate(props.creationDate)}</Text>
            </View>
            <View style={styles.row}>
              <Text>Resi Barang</Text>
              <Text style={{fontWeight: 'bold'}}>{props.resiBarang}</Text>
            </View>
            <View style={styles.row}>
              <Text>Pengirim</Text>
              <Text>{props.pengirim}</Text>
            </View>
            <View style={styles.row}>
              <Text>Penerima</Text>
              <Text>{props.penerima}</Text>
            </View>
            <View style={styles.row}>
              <Text>Status</Text>
              <Text>{props.status}</Text>
            </View>
          </View>
          {/* <TouchableOpacity onPress={props.onDelete}>
          <View style={styles.deleteContainer}>
            <Icon name="trash-o" size={20} color="white" />
          </View>
        </TouchableOpacity> */}
        </View>
      </Card>
    );
  };

  if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback
          onPress={props.onClick}
          background={TouchableNativeFeedback.Ripple('white', false)}
          useForeground={true}>
          {/* <View style={styles.touchable}>
            <Text style={styles.text}>TouchableNativeFeedback</Text>
          </View> */}
          <View style={styles.touchable}>
            <CardContent />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.onClick} activeOpacity={0.5}>
        <CardContent />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
  },
  touchable: {flex: 0.5, borderRadius: 8, overflow: 'hidden'},
  document: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  content: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  details: {
    padding: 10,
  },
  creator: {
    fontSize: 45,
    marginVertical: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  deleteContainer: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default CardList;
