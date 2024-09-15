<template>

  <div class="container">
    <h1 class="player-title">{{ playerName }} - {{ teamName }}</h1>
    <p class="date">Today's date is the</p>
    <div class="image-slide-show">
      <img class="player-image" v-for="( imageUrl, index ) in this.imageUrls" v-bind:key="index" :src="imageUrl" :alt="playerName"/>
    </div>
    <p class="date-second">of {{ month }}, {{ year }}</p>
    <p><a href="https://www.lncln.io/projects/basketball-calendar" target="_blank">What is this?</a></p>
  </div>
</template>

<script>

import axios from "axios";
export default {
  data() {
    return {
      playerName: "",
      teamName: "",
      imageUrls: [],
      month: new Date().toLocaleString("en-US", {month: "long"}),
      year: new Date().getFullYear(),
    }
  },
  methods: {

  },
  async mounted() {
    const today = new Date();
    const numberResponse = await axios.get(`.netlify/functions/get-players?number=${today.getDate()}&year=${today.getFullYear()}`)
    const docParser = new DOMParser().parseFromString(numberResponse.data.content, "text/html")
    const playerList = docParser.getElementById("div_players").querySelectorAll("td[data-stat='player']")
    const teamList = docParser.getElementById("div_players").querySelectorAll("td[data-stat='team_id']")
    const randomIndex = Math.floor(Math.random() * playerList.length)

    this.playerName = playerList[randomIndex].innerText
    this.teamName = teamList[randomIndex].innerText

    const imageResponse = await axios.get(`.netlify/functions/get-images?query=${playerList[randomIndex].innerText} ${teamList[randomIndex].innerText}`)
    const imageResults = imageResponse.data.content["images_results"]
    let chosenResult = [];
    imageResults.forEach(element => {
      if (element.source !== "NBA.com") {
        chosenResult.push(element.original);
      }
    })
    this.imageUrls = chosenResult.slice(0, 3);
  }
}

</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
}

.player-title {
  font-size: xx-large;
}

.image-slide-show {
  display: flex;
  gap: 10px;
}

@media only screen and (max-width: 900px) {
  .image-slide-show {
    flex-direction: column;
  }
}

.player-image {
  max-width: 300px;
  max-height: 400px;
  height: auto;
  width: auto;
  object-fit: cover;
}


</style>
