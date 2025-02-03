import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiLibrary = axios.create({
  baseURL: BASE_URL + "/library",
});

const apiProperty = axios.create({
  baseURL: BASE_URL + "/property",
});

const apiRule = axios.create({
  baseURL: BASE_URL + "/rule",
});

const apiSearchLibrary = async (data: {
  libraryName: string;
  propertyName: string;
}) => {
  try {
    const response = await apiLibrary.post("/search", data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiDetailProperty = async (propertyId: string) => {
  try {
    const response = await apiProperty.get("/detail/" + propertyId);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiSummaryLibrary = async (libraryId: string) => {
  try {
    const response = await apiLibrary.get(`/${libraryId}/summary`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiRuleList = async (libraryId: string) => {
  try {
    const response = await apiRule.get(`/${libraryId}/rules`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiValidateRule = async (
  ruleId: string,
  data: {
    ruleName: string;
    isEU: boolean;
    isHqRule: boolean;
    keyWord: string[];
    isShopSection: boolean;
  }
) => {
  try {
    const response = await apiRule.post(`/${ruleId}/validate`, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export {
  apiDetailProperty,
  apiLibrary,
  apiRuleList,
  apiSearchLibrary,
  apiSummaryLibrary,
  apiValidateRule,
};
