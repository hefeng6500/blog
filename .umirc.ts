import { defineConfig } from 'dumi';

export default defineConfig({
  title: '高级前端进阶',
  mode: 'site',
  base: '/blog/',
  publicPath: '/blog/',
  description: '高级前端进阶',
  navs: [
    null, // A null value means to retain the conventionally generated navigation and only do incremental configuration
    {
      title: '算法',
      path: 'https://hefeng6500.github.io/interview-blog',
    },
    {
      title: 'vue3源码',
      path: 'https://hefeng6500.github.io/vue3.0-analysis/',
    },
  ],
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  styles: [
    `
    .__dumi-default-layout-hero { background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1440' height='560' preserveAspectRatio='none'%3E%3Cg mask='url(%26quot;%23SvgjsMask1023%26quot;)' fill='none'%3E%3Cpath fill='%230e2a47' d='M0 0h1440v560H0z'/%3E%3Cpath d='M413.428 557.952c56.349 2.363 117.478-15.272 143.791-65.157 25.203-47.779-1.647-102.82-31.406-147.903-26.052-39.466-65.158-67.501-112.385-69.928-52.104-2.678-107.444 12.546-134.345 57.249-27.571 45.818-17.319 103.386 10.029 149.338 26.661 44.798 72.231 74.217 124.316 76.401' fill='rgba(28, 83, 142, 0.4)' class='triangle-float1'/%3E%3Cpath d='M1204.349 663.806c45.235-2.564 80.474-33.126 104.879-71.299 27.068-42.339 51.742-93.018 28.733-137.693-24.374-47.325-80.512-69.705-133.612-65.947-47.494 3.362-80.266 41.77-104.43 82.795-24.665 41.876-46.487 91.325-23.279 134.026 23.938 44.044 77.66 60.954 127.709 58.118' fill='rgba(28, 83, 142, 0.4)' class='triangle-float3'/%3E%3Cpath d='M800.877 606.466l107.73-1.88-56.685-160.657zM495.21 345.445l-129.014-20.434-20.434 129.015 129.015 20.434z' fill='rgba(28, 83, 142, 0.4)' class='triangle-float1'/%3E%3Cpath d='M1062.305 445.605c37.402.243 75.242-11.039 95.762-42.31 22.551-34.366 27.947-79.249 7.345-114.817-20.56-35.494-62.158-52.911-103.107-50.508-37.151 2.18-65.637 29.169-84.081 61.492-18.245 31.976-27.911 70.692-9.552 102.603 18.397 31.976 56.743 43.301 93.633 43.54' fill='rgba(28, 83, 142, 0.4)' class='triangle-float2'/%3E%3Cpath d='M1130.596 71.094L993.43 21.169l-49.925 137.167 137.168 49.925z' fill='rgba(28, 83, 142, 0.4)' class='triangle-float3'/%3E%3Cpath d='M806.872 135.494c15.365-.225 23.819-16.184 31.095-29.72 6.744-12.546 12.843-26.879 6.061-39.405-7.025-12.975-22.411-17.487-37.156-18.03-16.009-.589-34.387 1.132-42.219 15.107-7.736 13.804 1.506 29.608 9.506 43.261 7.871 13.432 17.147 29.015 32.713 28.787' fill='rgba(28, 83, 142, 0.4)' class='triangle-float2'/%3E%3Cpath d='M-23.83 365.43l114.888 39.56 39.558-114.888L15.73 250.544z' fill='rgba(28, 83, 142, 0.4)' class='triangle-float3'/%3E%3C/g%3E%3Cdefs%3E%3Cstyle%3E@keyframes float1{0%25,to{transform:translate(0,0)}50%25{transform:translate(-10px,0)}}@keyframes float2{0%25,to{transform:translate(0,0)}50%25{transform:translate(-5px,-5px)}}@keyframes float3{0%25,to{transform:translate(0,0)}50%25{transform:translate(0,-10px)}}.triangle-float1{animation:float1 5s infinite}.triangle-float2{animation:float2 4s infinite}.triangle-float3{animation:float3 6s infinite}%3C/style%3E%3Cmask id='SvgjsMask1023'%3E%3Cpath fill='%23fff' d='M0 0h1440v560H0z'/%3E%3C/mask%3E%3C/defs%3E%3C/svg%3E")!important;}
    .__dumi-default-layout-hero .markdown, .__dumi-default-layout-hero h1 {
      color: #fff!important;
    }

    .label-success {
      background-color: #5cb85c;
    }

    .round {
      border-radius: 1020px;
    }

    .label {
      display: inline;
      padding: 4px 12px;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      height: 48px;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
    }
    `,
  ],
  // more config: https://d.umijs.org/config
});
