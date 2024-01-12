<template>
  <section class="dp-order-root">
    <div class="dp-order-step order-step1">
      <div class="dp-order-step-title">
        <div class="dp-order-step-number-root">
          <span class="dp-order-step-number-1">1</span>
        </div>
        <div class="dp-order-step-name">APPLICATION TYPE</div>
      </div>
      <div class="dp-order-step-content dp-order-step1-grid">
        <div
          class="dp-order-step1-item-root"
          :selected="chosenAppType == 'pterodactyl'"
          @click="setChosenApp('pterodactyl')"
        >
          <div class="dp-order-step1-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/pterodactyl.svg" style="width: 100px" />
            </div>
            <div class="dp-order-step1-item-text">
              <div class="dp-order-step1-item-text-title">Pterodactyl</div>
              Open-source game <br />server management.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dp-order-step order-step2">
      <div class="dp-order-step-title">
        <div class="dp-order-step-number-root">
          <span class="dp-order-step-number-2">2</span>
        </div>
        <div class="dp-order-step-name">APPLICATION LOCATION</div>
      </div>
      <div class="dp-order-step-content dp-order-step2-grid">
        <div
          class="dp-order-step1-item-root"
          v-if="chosenAppType != 'qemu'"
          :selected="chosenLocation == 'us1'"
          @click="setChosenLocation('us1')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/flags-svg/us.svg" style="width: 50px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Oklahoma</div>
              United States <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          v-if="chosenAppType != 'qemu'"
          :selected="chosenLocation == 'us2'"
          @click="setChosenLocation('us2')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/flags-svg/us.svg" style="width: 50px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Arizona</div>
              United States <br />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dp-order-step order-step2">
      <div class="dp-order-step-title">
        <div class="dp-order-step-number-root">
          <span class="dp-order-step-number-3">3</span>
        </div>
        <div class="dp-order-step-name">APPLICATION PACKAGE</div>
      </div>

      <div class="dp-order-step-content" v-if="chosenAppType == 'qemu'">
        <div
          class="dp-order-step3-grid-header grid-3-qemu"
          style="margin-top: 10px"
        >
          <div class="dp-order-step3-grid-header-item"></div>
          <div class="dp-order-step3-grid-header-item dp-vps-code">CODE</div>
          <div class="dp-order-step3-grid-header-item hide-on-small-screen">
            NAME
          </div>
          <div class="dp-order-step3-grid-header-item">CPU</div>
          <div class="dp-order-step3-grid-header-item">RAM</div>
          <div class="dp-order-step3-grid-header-item">DISK</div>
          <div class="dp-order-step3-grid-header-item dp-vps-images">
            Images
          </div>
          <div class="dp-order-step3-grid-header-item dp-vps-ipv4">IPv4</div>
          <div class="dp-order-step3-grid-header-item dp-vps-ipv6">IPv6</div>
          <div class="dp-order-step3-grid-header-item dp-vps-network">
            Network
          </div>
          <div class="dp-order-step3-grid-header-item">PRICE</div>
        </div>

        <div
          v-for="(pkg, index) in qemuPackages"
          :key="index"
          class="dp-order-step3-grid-row grid-3-qemu"
          :selected="isSelectedPackage(pkg.code)"
          :data-packageId="pkg.code"
          @click="setSelectedPackage($event)"
          style="margin-top: 15px"
        >
          <div class="dp-order-step3-grid-row-item" style="position: relative">
            <div class="dp-order-step3-selectdot"></div>
          </div>
          <div class="dp-order-step3-grid-row-item dp-vps-code">
            {{ pkg.code }}
          </div>
          <div class="dp-order-step3-grid-row-item">
            {{ pkg.name }}
          </div>

          <div class="dp-order-step3-grid-row-item">
            {{ pkg.specs.cpu }} CORE{{ pkg.specs.cpu != 1 ? "S" : "" }}
          </div>
          <div class="dp-order-step3-grid-row-item">
            {{
              pkg.specs.ram > 1023
                ? `${pkg.specs.ram / 1024} GB`
                : `${pkg.specs.ram} MB`
            }}
          </div>
          <div class="dp-order-step3-grid-row-item">
            {{
              pkg.specs.disk > 1023
                ? `${pkg.specs.disk / 1024} GB`
                : `${pkg.specs.disk} MB`
            }}
          </div>
          <div class="dp-order-step3-grid-row-item dp-vps-images">
            <span
              v-for="(image, index) of pkg.images"
              :key="index + 1000"
              style="margin-right: 10px"
            >
              {{ image }}
            </span>
          </div>

          <div class="dp-order-step3-grid-row-item dp-vps-ipv4">
            {{
              pkg.network.ipv4 == true ? `Yes, ${pkg.network.ipv4_type}` : `No`
            }}
          </div>

          <div class="dp-order-step3-grid-row-item dp-vps-ipv6">
            {{
              pkg.network.ipv6 == true ? `Yes, ${pkg.network.ipv6_type}` : `No`
            }}
          </div>

          <div class="dp-order-step3-grid-row-item dp-vps-network">
            {{ pkg.network.speed }}&sup2;
          </div>

          <div
            class="dp-order-step3-grid-row-item price-discounted"
            v-if="pkg.priceDiscounted"
          >
            <div class="dp-order-price-discount-original">${{ pkg.price }}</div>
            <div class="dp-order-price-discount-discounted">
              ${{ pkg.priceDiscounted }}
            </div>
            <small class="dp-vps-price-month">/month</small>
          </div>

          <div class="dp-order-step3-grid-row-item" v-else>
            ${{ pkg.price }}<small class="dp-vps-price-month">/month</small>
          </div>
        </div>
      </div>

      <div class="dp-order-step-content" v-if="chosenAppType == 'pterodactyl'">
        <div class="dp-order-step3-grid2">
          <div
            class="dp-order-step3-grid2-item"
            v-for="(topCategory, index) of shownTopCategories()"
            :key="index * 9 + 100"
            @click="setchosenTopCategory(topCategory.code)"
            :active="chosenTopCategory == topCategory.code"
          >
            <div class="dp-order-step1-item-logo">
              <img :src="topCategory.image_url" style="height: 37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">
                {{ topCategory.title }}
              </div>
              {{ topCategory.subtitle }} <br />
            </div>
          </div>
        </div>
        <div class="dp-order-step3-grid-header" style="margin-top: 10px">
          <div class="dp-order-step3-grid-header-item"></div>
          <div class="dp-order-step3-grid-header-item hide-on-small-screen">
            CODE
          </div>
          <div class="dp-order-step3-grid-header-item hide-on-small-screen">
            NAME
          </div>
          <div class="dp-order-step3-grid-header-item">CPU</div>
          <div class="dp-order-step3-grid-header-item">RAM</div>
          <div class="dp-order-step3-grid-header-item">DISK</div>
          <div class="dp-order-step3-grid-header-item">PRICE</div>
        </div>

        <div
          v-for="(pkg, index) in pterodactylPackages.filter(
            (p) =>
              p.regions.includes(chosenLocation) &&
              p.categories.includes(chosenTopCategory)
          )"
          :key="index"
        >
          <div
            v-if="pkg.code == 'SPACER'"
            class="dp-order-step3-grid-spacer"
          ></div>
          <div
            v-else
            class="dp-order-step3-grid-row"
            :selected="isSelectedPackage(pkg.code)"
            :data-packageId="pkg.code"
            @click="setSelectedPackage($event)"
            style="margin-top: 15px"
          >
            <div
              class="dp-order-step3-grid-row-item"
              style="position: relative"
            >
              <div class="dp-order-step3-selectdot"></div>
            </div>
            <div
              class="dp-order-step3-grid-row-item hide-on-medium-screen hide-on-small-screen"
            >
              {{ pkg.code }}
            </div>
            <div class="dp-order-step3-grid-row-item pt-package-name">
              {{ pkg.name }}
            </div>
            <div class="dp-order-step3-grid-row-item hide-on-small-screen">
              {{ pkg.specs.cpu }} CORE{{ pkg.specs.cpu != 1 ? "S" : "" }}
            </div>
            <div class="dp-order-step3-grid-row-item hide-on-small-screen">
              {{ pkg.specs.ram }}
            </div>
            <div class="dp-order-step3-grid-row-item hide-on-small-screen">
              {{ pkg.specs.disk }}
            </div>
            <div
              class="dp-order-step3-grid-row-item price-discounted"
              v-if="pkg.priceDiscounted"
            >
              <div class="dp-order-price-discount-original">
                ${{ pkg.price }}
              </div>
              <div class="dp-order-price-discount-discounted">
                ${{ pkg.priceDiscounted }}
              </div>
              <small class="hide-on-small-screen">/month</small>
            </div>

            <div class="dp-order-step3-grid-row-item" v-else>
              ${{ pkg.price }}<small class="hide-on-small-screen">/month</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="dp-order-step order-step2"
      v-if="chosenPackageId && chosenPackageId.startsWith('MCJ')"
    >
      <div class="dp-order-step-title">
        <div class="dp-order-step-number-root">
          <span class="dp-order-step-number-4">4</span>
        </div>
        <div class="dp-order-step-name">APPLICATION PLATFORM</div>
      </div>
      <div class="dp-order-step-content dp-order-step2-grid">
        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'purpur'"
          @click="setChosenRuntime('purpur')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/purpur-squid.svg" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Purpur</div>
              Your Minecraft, your way <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'paper'"
          @click="setChosenRuntime('paper')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/paper.gif" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Paper</div>
              Next generation of Minecraft <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'Bungeecord'"
          @click="setChosenRuntime('Bungeecord')"
          v-if="chosenPackageId != 'MCBUD1' && chosenPackageId != 'MCEX1'"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/bungee.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Bungeecord</div>
              Minecraft server Proxy <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'forge'"
          @click="setChosenRuntime('forge')"
          v-if="chosenPackageId != 'MCBUD1' && chosenPackageId != 'MCEX1'"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/forge.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Forge</div>
              Minecraft modding API <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'Fabric'"
          @click="setChosenRuntime('Fabric')"
          v-if="chosenPackageId != 'MCBUD1' && chosenPackageId != 'MCEX1'"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/fabric.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Fabric</div>
              Lightweight, experimental modding toolchain <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'java'"
          @click="setChosenRuntime('java')"
          v-if="chosenPackageId != 'MCBUD1' && chosenPackageId != 'MCEX1'"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/grass.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Vanilla</div>
              Vanilla Minecraft <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'bedrock'"
          @click="setChosenRuntime('bedrock')"
          v-if="chosenPackageId != 'MCBUD1' && chosenPackageId != 'MCEX1'"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/bedrock.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Bedrock</div>
              Minecraft Bedrock <br />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="dp-order-step order-step2"
      v-if="chosenPackageId && chosenPackageId.startsWith('DCBOT')"
    >
      <div class="dp-order-step-title">
        <div class="dp-order-step-number-root">
          <span class="dp-order-step-number-4">4</span>
        </div>
        <div class="dp-order-step-name">APPLICATION PLATFORM</div>
      </div>
      <div class="dp-order-step-content dp-order-step2-grid">
        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'python'"
          @click="setChosenRuntime('python')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/python.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Python</div>
              High-level, general-purpose language. <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'nodejs'"
          @click="setChosenRuntime('nodejs')"
          v-if="chosenPackageId != 'MCBUD1' && chosenPackageId != 'MCEX1'"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/nodejs-2.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Node.js</div>
              JavaScript runtime environment <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'java'"
          @click="setChosenRuntime('java')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/java.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Java</div>
              Object-oriented language <br />
            </div>
          </div>
        </div>

      <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'jmusic'"
          @click="setChosenRuntime('jmusic')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/jmusic.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Jmusic</div>
              Discord music bot <br />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div
      class="dp-order-step order-step2"
      v-if="chosenPackageId && chosenPackageId.startsWith('CL')"
    >
      <div class="dp-order-step-title">
        <div class="dp-order-step-number-root">
          <span class="dp-order-step-number-4">4</span>
        </div>
        <div class="dp-order-step-name">APPLICATION PLATFORM</div>
      </div>
      <div class="dp-order-step-content dp-order-step2-grid">
        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'rust'"
          @click="setChosenRuntime('rust')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/steam/rust.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Rust</div>
              Everything wants you to die <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'gmod'"
          @click="setChosenRuntime('gmod')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/steam/gmod.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Gmod</div>
              A sandbox physics game <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'vrising'"
          @click="setChosenRuntime('vrising')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/steam/vrising.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">V Rising</div>
              A Vampire Survival Experience <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'satisfactory'"
          @click="setChosenRuntime('satisfactory')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/steam/satisfactory.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Satisfactory</div>
              Open-World factory building game <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'unturned'"
          @click="setChosenRuntime('unturned')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/steam/unturned.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Unturned</div>
              Free-to-play survival game <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'scpsl'"
          @click="setChosenRuntime('scpsl')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/steam/scpsl.webp" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">SCP Secret Laboratory</div>
              How will you act amidst a containment breach? <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'vanilla'"
          @click="setChosenRuntime('vanilla')"
        >
          <div class="dp-order-step1-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/steam/terraria.gif" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Terraria</div>
              Dig, Fight, Build <br />
            </div>
          </div>
        </div>

        <tooltip
          style="width: 100% !important"
          text="Currently unavailable."
        >
        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'stardew'"
          disabled="true"
        >
          <div class="dp-order-step1-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/steam/stardew.png" style="width: 50px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Stardew</div>
              Peaceful Farming Game <br />
            </div>
          </div>
        </div>
      </tooltip>
      </div>
    </div>

    <div
      class="dp-order-step order-step2"
      v-if="chosenPackageId && chosenPackageId.startsWith('DB')"
    >
      <div class="dp-order-step-title">
        <div class="dp-order-step-number-root">
          <span class="dp-order-step-number-4">4</span>
        </div>
        <div class="dp-order-step-name">APPLICATION PLATFORM</div>
      </div>
      <div class="dp-order-step-content dp-order-step2-grid">
        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'mongo'"
          @click="setChosenRuntime('mongo')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/mongodb.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">MongoDB</div>
              Document-oriented database program <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'mariadb'"
          @click="setChosenRuntime('mariadb')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/mariadb.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">MariaDB</div>
              Relational database management system <br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenRuntime == 'redis'"
          @click="setChosenRuntime('redis')"
        >
          <div class="dp-order-step2-item">
            <div class="dp-order-step1-item-logo">
              <img src="/img/logos/redis.png" height="37.5px" />
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">Redis</div>
              Redis Stack Server <br />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dp-order-step order-step2">
      <div class="dp-order-step-title">
        <div class="dp-order-step-number-root">
          <span
            class="dp-order-step-number-6"
            v-if="
              chosenAppType == `pterodactyl` &&
              chosenPackageId &&
              (chosenPackageId.startsWith('MC') ||
                chosenPackageId.startsWith('DC'))
            "
            >5</span
          >

          <span
            class="dp-order-step-number-5"
            v-if="
              chosenAppType == `pterodactyl` &&
              chosenPackageId &&
              chosenPackageId.startsWith('MC') == false &&
              chosenPackageId.startsWith('DC') == false
            "
            >5</span
          >
          <span class="dp-order-step-number-4" v-if="chosenAppType == `qemu`"
            >4</span
          >
        </div>
        <div class="dp-order-step-name">BILLING PERIOD</div>
      </div>
      <div class="dp-order-step-content dp-order-step2-grid">
        <div
          class="dp-order-step1-item-root"
          :selected="chosenBillingPeriod == '1'"
          @click="chosenBillingPeriod = '1'"
        >
          <div class="dp-order-step2-item">
            <div
              class="dp-order-step1-item-logo"
              style="width: 50px; text-align: center"
            >
              <i class="fa-solid fa-1" style="font-size: 37.5px"></i>
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">1 Month</div>
              You pay the standard price.<br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenBillingPeriod == '3'"
          @click="chosenBillingPeriod = '3'"
        >
          <div class="dp-order-step2-item">
            <div
              class="dp-order-step1-item-logo"
              style="width: 50px; text-align: center"
            >
              <i class="fa-solid fa-3" style="font-size: 37.5px"></i>
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">3 Months</div>
              You pay 2.5% less every month.<br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenBillingPeriod == '6'"
          @click="chosenBillingPeriod = '6'"
        >
          <div class="dp-order-step2-item">
            <div
              class="dp-order-step1-item-logo"
              style="width: 50px; text-align: center"
            >
              <i class="fa-solid fa-6" style="font-size: 37.5px"></i>
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">6 Months</div>
              You pay 4% less every month.<br />
            </div>
          </div>
        </div>

        <div
          class="dp-order-step1-item-root"
          :selected="chosenBillingPeriod == '12'"
          @click="chosenBillingPeriod = '12'"
        >
          <div class="dp-order-step2-item">
            <div
              class="dp-order-step1-item-logo"
              style="width: 50px; text-align: center"
            >
              <i
                class="fa-solid fa-1"
                style="font-size: 37.5px; margin-right: 3px"
              ></i>
              <i class="fa-solid fa-2" style="font-size: 37.5px"></i>
            </div>
            <div class="dp-order-step2-item-text">
              <div class="dp-order-step2-item-text-title">12 Months</div>
              You pay 5% less every month.<br />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dp-order-step order-step2">
      <div class="dp-order-step-title">
        <div class="dp-order-step-number-root">
          <span
            class="dp-order-step-number-7"
            v-if="
              chosenAppType == `pterodactyl` &&
              chosenPackageId &&
              (chosenPackageId.startsWith('MC') ||
                chosenPackageId.startsWith('DC'))
            "
            >7</span
          >

          <span
            class="dp-order-step-number-6"
            v-if="
              chosenAppType == `pterodactyl` &&
              chosenPackageId &&
              chosenPackageId.startsWith('MC') == false &&
              chosenPackageId.startsWith('DC') == false
            "
            >6</span
          >
          <span class="dp-order-step-number-5" v-if="chosenAppType == `qemu`"
            >5</span
          >
        </div>
        <div class="dp-order-step-name">APPLICATION CONFIGURATION</div>
      </div>
      <div class="dp-order-step-content">
        <div class="dp-order-app-config-container">
          <div style="text-align: center; font-weight: bold">
            Name your server{{ chosenServerCount != 1 ? "s" : "" }}
            <div
              class="dp-order-app-config-name-root"
              v-for="n in chosenServerCount"
              :key="n + 9 * 20"
            >
              <div class="dp-order-app-config-name-left">{{ n }}</div>
              <div class="dp-order-app-config-name-right">
                <input
                  type="text"
                  class="dp-order-app-config-name-input"
                  :value="chosenServerNames[n - 1] || `Server ${n}`"
                  maxlength="20"
                  @input="updateServerName(n, $event)"
                />
              </div>
            </div>
          </div>
          <div class="dp-order-servercount">
            <div>
              Servers to create
              <div class="dp-order-app-config-amount-root">
                <div
                  :disabled="chosenServerCount == 1"
                  class="dp-order-app-config-amount-left"
                  @click="removeServerCount()"
                >
                  -
                </div>
                <div class="dp-order-app-config-amount-center">
                  {{ chosenServerCount }}
                </div>
                <div
                  :disabled="
                    (chosenAppType == 'pterodactyl' &&
                      chosenServerCount == 9) ||
                    (chosenAppType == 'qemu' && chosenServerCount == 5)
                  "
                  class="dp-order-app-config-amount-right"
                  @click="addServerCount()"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 20px; word-wrap: break-word; white-space: pre-line">
      {{ totalPriceTexts() }}
    </div>

    <div class="dp-order-underbar-root">
      <div class="dp-order-underbar-totalmonthly-root">
        <div class="dp-order-underbar-totalmonthly-text">Total:</div>
        <div class="dp-order-underbar-totalmonthly-price">
          ${{ calculateMonthlyTotal()
          }}<small class="dp-order-underbar-totalmonthly-price-small"
            >/month</small
          >
        </div>
      </div>
      <div
        class="dp-order-underbar-orderbtn"
        @click="createOrderObject()"
        v-if="isProcessingOrder == false"
      >
        <button class="dp-button-primary dp-dp-order-underbar-btnorder">
          BUY & DEPLOY
        </button>
      </div>

      <div class="dp-order-underbar-orderbtn" v-else>
        <button
          class="dp-button-primary dp-dp-order-underbar-btnorder"
          style="width: 199px; height: 47px; padding-top: 9px"
        >
          <div class="dp-btn-spinner"></div>
        </button>
      </div>
    </div>

    <div style="padding-bottom: 20px; width: 20px">&nbsp;</div>
  </section>
