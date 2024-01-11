<template>
  <section class="dp-home-root">
    <div class="dp-home-cards-grid">
      <div
        class="dp-home-cards-card-static"
        v-if="$root?.masterData?.account?.balance != null"
      >
        <div class="dp-home-card-header">{{ this.$root.masterData.account.username }}'s BALANCE</div>
        <div class="dp-home-card-content">
          Your current account balance is: ᕲ{{
            floatPriceToString($root.masterData.account.balance)
          }}
        </div>
      </div>

      <div
        class="dp-home-cards-card-static"
        v-if="$root?.masterData?.servicesCount?.pterodactyl"
      >
        <div class="dp-home-card-header">SERVERS</div>
        <div class="dp-home-card-content">
          There are currently
          {{ $root?.masterData?.servicesCount?.pterodactyl.total }} servers
          registered to your account,
          {{ $root?.masterData?.servicesCount?.pterodactyl.offline }}
          {{
            $root?.masterData?.servicesCount?.pterodactyl.offline == 1
              ? "is"
              : "are"
          }}
          offline and
          {{ $root?.masterData?.servicesCount?.pterodactyl.suspended }}
          {{
            $root?.masterData?.servicesCount?.pterodactyl.suspended == 1
              ? "is"
              : "are"
          }}
          suspended.
        </div>
      </div>
      <div class="dp-home-cards-card-static">
        <div class="dp-home-card-header">Updates</div>
        <div class="dp-home-card-content" style="overflow-y: scroll">
          - 5/21/23: New Billing Panel!!<br /><br />
          </div>
      </div>

      <div class="dp-home-cards-card-static">
        <div class="dp-home-card-header">CONTACT</div>
        <div class="dp-home-card-content" style="padding-left: 10px">
          <div style="margin-top: 5px">
            <i class="fab fa-discord"></i> <a href="https://discord.gg/MVaJW8rqmH"
              >Discord</a
            >
          </div>
          <div style="margin-top: 5px">
            <i class="fa-regular fa-globe"></i> <a href="https://ducocloud.com"
            >Website</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
a {
  color: var(--color-primary);
}
.dp-home-root {
  position: absolute;
  margin-top: 50px;
  left: 0;
  right: 0;
}
.dp-home-cards-grid {
  margin: auto;
  width: calc(100vw - 120px);
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, 24%);
  justify-content: center;
}
.dp-home-cards-card-static {
  border-radius: 4px;
  background: var(--color-card-background);
  height: 160px;
  width: 100%;
}
.dp-home-card-header {
  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 22px;
  user-select: none;
}
.dp-home-card-content {
  height: calc(100% - 68px);
  position: relative;
  overflow: hidden;
  padding: 8px;
  background: linear-gradient(
    0deg,
    var(--card-bg-gradiant-start) 94%,
    var(--card-bg-gradiant-end) 100%
  );
  border-radius: 0px 0px 4px 4px;
  word-wrap: break-word;
  white-space: pre-line;
  user-select: none;
}
.dp-home-card-bottom {
  position: absolute;
  width: calc(100% - 16px);
  bottom: 6px;
}
.dp-home-addbalance-btn {
  float: right;
}

@media only screen and (max-width: 1600px) {
  .dp-home-cards-grid {
    grid-template-columns: repeat(auto-fill, 32%);
  }
}

@media only screen and (max-width: 1225px) {
  .dp-home-cards-grid {
    grid-template-columns: repeat(auto-fill, 49%);
  }
}

@media only screen and (max-width: 950px) {
  .dp-home-cards-grid {
    width: calc(100vw - 50px);
    grid-template-columns: repeat(auto-fill, 100%);
  }
}
</style>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    floatPriceToString(input) {
      if (input == undefined) return;

      if (input.toString().includes(".")) {
        var returnStr = (Math.round(input * 100) / 100)
          .toString()
          .replace(".", ",");
        if (returnStr.split(",")[1] && returnStr.split(",")[1].length == 1)
          returnStr += `0`;

        if (returnStr.split(",")[1] == null) returnStr += `${","}00`;

        return returnStr;
      } else {
        return input + `${","}00`;
      }
    },
  },
};
</script>
