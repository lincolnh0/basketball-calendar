<template>

</template>

<script>

import axios from "axios";

/**
 * TASK:
 *  - get current date
 *  - lookup basketball reference.com
 *  - return list of players
 *  - select a singular player
 *  - serp api player name + team name
 *  - render any images
 */
export default {
  methods: {

  },
  mounted() {
    const today = new Date();
    axios.get(`.netlify/functions/get-players?number=${today.getDate()}`)
        .then((response) => {
          const docParser = new DOMParser().parseFromString(response.data.content, "text/html")
          const playerList = docParser.getElementById("div_numbers").querySelectorAll("th[data-stat='player']")
          playerList.forEach(element => {
            console.log(element.innerText)
          })
        })
        .catch((err) => {
          console.error(err)
        })
  }
}

</script>
<style>
</style>