</template>

<script>
import tooltip from "@/components/tooltip.vue";

export default {
  components: {
    tooltip,
  },
  methods: {
    mouseOver(e) {
      console.log(e);
    },
    shownTopCategories() {
      var vm = this;
      var topCategories = [];
      var shownPackages = this.pterodactylPackages.filter((p) =>
        p.regions.includes(vm.chosenLocation)
      );

      for (var category of shownPackages) {
        for (var category1 of category.categories) {
          var category3 = topCategories.find((c) => c.code == category1);
          if (!category3) {
            var category2 = vm.pterodactylTopCategories.find(
              (c) => c.code == category1
            );
            topCategories.push(category2);
          }
        }
      }

      return topCategories;

      //
    },
    updateServerName(n, event) {
      this.chosenServerNames[n - 1] = event.target.value;
    },
    addServerCount() {
      this.chosenServerCount++;
      if (this.chosenAppType == "qemu") {
        if (this.chosenServerCount > 5) this.chosenServerCount = 5;
      }
      if (this.chosenAppType == "pterodactyl") {
        if (this.chosenServerCount > 9) this.chosenServerCount = 9;
      }
      this.$forceUpdate();
    },

    removeServerCount() {
      this.chosenServerCount--;
      if (this.chosenServerCount < 1) this.chosenServerCount = 1;
      this.$forceUpdate();
    },
    setChosenApp(app) {
      this.chosenAppType = app;
      this.chosenPackageId = null;
      this.setChosenLocation("de1");
      this.chosenServerCount = 1;
      this.$forceUpdate();
    },
    setChosenRuntime(runtime) {
      this.chosenRuntime = runtime;
      this.$forceUpdate();
    },
    setchosenTopCategory(topCategory) {
      var vm = this;
      this.chosenTopCategory = topCategory;

      if (this.chosenAppType == "pterodactyl") {
        var shownPackages = vm.pterodactylPackages.filter(
          (p) =>
            p.regions.includes(vm.chosenLocation) &&
            p.categories.includes(vm.chosenTopCategory)
        );
        var selectedPackageInNewLocation = shownPackages.find(
          (p) => p.code == vm.chosenPackageId
        );
        if (!selectedPackageInNewLocation) {
          vm.chosenPackageId = shownPackages[0].code;

          this.setPackageNvmeState(vm.chosenPackageId);

          if (vm.chosenPackageId.startsWith("DC")) {
            vm.setChosenRuntime("nodejs");
          } else if (vm.chosenPackageId.startsWith("MC")) {
            vm.setChosenRuntime("java");
          } else {
            vm.setChosenRuntime("default");
          }
        }
      }

      this.$forceUpdate();
    },

    setChosenLocation(loc) {
      var vm = this;
      this.chosenLocation = loc;

      if (vm.chosenAppType == "pterodactyl") {
        var shownTopCategories = vm.shownTopCategories();
        if (shownTopCategories[0]) {
          vm.setchosenTopCategory(shownTopCategories[0].code);
        }
      }

      if (vm.chosenAppType == "qemu" && vm.qemuPackages[0]) {
        vm.chosenPackageId = vm.qemuPackages[0].code;
      }

      this.$forceUpdate();
    },
    isSelectedPackage(funcPackage) {
      var isChosen = this.chosenPackageId == funcPackage;
      return isChosen;
    },
    setPackageNvmeState(packageId) {
      if (packageId.startsWith("ARK")) {
        this.nvmeDisk = true;
      }

      if (packageId.startsWith("MCBUD")) {
        this.nvmeDisk = false;
      }
      if (packageId.startsWith("MCEX") || packageId.startsWith("MCCPU")) {
        this.nvmeDisk = true;
      }
      if (packageId.startsWith("DC")) {
        this.nvmeDisk = false;
      }
    },
    setSelectedPackage(event) {
      const path = event.path || (event.composedPath && event.composedPath());

      var object = path.find((ob) => ob.dataset.packageid != null);
      if (!object) {
        //gooi enge error neef
      }

      var packageId = object.dataset.packageid;

      if (packageId == "MCBUD1") {
        this.setChosenRuntime("java");
      }

      this.setPackageNvmeState(packageId);

      if (
        packageId.startsWith("DC") &&
        this.chosenPackageId.startsWith("DC") == false
      ) {
        this.setChosenRuntime("nodejs");
      }
      if (
        packageId.startsWith("MC") &&
        this.chosenPackageId.startsWith("MC") == false
      ) {
        this.setChosenRuntime("java");
      }

      if (
        packageId.startsWith("MC") == false &&
        packageId.startsWith("DC") == false
      ) {
        this.setChosenRuntime("default");
      }

      this.chosenPackageId = packageId;

      this.$forceUpdate();
    },
    stringPriceToFloat(input) {
      if (input == undefined) return;
      input = input.replace(",", ".");
      input = parseFloat(input);
      return input;
    },
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
    totalPriceTexts() {
      var vm = this;

      var monthlyTotal = vm.calculateMonthlyTotal();
      monthlyTotal = vm.stringPriceToFloat(monthlyTotal);

      if (vm.chosenBillingPeriod != "1") {
        return `You will pay $${vm.floatPriceToString(
          monthlyTotal * vm.chosenBillingPeriod
        )} every ${
          vm.chosenBillingPeriod
        } months. You will pay $${vm.floatPriceToString(
          monthlyTotal * vm.chosenBillingPeriod
        )} after deploying.`;
      } else {
        return ``;
      }
    },
    calculateMonthlyTotal() {
      var vm = this;

      var indexValue = 1;

      if (vm.chosenBillingPeriod == "3") indexValue = 0.975;
      if (vm.chosenBillingPeriod == "6") indexValue = 0.96;
      if (vm.chosenBillingPeriod == "12") indexValue = 0.95;

      var additionalCosts = 0;

      if (
        vm.nvmeDisk == true &&
        vm.chosenPackageId.startsWith("ARK") == false &&
        vm.chosenPackageId.startsWith("MCCPU") == false
      )
        additionalCosts = additionalCosts + 2;

      if (vm.chosenAppType == "pterodactyl") {
        var pkg = vm.pterodactylPackages.find(
          (p) => p.code == vm.chosenPackageId
        );
        if (!pkg) return vm.floatPriceToString(0);
        var pkgPrice = vm.stringPriceToFloat(pkg.price);

        var priceTotalFloat = parseFloat(
          parseFloat((pkgPrice + additionalCosts) * indexValue).toFixed(2)
        );

        priceTotalFloat = priceTotalFloat * vm.chosenServerCount;

        priceTotalFloat = Math.round(priceTotalFloat * 100) / 100;
        return vm.floatPriceToString(priceTotalFloat);
      } else if (vm.chosenAppType == "qemu") {
        pkg = vm.qemuPackages.find((p) => p.code == vm.chosenPackageId);

        if (!pkg) return vm.floatPriceToString(0);
        pkgPrice = vm.stringPriceToFloat(pkg.price);
        priceTotalFloat = pkgPrice * vm.chosenServerCount;
        priceTotalFloat = Math.round(priceTotalFloat * 100) / 100;
        return vm.floatPriceToString(priceTotalFloat * indexValue);
      } else {
        return vm.floatPriceToString(0);
      }
    },
    createOrderObject() {
      var vm = this;
      vm.isProcessingOrder = true;
      var object = {
        appType: vm.chosenAppType,
        appLocation: vm.chosenLocation,
        appPackage: vm.chosenPackageId,
        appQuantity: vm.chosenServerCount,
        appNames: vm.chosenServerNames,
        appRuntime: vm.chosenRuntime,
        appBillingInterval: vm.chosenBillingPeriod,
        useNVMe: vm.nvmeDisk,
      };
      console.log(object);

      vm.$root.api.post("/order", object).then((req) => {
        if (req.data.msg && req.data.msg.length > 0)
          vm.$root.messages = [...req.data.msg, ...vm.$root.messages];

        vm.isProcessingOrder = false;

        if (req.data.success == true) {
          if (object.appType == "pterodactyl") {
            setTimeout(() => {
              vm.$router.push({
                path: "/servers",
              });
            }, 200);
          }
          if (object.appType == "qemu") {
            setTimeout(() => {
              vm.$router.push({
                path: "/vps",
              });
            }, 200);
          }

          //redirect to correct dashboard
        }
      });
    },
  },
  mounted() {
    //default config
    this.setChosenApp("pterodactyl");
    this.setChosenLocation("us1");
    this.setChosenRuntime("paper");

    var vm = this;

    vm.$root.api
      .get("/pterodactyl/myservers")
      .then((req) => {
        vm.$root.masterData.pterodactylServers = req.data;
        vm.$forceUpdate();
      })
      .catch((e) => {
        console.log(e);
      });
  },

  data() {
    return {
      isProcessingOrder: false,
      chosenAppType: "",
      chosenRuntime: "",
      chosenLocation: "",
      chosenTopCategory: "mc1",
      chosenPackageId: "",
      chosenServerCount: 1,
      chosenBillingPeriod: "1",
      nvmeDisk: false,
      chosenServerNames: [""],
      qemuPackages: [
        {
          code: "AX412",
          name: "VPS 2",
          specs: {
            cpu: 2,
            ram: 1024,
            disk: 10240,
          },
          network: {
            speed: "100 Mbit/s",
            ipv4: true,
            ipv4_type: "NAT",
            ipv6: true,
            ipv6_type: "Public",
          },
          images: ["Linux"],
          price: "4.30",
        },

        {
          code: "AX413",
          name: "VPS 3",
          specs: {
            cpu: 2,
            ram: 1024,
            disk: 20480,
          },
          network: {
            speed: "250 Mbit/s",
            ipv4: true,
            ipv4_type: "NAT",
            ipv6: true,
            ipv6_type: "Public",
          },
          images: ["Linux"],
          price: "5.47",
        },

        {
          code: "AX414",
          name: "VPS 4",
          specs: {
            cpu: 4,
            ram: 2048,
            disk: 20480,
          },
          network: {
            speed: "250 Mbit/s",
            ipv4: true,
            ipv4_type: "NAT",
            ipv6: true,
            ipv6_type: "Public",
          },
          images: ["Linux"],
          price: "8.49",
        },

        {
          code: "AX415",
          name: "VPS 5",
          specs: {
            cpu: 4,
            ram: 4096,
            disk: 40960,
          },
          network: {
            speed: "500 Mbit/s",
            ipv4: true,
            ipv4_type: "NAT",
            ipv6: true,
            ipv6_type: "Public",
          },
          images: ["Linux", "Windows"],
          price: "10.32",
        },

        {
          code: "AX416",
          name: "VPS 6",
          specs: {
            cpu: 4,
            ram: 8192,
            disk: 81920,
          },
          network: {
            speed: "1 Gbit/s",
            ipv4: true,
            ipv4_type: "NAT",
            ipv6: true,
            ipv6_type: "Public",
          },
          images: ["Linux", "Windows"],
          price: "20.74",
        },

        {
          code: "AX417",
          name: "VPS 7",
          specs: {
            cpu: 8,
            ram: 8192,
            disk: 81920,
          },
          network: {
            speed: "1 Gbit/s",
            ipv4: true,
            ipv4_type: "NAT",
            ipv6: true,
            ipv6_type: "Public",
          },
          images: ["Linux", "Windows"],
          price: "22.09",
        },
        {
          code: "AX418",
          name: "VPS 8",
          specs: {
            cpu: 12,
            ram: 8192,
            disk: 81920,
          },
          network: {
            speed: "1 Gbit/s",
            ipv4: true,
            ipv4_type: "NAT",
            ipv6: true,
            ipv6_type: "Public",
          },
          images: ["Linux", "Windows"],
          price: "29.28",
        },
        {
          code: "AX419",
          name: "VPS 9",
          specs: {
            cpu: 12,
            ram: 16384,
            disk: 122880,
          },
          network: {
            speed: "1 Gbit/s",
            ipv4: true,
            ipv4_type: "NAT",
            ipv6: true,
            ipv6_type: "Public",
          },
          images: ["Linux", "Windows"],
          price: "46.80",
        },
      ],
      pterodactylTopCategories: [
        {
          code: "mc1",
          title: "Minecraft",
          subtitle: "Minecart",
          image_url: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/00/Allay_Dancing.gif",
        },

        {
          code: "dc1",
          title: "Discord Bot",
          subtitle: "Cheap bot hosting",
          image_url: "https://media.tenor.com/YIjtsfPjKxgAAAAi/discord-wumpu.gif",
        },

        {
          code: "cl1",
          title: "Steam Servers",
          subtitle: "Steam Powered",
          image_url: "/img/logos/steam/steampowered-icon.svg",
        },

        {
          code: "db1",
          title: "Database Servers",
          subtitle: "Cloud Hosted Databases",
          image_url: "/img/icons/db.png",
        },
        
      ],
      pterodactylPackages: [
        {
          code: "MCJ1",
          name: "4GB JAVA",
          regions: ["us1", "us2"],
          specs: {
            cpu: 2,
            ram: "4 GB",
            disk: "∞ GB",
          },
          categories: ["mc1"],
          price: "0.00",
        },
        {
          code: "MCJ2",
          name: "8GB JAVA",
          regions: ["us1", "us2"],
          specs: {
            cpu: 2,
            ram: "8 GB",
            disk: "∞ GB",
          },
          categories: ["mc1"],
          price: "0.00",
        },
        {
          code: "MCJ3",
          name: "12GB JAVA",
          regions: ["us1", "us2"],
          specs: {
            cpu: 2,
            ram: "12 GB",
            disk: "∞ GB",
          },
          categories: ["mc1"],
          price: "0.00",
        },

        {
          code: "DCBOT1",
          name: "Discord 1",
          regions: ["us1", "us2"],
          specs: {
            cpu: 0.5,
            ram: "128 MB",
            disk: "1 GB",
          },
          categories: ["dc1"],
          price: "0.00",
        },
        {
          code: "DCBOT2",
          name: "Discord 2",
          regions: ["us1", "us2"],
          specs: {
            cpu: 0.5,
            ram: "256 MB",
            disk: "2 GB",
          },
          categories: ["dc1"],
          price: "0.00",
        },
        {
          code: "DCBOT3",
          name: "Discord 3",
          regions: ["us1", "us2"],
          specs: {
            cpu: 1,
            ram: "1 GB",
            disk: "4 GB",
          },
          categories: ["dc1"],
          price: "0.00",
        },
        {
          code: "DCBOT4",
          name: "Discord 4",
          regions: ["us1", "us2"],
          specs: {
            cpu: 1,
            ram: "2 GB",
            disk: "10 GB",
          },
          categories: ["dc1"],
          price: "0.00",
        },
        {
          code: "DCBOT5",
          name: "Discord 5",
          regions: ["us1", "us2"],
          specs: {
            cpu: 1,
            ram: "3 GB",
            disk: "15 GB",
          },
          categories: ["dc1"],
          price: "0.00",
        },
        {
          code: "DCBOT6",
          name: "Discord 6",
          regions: ["us1", "us2"],
          specs: {
            cpu: 1.5,
            ram: "4 GB",
            disk: "20 GB",
          },
          categories: ["dc1"],
          price: "0.00",
        },

        {
          code: "CL1",
          name: "Steam 1",
          regions: ["us1"],
          specs: {
            cpu: 2,
            ram: "4 GB",
            disk: "35 GB",
          },
          categories: ["cl1"],
          price: "0.00",
        },
        {
          code: "CL2",
          name: "Steam 2",
          regions: ["us1"],
          specs: {
            cpu: 4,
            ram: "4 GB",
            disk: "70 GB",
          },
          categories: ["cl1"],
          price: "0.00",
        },
        {
          code: "CL3",
          name: "Steam 3",
          regions: ["us1"],
          specs: {
            cpu: 6,
            ram: "8 GB",
            disk: "140 GB",
          },
          categories: ["cl1"],
          price: "0.00",
        },

        {
          code: "DB1",
          name: "Database 1",
          regions: ["us1", "us2"],
          specs: {
            cpu: 1/2,
            ram: "512 MB",
            disk: "2 GB",
          },
          categories: ["db1"],
          price: "0.00",
        },
        {
          code: "DB2",
          name: "Database 2",
          regions: ["us1", "us2"],
          specs: {
            cpu: 1/2,
            ram: "512 MB",
            disk: "4 GB",
          },
          categories: ["db1"],
          price: "0.00",
        },
        {
          code: "DB3",
          name: "Database 3",
          regions: ["us1", "us2"],
          specs: {
            cpu: 1/2,
            ram: "512 MB",
            disk: "6 GB",
          },
          categories: ["db1"],
          price: "0.00",
        },
        {
          code: "DB4",
          name: "Database 4",
          regions: ["us1", "us2"],
          specs: {
            cpu: 1,
            ram: "1 GB",
            disk: "8 GB",
          },
          categories: ["db1"],
          price: "0.00",
        },
        {
          code: "DB5",
          name: "Database 5",
          regions: ["us1", "us2"],
          specs: {
            cpu: 2,
            ram: "2 GB",
            disk: "20 GB",
          },
          categories: ["db1"],
          price: "0.00",
        },
      ],
    };
  },
};
</script>

