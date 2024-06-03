import { StyleSheet, View, Image } from 'react-native';

export function Carousel({ id = 1 }: { id: number }) {
  return (
    <View style={styles.container}>
      {id === 0 && (
        <Image
          style={styles.img}
          source={require('@/assets/images/logo.png')}
        />
      )}

      {id === 1 && (
        <Image
          style={styles.img}
          source={require('@/assets/images/banner02.png')}
        />
      )}

      {id === 2 && (
        <Image
          style={styles.img}
          source={require('@/assets/images/banner03.png')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: 410,
  },
});
