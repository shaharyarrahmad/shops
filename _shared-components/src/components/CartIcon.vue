<template>
  <div>
    <span class="badge alert cart-badge">{{ nrOfItems }}</span>
    <g-link class="button" to="/cart/">
      <i class="fi-shopping-cart"></i>
    </g-link>
    <!--    <div *ngIf="hideCart && showNext && nrOfItems" class="cell text-right">
          <a class="button" routerLink="/customer-details">
            BESTEL
          </a>
        </div>
      </div>

      <div *ngIf="progress" class="grid-x grid-padding-x">
        <div class="cell small-12">
          <div class="progress" role="progressbar" tabindex="0" aria-valuenow="50" aria-valuemin="0" aria-valuetext="50 percent"
               aria-valuemax="100">
            <div class="progress-meter" style="width: {{progress}}%;"></div>
          </div>
        </div>
      -->
  </div>
</template>
<script>
export default {
  computed: {
    nrOfItems() {
      return this.$store
              .activeOrder?.lines?.map(l => l.quantity)
              .reduce((quantity1, quantity2) => quantity1 + quantity2)
          || 0;
    }
  },
}
</script>