<style scoped>
.dp-order-price-discount-original {
  text-decoration-color: var(--color-primary);
  text-decoration: line-through;
}

.dp-order-price-discount-discounted {
  color: var(--color-primary);
  margin-left: 5px;
}

.price-discounted {
  display: inline-flex;
}

.dp-dp-order-underbar-btnorder {
  font-size: 22px;
  font-weight: bold;
}
.dp-order-underbar-orderbtn {
  margin-left: auto;
}
.dp-order-underbar-root {
  margin-top: 20px;
  display: inline-flex;
  width: 100%;
}
.dp-order-underbar-totalmonthly-root {
  font-weight: bold;
  font-size: 26px;
}
.dp-order-underbar-totalmonthly-price {
  color: var(--color-primary);
}
.dp-order-underbar-totalmonthly-price-small {
  filter: opacity(0.7);
  font-size: 14px;
}

.dp-order-app-config-name-input {
  width: calc(100% - 15px);
  height: 30px;
  background-color: transparent;
  border-style: none;
  color: white;
  font-size: 16px;
  font-family: Montserrat, Roboto, sans-serif;
}
.dp-order-app-config-name-input:focus {
  outline: none;
}

.dp-order-app-config-amount-left[disabled="true"],
.dp-order-app-config-amount-right[disabled="true"] {
  background-color: var(--color-background--layer-30);
  cursor: not-allowed;
}

