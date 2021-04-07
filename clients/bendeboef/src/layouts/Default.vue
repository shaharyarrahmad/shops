<template>
  <div>
    <b-navbar fixed-top>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="/bendeboef-logo.svg"
            alt="Ben de Boef Tattoo logo"
            style="padding-right: 30px"
          />
        </b-navbar-item>
      </template>
      <template #start>
        <g-link
          v-for="link of global.links"
          :to="link.url"
          :key="link.url"
          class="navbar-item"
        >
          {{ link.name }}
        </g-link>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-tooltip label="€35,15" position="is-bottom">
              <b-button
                type="is-primary"
                icon-left="shopping"
                tag="router-link"
                to="/cart/"
              >
                1
              </b-button>
            </b-tooltip>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <slot />

    <b-navbar fixed-bottom>
      <template #burger>
        <b-navbar-item tag="div" class="burger">
          <div class="buttons">
            <b-tooltip label="€35,15" position="is-bottom">
              <b-button
                type="is-primary"
                icon-left="shopping"
                tag="router-link"
                to="/cart/"
              >
                1
              </b-button>
            </b-tooltip>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>
<script>
import global from '@/data/global.json';

export default {
  data: () => ({
    global,
  }),
};
</script>
