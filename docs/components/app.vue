<template>
  <div>
    <header>
      <h1>Components</h1>
      <nav>
        <ul>
          <li>
            <a href="https://github.com/vue-material/vue-material">
              Github
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <div class="main-wrapper">
      <nav>
        <ul>
          <li class="first">
            <div>Components</div>
            <ul>
              <li class="second active">
                <div>
                  <a href="#/components/button">Button</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {}
    },
    components: {}
  }
</script>