.dp-order-app-config-amount-left {
  background-color: var(--color-background--layer-30);
  line-height: 35px;
  font-size: 22px;
  font-weight: bolder;
  text-align: center;
  border-radius: 4px 0px 0px 4px;
  cursor: pointer;
  user-select: none;
}

.dp-order-app-config-name-left {
  background-color: var(--color-background--layer-30);
  line-height: 35px;
  font-size: 22px;
  font-weight: bolder;
  text-align: center;
  border-radius: 4px 0px 0px 4px;
  user-select: none;
}

.dp-order-app-config-name-right {
  background-color: var(--color-background--layer-0);
  line-height: 35px;
  font-size: 16px;
  font-weight: bolder;
  text-align: center;
  border-radius: 0px 4px 4px 0px;
  user-select: none;
}

.dp-order-app-config-amount-center {
  background-color: var(--color-background--layer-0);
  line-height: 35px;
  font-size: 22px;
  font-weight: bolder;
  text-align: center;
}
.dp-order-app-config-amount-right {
  background-color: var(--color-background--layer-20);
  line-height: 35px;
  font-size: 22px;
  font-weight: bolder;
  text-align: center;
  border-radius: 0px 4px 4px 0px;
  cursor: pointer;
  user-select: none;
}

.dp-order-app-config-name-root {
  width: 280px;
  display: grid;
  grid-template-columns: 30px 250px;
  grid-gap: 2px;
  margin-top: 5px;
}

