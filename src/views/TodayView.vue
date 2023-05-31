<template>

  <div class="container">
    <h1 class="player-title">{{ playerName }} - {{ teamName }}</h1>
    <p class="date">Today's date is the</p>
    <img v-if="imageUrl !== ''" class="player-image" :src="imageUrl" alt="{{playerName}}"/>
    <p class="date-second">of {{ month }}, {{ year }}</p>
  </div>
</template>

<script>

import axios from "axios";
export default {
  data() {
    return {
      playerName: "",
      teamName: "",
      imageUrl: "",
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
    let chosenResult;
    imageResults.every(element => {
      if (element.source === "NBA.com") {
        return true;
      }
      if (Math.random() > 0.5) {
        return true;
      }
      chosenResult = element.original;
    })
    this.imageUrl = chosenResult;
    console.log(chosenResult)
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

.player-image {
  max-width: 100%;
}


</style>