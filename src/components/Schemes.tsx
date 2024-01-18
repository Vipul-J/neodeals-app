import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
 import { formatDate } from '../helpers/indes';

interface Scheme {
  _id: string;
  schemeName: string;
  schemePrizeTitle: string;
  schemeDesc: string;
  startDate: string;
  bannerImg: string;
}

const getBgColor = (n: number): string => {
  return n % 2 === 0 ? '#F6E97466' : '#2A2A2A66';
};

interface SchemeCardProps {
  n: number;
  schemeId: string;
  schemeName: string;
  prizeTitle: string;
  schemeDesc: string;
  startDate: string;
  bannerImg: string;
}

const SchemeCard: React.FC<SchemeCardProps> = ({
  n,
  schemeName,
  prizeTitle,
  schemeDesc,
  startDate,
  bannerImg,
  schemeId,
}) => {
  const bgColor = getBgColor(n);

  const schemeRoute = `/scheme/${schemeId}`;

  return (
    <View style={[styles.fullContainer, { backgroundColor: bgColor }]}>
      <View style={styles.cardContainer}>
        <View style={styles.imgContainer}>
          <Image source={{ uri: bannerImg }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.schemeName}>{schemeName}</Text>
          <Text style={styles.prizeTitle}>{prizeTitle}</Text>
          <Text style={styles.schemeDesc}>{schemeDesc}</Text>
          <Text style={styles.startDate}>Started at: {startDate}</Text>
          <View style={styles.hr} />
          <TouchableOpacity onPress={() => schemeRoute}>
            <Text style={styles.viewScheme}>View Scheme →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Schemes: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[] | null>(null);

  const fetchSchemes = async () => {
    try {
      const res = await axios.get<Scheme[]>(`http://neodeals.in:4002/api/scheme/getAllSchemes`);
      console.log(res.data);
      setSchemes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  return (
    <View style={styles.container}>
      {schemes?.map((scheme, index) => (
        <SchemeCard
          key={scheme?._id}
          n={index}
          schemeId={scheme?._id}
          schemeName={scheme?.schemeName}
          prizeTitle={scheme?.schemePrizeTitle}
          schemeDesc={scheme?.schemeDesc}
          startDate={formatDate(scheme?.startDate)}
          bannerImg={scheme?.bannerImg}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  fullContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgContainer: {
    width: '30%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    width: '70%',
    backgroundColor: '#fff',
    padding: 10,
  },
  schemeName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  prizeTitle: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
  schemeDesc: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  startDate: {
    textAlign: 'center',
    color: 'green',
  },
  hr: {
    width: '50%',
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  viewScheme: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Schemes;