.dp-order-app-config-amount-root {
  width: 180px;
  height: 35px;
  display: grid;
  grid-template-columns: 40px 100px 40px;
  grid-gap: 2px;
  margin-top: 5px;
}
.dp-order-step3-grid2-item {
  background-color: var(--color-background--layer-40);
  padding: 10px;
  border-radius: 4px;
  display: inline-flex;
  cursor: pointer;
}
.dp-order-step3-grid2-item:hover {
  background-color: var(--color-background--layer-20);
}
.dp-order-step3-grid2-item[active="true"] {
  /* background-color: var(--color-background--layer-10); */
  background-color: var(--color-primary);
}
.dp-order-app-config-container {
  background-color: var(--color-background--layer-40);
  width: calc(100% - 20px);
  padding: 10px;
  border-radius: 4px;
  min-height: 62px;
  height: fit-content !important;
  display: inline-flex;
}
.dp-order-step3-selectdot {
  position: relative;
  height: 14px;
  width: 14px;
  border-radius: 100%;
  border-style: solid;
  border-width: 3px;
  border-color: var(--color-primary);
  margin-left: auto;
  margin-right: auto;
}

.dp-order-step3-grid-row {
  background-color: var(--color-background--layer-40);
  padding: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 4px;
  cursor: pointer;
}
.dp-order-step3-grid-row:hover {
  background-color: var(--color-background--layer-20);
}

