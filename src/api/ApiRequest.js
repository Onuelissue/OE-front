
import axios from 'axios';

// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${API_KEY}`,
// };
const ApiRequest = (function ApiRequestCreator() {
  return {
    // to do : remove 
    fetchCount(amount = 1) {
      return new Promise((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
      );
    },
    async loadNotionPageData(pageId) {
      const baseURL = "https://notion-api.splitbee.io/v1/page"; //react-notion api https://github.com/splitbee/notion-api-worker 
      try {
        const pageData = await axios({
          method: 'get',
          url:`${baseURL}/${pageId}`,
        })
        return JSON.stringify(pageData.data);
      }catch(e) {
        console.log(e);
      }
    }
  };
}());

export default ApiRequest;