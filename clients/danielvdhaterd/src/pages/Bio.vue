<template>
  <Layout>
    <div>
      <h3>Over Daniël van de Haterd</h3>
      <p>
        Je loopt geregeld zijn street art tegen het lijf rondom Amersfoort.
        Daniël van de Haterd werkt al ruim 15 jaar als graffiti kunstenaar onder
        de naam
        <a href="https://www.dertienhoog.nl" target="_blank">13HOOG</a> voor
        particulieren, bedrijven, overheid en festivals zoals: Defqon, Into The
        Woods en Qbase.
      </p>
      <p>
        Daniël heeft zichzelf in het afgelopen jaar herontdekt als kunstenaar
        met nieuwe materialen en technieken zoals het paletmes, kwast of de
        behangstrijker. Zijn werk is kleurrijk, soms herkenbaar als streetart
        door de combinatie met spuitbus, fotorealistisch maar ook heel modern,
        abstract en expressief.
      </p>
      <h5>Exposities</h5>
      <ul>
        <li>2021 "Brush Strokes" AVU Kunstkader, Amersfoort</li>
        <li>2015 "Ral43" groepsexpositie bij Haren Majesteit, Amersfoort</li>
        <li>2014 "Blauwdruk" bij De Kunsthal KAdE, Amersfoort</li>
        <li>2013 "Solo Expositie" bij Haren Majesteit, Amersfoort</li>
        <li>2007 "Numbers" bij De Observant, Amersfoort</li>
      </ul>

      <g-link to="/">< Terug naar de shop</g-link>
    </div>
  </Layout>
</template>
<script>
export default {
  created() {
    this.$context.previousPage = '/';
    this.$context.hideCartIcon = true;
  },
};
</script>
