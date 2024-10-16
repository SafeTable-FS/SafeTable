import axios from "axios";
import fisherYatesShuffle from "./fisherYatesShuffle";

const serverURL = process.env.REACT_APP_SERVER_PORT_URL;
const restaurantAPIKey = process.env.REACT_APP_RESTAURANT_API_KEY;

// 안심식당 전체 조회 함수
export const fetchEntireRestaurants = async (pageParam) => {
  const startIndex = (pageParam - 1) * 100 + 1;
  const endIndex = pageParam * 100;

  try {
    const response = await axios.get(
      `${serverURL}/api/restaurants/openapi/${restaurantAPIKey}/json/Grid_20200713000000000605_1/${startIndex}/${endIndex}?RELAX_SI_NM=서울특별시`
    );

    const data = response.data.Grid_20200713000000000605_1.row;
    if (!data || data.length === 0) {
      return { data: [], nextCursor: undefined };
    }

    const shuffledData = await fisherYatesShuffle(data);

    return { data: shuffledData, nextCursor: pageParam + 1 };
  } catch (error) {
    console.error("안심식당 전체 정보 조회 중 에러 발생", error);
  }
};

// 검색된 입력값에 따른 식당 정보 조회 요청
export const fetchRestaurantByInput = async (searchedValue, pageParam) => {
  const splittedValue = searchedValue.split(" ");
  const encodedSi = encodeURIComponent(splittedValue[0]);
  const encodedSido = encodeURIComponent(splittedValue[1]);

  const startIndex = (pageParam - 1) * 100 + 1;
  const endIndex = pageParam * 100;

  try {
    const response = await axios.get(
      `${serverURL}/api/restaurants/openapi/${restaurantAPIKey}/json/Grid_20200713000000000605_1/${startIndex}/${endIndex}?RELAX_SI_NM=${encodedSi}&RELAX_SIDO_NM=${encodedSido}`
    );

    const restaurantData = response.data.Grid_20200713000000000605_1?.row || [];

    if (!restaurantData || restaurantData.length === 0) {
      return { data: [], nextCursor: undefined };
    }

    return { data: restaurantData, nextCursor: pageParam + 1 };
  } catch (error) {
    console.error("지역명에 따른 식당 패치 중 에러 발생", error);
  }
};

// autocomplete을 위한 입력값에 따른 시군구 open api 지역명 요청
export const fetchRegionsByInput = async (inputValue) => {
  try {
    const response = await axios.get(
      `${serverURL}/api/locations/2ddata/adsigg/data?apiKey=${
        process.env.REACT_APP_LOCATION_API_KEY
      }&domain=${
        process.env.REACT_APP_LOCATION_DOMAIN
      }&filter=full_nm:like:${encodeURIComponent(
        inputValue
      )}&output=json&pageIndex=1&pageUnit=10`
    );

    const featuresOfRegions = response.data.featureCollection?.features || [];
    const regionNames = featuresOfRegions.map(
      (feature) => feature.properties.full_nm
    );

    return regionNames;
  } catch (error) {
    console.error("입력값에 따른 지역명 패치 중 에러 발생", error);
  }
};

// 검색 핸들러
export const searchHandler = (selectedValue, setIsWarned, setSearchedValue) => {
  if (!selectedValue) {
    setIsWarned(true);
  } else {
    setSearchedValue(selectedValue);
    setIsWarned(false);
  }
};