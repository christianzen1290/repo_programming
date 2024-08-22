<template>
  <div>
    <h1>Google Sheets Data</h1>
    <ul>
      <li v-for="(row, index) in data" :key="index">{{ row.join(' | ') }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.fetchData();
    // Set up polling every 60 seconds
    this.pollingInterval = setInterval(this.fetchData, 1000);
  },
  methods: {
    async fetchData() {
      try {
        const sheetId = '1ebN4Eo8lIuqzVvrMfw2-Ps-uVcYU9ZwhpdjNREeFqxk'; 
        // const range = 'Sheet1!A1:E10';     
        const range = 'Sheet1';     
        const apiKey = 'AIzaSyAY3GrXIMy8C4pxp407EVAzPhvU0r7aUtY';     
        const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
        this.data = response.data.values;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    beforeDestroy() {
    clearInterval(this.pollingInterval);
  }
  }
};
</script>

<style>
/* Add your styles here */
</style>