.dp-order-step3-grid-row[selected="true"] .dp-order-step3-selectdot::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  /* background-color: var(--color-primary); */
  background-color: white;

  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.dp-order-step3-grid-row[selected="true"] .dp-order-step3-selectdot {
  /* border-color: var(--color-primary--hover); */
  border-color: white;
}
.dp-order-step3-grid-row[selected="true"] {
  /* background-color: var(--color-background--layer-10); */
  background-color: var(--color-primary);
}

.dp-order-step2-item {
  background-color: var(--color-background--layer-40);
  min-width: 335px;
  padding: 10px;
  border-radius: 4px;
  display: inline-flex;
  cursor: pointer;
  padding-top: 15px;
  width: calc(100% - 20px);
}
.dp-order-step2-item:hover {
  background-color: var(--color-background--layer-20);
}

.dp-order-step3-grid2 {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-gap: 10px;
  margin-top: 10px;
}

.dp-order-step3-grid-header-item {
  font-size: 18px;
  font-weight: bolder;
}
.dp-order-step3-grid-row {
  display: grid;
  grid-template-columns: 27px minmax(0, 0.5fr) repeat(5, minmax(0, 1fr));
  grid-gap: 10px;
  margin-top: 30px;
}

.dp-order-step3-grid-header {
  display: grid;
  grid-template-columns: 27px minmax(0, 0.5fr) repeat(5, minmax(0, 1fr));
  grid-gap: 10px;
  margin-top: 30px;
  padding: 10px;
}

