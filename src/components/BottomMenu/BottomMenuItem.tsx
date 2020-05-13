import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faSitemap,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

import { View, Text } from "react-native";
import { blue, grey } from "../../styles";

type Props = {
  iconName: string;
  isCurrent?: boolean;
 
};

const icons = {
  search: faSearch,
  organization: faSitemap,
  favorite: faStar,
};

const contents = {
  search: "검색",
  organization: "조직도",
  favorite: "즐겨찾기",
};

export const BottomMenuItem = ({ iconName, isCurrent }: Props) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesomeIcon icon={icons[iconName]}  style={{ color: isCurrent ? blue : grey }} size={26} />
      <Text>{contents[iconName]}</Text>
    </View>
  );
};