.grid-3-qemu {
  grid-template-columns: 27px minmax(0, 0.5fr) repeat(9, minmax(0, 1fr));
}

.dp-order-step2-item-text {
  margin-left: 15px;
  font-size: 12px;
}

.dp-order-step2-item-text-title {
  font-weight: bolder;
  font-size: 18px;
}

.dp-order-step-number-3 {
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 3px;
  left: 10px;
  margin: auto;
}

.dp-order-step-number-4 {
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 3px;
  left: 7px;
  margin: auto;
}

.dp-order-step-number-5 {
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 3px;
  left: 9px;
  margin: auto;
}

.dp-order-step-number-6 {
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 3px;
  left: 8px;
  margin: auto;
}

.dp-order-step-number-7 {
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 3.5px;
  left: 9px;
  margin: auto;
}

.dp-order-step-number-2 {
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 3px;
  left: 9px;
  margin: auto;
}
.order-step2 {
  margin-top: 40px;
}
.dp-order-step2-grid {
  display: grid;
  grid-template-columns: repeat(4, 355px);
  grid-gap: 20px;
  margin-top: 30px;
}

.dp-order-step1-item-text {
  margin-left: 15px;
}
.dp-order-step1-item-text-title {
  font-weight: bolder;
  font-size: 22px;
}
.dp-order-step1-item {
  background-color: var(--color-background--layer-40);
  min-width: 335px;
  padding: 10px;
  border-radius: 4px;
  display: inline-flex;
  cursor: pointer;
  width: calc(100% - 20px);
}

.dp-order-step1-item:hover {
  background-color: var(--color-background--layer-20);
}
.dp-order-step1-item-root[selected="true"] .dp-order-step1-item {
  /* background-color: var(--color-background--layer-10); */
  background-color: var(--color-primary);
}

.dp-order-step1-item-root[selected="true"] .dp-order-step2-item {
  /* background-color: var(--color-background--layer-10); */
  background-color: var(--color-primary);
}

.dp-order-step1-item-root[disabled="true"] .dp-order-step1-item {
  background-color: var(--color-background--layer-10);
  cursor: not-allowed;
  filter: opacity(0.5);
}

.dp-order-step1-item-root {
  width: 100%;
}

.dp-order-step1-grid {
  display: grid;
  grid-template-columns: repeat(3, 355px);
  grid-gap: 20px;
  margin-top: 30px;
}
.dp-order-step-title {
  display: inline-flex;
}
.dp-order-step-number-root {
  position: relative;
  border-style: solid;
  width: 30px;
  height: 30px;
  border-radius: 100%;
}
.dp-order-step-number-1 {
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 3px;
  left: 11px;
  margin: auto;
}
.dp-order-step-name {
  line-height: 36px;
  margin-left: 10px;
  font-weight: bold;
  font-size: 22px;
}
.dp-order-step-content {
  margin-top: 10px;
  width: 100%;
}
.dp-order-root {
  margin-top: 25px;
  margin-left: 50px;
  margin-right: 50px;
  width: calc(100% - 100px);
  user-select: none;
}
.dp-order-servercount {
  width: 180px;
  text-align: center;
  font-weight: bold;
  margin-left: auto;
  margin-right: 5px;
}
.pt-package-name {
  overflow: hidden;
}

.dp-order-step3-grid-spacer {
  height: 15px;
}
@media only screen and (max-width: 1610px) {
  .dp-order-step2-grid {
    grid-template-columns: repeat(3, 355px);
  }
  .dp-order-step1-grid {
    grid-template-columns: repeat(3, 355px);
  }

  .grid-3-qemu {
    grid-template-columns: 27px minmax(0, 0.5fr) repeat(4, minmax(0, 1fr)) 0px repeat(
        4,
        minmax(0, 1fr)
      );
  }
  .dp-vps-images {
    visibility: hidden;
  }
}

@media only screen and (max-width: 1400px) {
  .dp-order-step3-grid2 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .dp-content {
    margin-left: 15px;
    margin-right: 15px;
    width: calc(100% - 30px);
  }

  .dp-order-step3-grid-row {
    grid-template-columns: 27px 0px repeat(5, minmax(0, 1fr));
    font-size: 15px;
  }
  .dp-order-step3-grid-header {
    grid-template-columns: 27px 0px repeat(5, minmax(0, 1fr));
  }

  .hide-on-medium-screen {
    visibility: hidden;
  }

  .grid-3-qemu {
    grid-template-columns: 27px minmax(0, 0.5fr) repeat(4, minmax(0, 1fr)) 0px repeat(
        4,
        minmax(0, 1fr)
      );
  }
  .dp-vps-images {
    visibility: hidden;
  }
}

@media only screen and (max-width: 1230px) {
  .dp-order-step2-grid {
    grid-template-columns: repeat(2, 355px);
  }
  .dp-order-step1-grid {
    grid-template-columns: repeat(2, 355px);
  }

  .grid-3-qemu {
    grid-template-columns:
      27px minmax(0, 0.5fr) repeat(4, minmax(0, 1fr)) 0px repeat(
        2,
        minmax(0, 1fr)
      )
      0px minmax(0, 1fr);
  }
  .dp-vps-network {
    visibility: hidden;
  }
}

@media only screen and (max-width: 855px) {
  .dp-order-step2-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  .dp-order-step1-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media only screen and (max-width: 1300px) {
  .dp-order-step3-grid2 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media only screen and (max-width: 1000px) {
  .dp-order-step3-grid2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .dp-content {
    margin-left: 15px;
    margin-right: 15px;
    width: calc(100% - 30px);
  }

  .dp-order-step3-grid-row {
    font-size: 15px;
  }

  .grid-3-qemu {
    grid-template-columns:
      27px minmax(0, 0.5fr) repeat(4, minmax(0, 1fr)) 0px 0px minmax(0, 1fr)
      0px minmax(0, 1fr);
    grid-gap: 0px;
  }
  .dp-vps-ipv4 {
    visibility: hidden;
  }
}

@media only screen and (max-width: 900px) {
  .grid-3-qemu {
    grid-template-columns:
      27px minmax(0, 0.5fr) repeat(4, minmax(0, 1fr)) 0px 0px 0px
      0px minmax(0, 1fr);
  }
  .dp-vps-ipv6 {
    visibility: hidden;
  }
  .dp-vps-price-month {
    display: none;
  }
}

@media only screen and (max-width: 690px) {
  .dp-order-step3-grid2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media only screen and (max-width: 525px) {
  .dp-order-step3-grid2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media only screen and (max-width: 800px) {
  .hide-on-small-screen {
    visibility: hidden;
  }
  .dp-order-app-config-container {
    flex-wrap: wrap;
  }
  .dp-order-step3-grid-row {
    grid-template-columns: 27px 0px 2fr repeat(4, 0px) 1fr;
    font-size: 15px;
  }
  .dp-order-step3-grid-header {
    grid-template-columns: 27px 0px 2fr repeat(4, 0px) 1fr;
  }
  /* .dp-order-step3-grid-row[selected="true"] .dp-order-step3-selectdot::after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: var(--color-primary);
  } */

  .grid-3-qemu {
    grid-template-columns:
      27px 0 repeat(4, minmax(0, 1fr)) 0 0 0
      0 minmax(0, 1fr);
  }

  .dp-vps-code {
    visibility: hidden;
  }
}
</style>
